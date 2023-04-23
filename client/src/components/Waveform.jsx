import React, { useRef, useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import water from '../assets/water.wav';

function Waveform() {
  const waveformRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'violet',
        progressColor: 'purple',
        height: 100,
        barWidth: 2,
        barRadius: 3,
      });
      wavesurfer.load(water);
      wavesurfer.on('play', () => setIsPlaying(true));
      wavesurfer.on('pause', () => setIsPlaying(false));
      return () => wavesurfer.destroy();
    }
    return null;
  }, [waveformRef]);

  const handleTogglePlay = () => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'violet',
        progressColor: 'purple',
        height: 100,
        barWidth: 2,
        barRadius: 3,
      });
      setIsPlaying(!isPlaying);
      if (isPlaying) {
        wavesurfer.pause();
      } else {
        wavesurfer.play();
      }
    }
  };

  return (
    <div>
      <div ref={waveformRef} />
      <button type="button" onClick={handleTogglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export default Waveform;
