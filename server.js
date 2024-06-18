const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { execFile } = require('child_process');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/test',(req,res)=>{
  res.send("i am working for you !")
})
const getCountryCode = async () => {
  try {
    const response = await axios.get('https://ipapi.co/json/');
    return response.data.country_code.toLowerCase();
  } catch (error) {
    console.error('Error fetching country code:', error);
    return 'us'; // Default country code
  }
};

app.post('/translate', (req, res) => {
  const { text, targetLanguage } = req.body;

  console.log(`Translating text: "${text}" to ${targetLanguage}`);

  // Execute the Python script
  execFile('python', ['translate.py', text, targetLanguage], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send(`Internal Server Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send(`Internal Server Error: ${stderr}`);
    }

    res.json({ translatedText: stdout.trim() });
  });
});

app.get('/country', async (req, res) => {
  const countryCode = await getCountryCode();
  res.json({ countryCode });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
