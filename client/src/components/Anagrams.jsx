import React, { useState, useEffect } from 'react';

function Anagrams() {
  const [word, setWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const words = [
    'apple',
    'banana',
    'coffee',
    'dinner',
    'genuine',
    'guitar',
    'imagine',
    'jacket',
    'library',
    'monster',
    'orange',
    'pencil',
    'picture',
    'rocket',
    'soccer',
    'table',
    'tradition',
    'turtle',
    'window',
    'variety',
  ];

  const generateNewWord = () => {
    // Select a random word from the words array
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    // Scramble the word by randomly shuffling its letters
    const shuffledWord = randomWord.split('').sort(() => Math.random() - 0.5).join('');
    setWord(randomWord);
    setScrambledWord(shuffledWord);
    setAnswer('');
    setIsCorrect(false);
    setShowAnswer(false);
  };

  useEffect(() => {
    generateNewWord();
  }, []);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the user's answer is correct
    setIsCorrect(answer.toLowerCase() === word.toLowerCase());
  };

  const handleNewWordClick = () => {
    generateNewWord();
  };

  const handleRevealAnswerClick = () => {
    setShowAnswer(true);
  };

  return (
    <div>
      <h1>Anagrams Game</h1>
      <p>Unscramble the word below:</p>
      <h2>{scrambledWord}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="answerInput">
          Answer:
          <input type="text" id="answerInput" value={answer} onChange={handleAnswerChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {isCorrect ? (
        <div>
          <p>You got it right!</p>
          <button type="button" onClick={handleNewWordClick}>New Word</button>
        </div>
      ) : (
        <div>
          <p>Sorry, that&apos;s not correct.</p>
          {showAnswer && (
            <p>
              The answer was:
              {' '}
              {word}
            </p>
          )}
          <button type="button" onClick={handleRevealAnswerClick}>Reveal Answer</button>
          <button type="button" onClick={handleNewWordClick}>New Word</button>
        </div>
      )}
    </div>
  );
}

export default Anagrams;
