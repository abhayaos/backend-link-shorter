import express from 'express';
import cors from 'cors';
import TinyURL from 'tinyurl-api'; // notice the capital T

const app = express();
// Configure CORS
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'URL Shortener API is running' });
});

const allowedOrigins = ['http://localhost:3000', 'https://urlshorterabhaya.vercel.app'];

// POST endpoint
app.post('/shorten', async (req, res) => {
  const { longurl } = req.body;
  if (!longurl) return res.status(400).json({ error: 'longurl is required' });

  try {
    // Use TinyURL(longurl) directly
    const shortUrl = await TinyURL(longurl);
    res.json({ shortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
});

// Optional GET endpoint
app.get('/shorten', async (req, res) => {
  const longurl = req.query.url;
  if (!longurl) return res.status(400).json({ error: 'url query param is required' });

  try {
    const shortUrl = await TinyURL(longurl);
    res.json({ shortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
});

app.listen(5000, () => {
  console.log('URL Shortener API running on port 5000');
});
