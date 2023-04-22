import React, { useState } from 'react';

const prompts = [
  'Write about a character who has a unique ability or superpower that sets them apart from others. How does this ability affect their life and relationships with others?',
  'Imagine that you are the last person on Earth. Write about your experiences as you navigate the empty world and try to survive.',
  'Write a story about a time traveler who accidentally goes back in time to a pivotal moment in history. What do they do to try to avoid changing the course of history?',
  'Think about a place that is important to you, such as a childhood home, a favorite vacation spot, or a place of special significance. Describe this place in detail, using sensory details to bring it to life.',
  'Write about a time when you overcame a challenge or obstacle. How did you do it? What did you learn from the experience?',
  'Imagine that you could speak to any historical figure, living or dead. Who would you choose, and what would you ask them? Write a dialogue between yourself and this person.',
  'Write about a dream that you had recently. What happened in the dream, and how did it make you feel? Was there a deeper meaning to the dream?',
  'Think about a hobby or interest that you have. Write about how you became interested in it, and why it is important to you.',
  'Write about a person who has had a significant impact on your life. This could be a family member, friend, teacher, or mentor. What did this person teach you, and how have they influenced the person you are today?',
  'Imagine that you are stranded on a deserted island. Write about how you would survive and adapt to life on the island. What challenges would you face, and how would you overcome them?',
];

function Writing() {
  const [currentPrompt, setCurrentPrompt] = useState('');

  const shufflePrompts = () => {
    const index = Math.floor(Math.random() * prompts.length);
    setCurrentPrompt(prompts[index]);
  };

  return (
    <div>
      <h1>Writing Prompts</h1>
      <button type="button" onClick={shufflePrompts}>New Prompt</button>
      <p>{currentPrompt}</p>
      <textarea placeholder="Write your response here" />
    </div>
  );
}

export default Writing;
