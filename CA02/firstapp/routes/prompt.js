const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const openai = require('openai');

isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
  }

// Configure OpenAI API
openai.apiKey = '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'; // Replace this with your OpenAI API key

router.post('/generate', async (req, res) => {
  const text = req.body.text;

  const prompt = 'Rewrite the following text in sonnet style with proper iambic pentameter: ' + text;
  const gptResponse = await openai.complete({
    engine: 'davinci',
    prompt,
    maxTokens: 100,
    n: 1,
    temperature: 0.7
  });

  const generatedText = gptResponse.choices[0].text;

  res.render('result', { text, generatedText });
});

module.exports = router;