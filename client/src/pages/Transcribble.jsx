import {
  React, useEffect, useState, useRef,
} from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';
import styles from '../styles/Transcribble.module.css';
import cohere from '../api';

// Set AssemblyAI Axios Header
const assembly = axios.create({
  baseURL: 'https://api.assemblyai.com/v2',
  headers: {
    authorization: process.env.REACT_APP_AAI_API_KEY,
    'content-type': 'application/json',
    'transfer-encoding': 'chunked',
  },
});

function Transcribble() {
  // Mic-Recorder-To-MP3
  const recorder = useRef(null);
  const audioPlayer = useRef(null);
  const [blobURL, setBlobUrl] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(null);
  const [doneRecording, setDoneRecording] = useState(false);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    recorder.current = new MicRecorder({ bitRate: 128 });
  }, []);

  const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true);
        <p>Recording in progress...</p>;
    });
  };

  const stopRecording = () => {
    setDoneRecording(true);
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, 'audio.mp3', {
          type: blob.type,
          lastModified: Date.now(),
        });
        const newBlobUrl = URL.createObjectURL(blob);
        setBlobUrl(newBlobUrl);
        setIsRecording(false);
        setAudioFile(file);
      })
      .catch((e) => console.log(e));
  };

  // AssemblyAI API

  // State variables
  const [uploadURL, setUploadURL] = useState('');
  const [transcriptID, setTranscriptID] = useState('');
  const [transcriptData, setTranscriptData] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const currentDateTime = new Date().toLocaleString();

  // Upload the Audio File and retrieve the Upload URL
  useEffect(() => {
    if (audioFile) {
      assembly
        .post('/upload', audioFile)
        .then((res) => setUploadURL(res.data.upload_url))
        .catch((err) => console.error(err));
    }
  }, [audioFile]);

  // Check the status of the Transcript
  const checkStatusHandler = async () => {
    setIsLoading(true);
    try {
      await assembly.get(`/transcript/${transcriptID}`).then((res) => {
        setTranscriptData(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
  const submitTranscriptionHandler = () => {
    assembly
      .post('/transcript', {
        audio_url: uploadURL,
        auto_chapters: true,
        auto_highlights: true,
      })
      .then((res) => {
        setTranscriptID(res.data.id);
        checkStatusHandler();
      })
      .catch((err) => console.error(err));
  };

  // Periodically check the status of the Transcript
  useEffect(() => {
    const interval = setInterval(() => {
      if (transcriptData.status !== 'completed' && isLoading) {
        checkStatusHandler();
      } else {
        setIsLoading(false);
        setTranscript(transcriptData.text);

        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const addToNotes = (event) => {
    event.preventDefault();
    setNotes([...notes, note]);
    cohere(note).then((res) => setMessage(res));
  };

  return (
    <div className={styles.transcribble}>
      <h1>Transcribble</h1>
      <p>Record your thoughts and we&apos;ll help organize them!</p>
      {doneRecording && (
        <audio ref={audioPlayer} src={blobURL} controls="controls"><track kind="captions" /></audio>
      )}
      <div className={styles.buttons}>
        {!isRecording && (
          <button
            className={styles.green_button}
            disabled={isRecording}
            onClick={startRecording}
            type="button"
          >
            <h3>Record</h3>
          </button>
        )}
        {isRecording && (
          <button
            className={styles.red_button}
            disabled={!isRecording}
            onClick={stopRecording}
            type="button"
          >
            <h3>Stop</h3>
          </button>
        )}
        {doneRecording && (
          <button
            className={styles.transcribe_button}
            onClick={submitTranscriptionHandler}
            type="button"
          >
            <h3>Transcribe!</h3>
          </button>
        )}
      </div>
      <br />
      {transcriptData.status === 'completed' ? (
        <div className={styles.note}>
          <h2>{currentDateTime}</h2>
          <p>{transcript}</p>
        </div>
      ) : (
        <p>{transcriptData.status}</p>
      )}
      <h3> Or dislike talking? Jot down your thoughts on these notes:</h3>
      <form onSubmit={(e) => { addToNotes(e); }}>
        <input type="text" onChange={(e) => setNote(e.target.value)} />
        <input type="submit" />
      </form>
      {notes.map((n) => (
        <div>
          {' '}
          {n}
          {' '}
        </div>
      ))}
      <br />
      <div>
        A wise mentor says:
      </div>
      <div>
        {message}
      </div>
    </div>
  );
}

export default Transcribble;
