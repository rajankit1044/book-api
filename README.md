# My Book API Project

This is a simple REST API I built to manage books using Node.js and Express. It stores data in memory.

## How to Run

1. Install the packages:
   ```bash
   npm install
   ```

2. Run the server:
   ```bash
   npm run dev
   ```

It will run on `http://localhost:3000`.

## API Endpoints

- `GET /books` - Get all books
- `GET /books/:id` - Get a book by its ID
- `POST /books` - Add a new book (send JSON: `{ "title": "Book Name", "author": "Author Name" }`)
- `PUT /books/:id` - Update a book (send JSON with title or author)
- `DELETE /books/:id` - Delete a book

## Some curl Examples

- Get books:
  ```bash
  curl http://localhost:3000/books
  ```

- Add book:
  ```bash
  curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d '{"title":"Harry Potter","author":"J.K. Rowling"}'
  ```

- Update book:
  ```bash
  curl -X PUT http://localhost:3000/books/1 -H "Content-Type: application/json" -d '{"title":"New Title"}'
  ```

- Delete book:
  ```bash
  curl -X DELETE http://localhost:3000/books/1
  ```

## Notes
- Data is stored in memory, so it resets when server restarts.
- I used cors and morgan for better development.
