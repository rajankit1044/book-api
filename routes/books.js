// My books routes
const express = require('express');
const router = express.Router();

// Store books in memory
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: '1984', author: 'George Orwell' }
];

// Function to get next ID
function getNextId() {
  if (books.length === 0) return 1;
  return Math.max(...books.map(b => b.id)) + 1;
}

// GET all books
router.get('/', (req, res) => {
  console.log('Getting all books');
  res.json(books);
});

// GET single book by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    console.log('Book not found for ID:', id);
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

// POST new book
router.post('/', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Need title and author' });
  }
  const newBook = { id: getNextId(), title, author };
  books.push(newBook);
  console.log('Added new book:', newBook);
  res.status(201).json(newBook);
});

// PUT update book
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  if (!title && !author) {
    return res.status(400).json({ error: 'Provide title or author to update' });
  }
  const updatedBook = { ...books[bookIndex] };
  if (title) updatedBook.title = title;
  if (author) updatedBook.author = author;
  books[bookIndex] = updatedBook;
  console.log('Updated book:', updatedBook);
  res.json(updatedBook);
});

// DELETE book
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  const deletedBook = books.splice(bookIndex, 1)[0];
  console.log('Deleted book:', deletedBook);
  res.json({ message: 'Book deleted', book: deletedBook });
});

module.exports = router;
