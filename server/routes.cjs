const express = require('express');

require('dotenv').config();

const router = express.Router();

const {
  COHERE_API_KEY,
} = process.env;

const cohere = require('cohere-ai');

cohere.init(COHERE_API_KEY);

router.get('/', (req, res) => {
  res.send('We are live!');
});

router.post('/cohere', (req, res) => {
  try {
    const bod = req.body;

    console.log('prompt is', Object.keys(bod)[0]);

    const prompt = Object.keys(bod)[0];
    (async () => {
      const response = await cohere.generate({
        prompt,
      });

      console.log(response);
      res.send(response);
    })();
  } catch (error) {
    res.send('invalid request', error);
  }
});

module.exports = router;
