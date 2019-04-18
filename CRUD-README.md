# CRUD API

## CREATE

  - Route: `app.post('/api/book)`
  - The book's title and author will come through the body of the request
  - The `helpers.searchBooks` function will take the title and author and search the Google Books API for a volume id
  - If a volume number has been retrieved, the `helpers.getBooksByVolume` function will take the volume id and retrieve volume information about the searched for book
  - Then, the `db.inputBooks` function will save the volume information to the database

## READ

  - Route: `app.get('/api/books)`
  - The `db.getBooks` function will retrieve all books found in the database to return to the client

## UPDATE

  - Route: `app.patch('/api/read)`
  - Both the book id and the read status will come through the body of the request
  - The `db.changeStatus` function will take the book id and status to update the book in the database

## DELETE

  - Route: `app.delete('/api/book)`
  - The book id will come through the body of the request
  - The `db.removeBook` function will take the book id to remove the book from the database
