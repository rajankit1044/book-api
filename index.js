// My Book API Project
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const booksRouter = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // to parse JSON bodies

// Routes
app.use('/books', booksRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my Book API! Check /books for books.' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`My server is running on http://localhost:${PORT}`);
});
