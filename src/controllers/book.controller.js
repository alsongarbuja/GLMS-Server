const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bookService } = require('../services');

const createBook = catchAsync(async (req, res) => {
    const book = await bookService.createBook(req.body);
    res.status(httpStatus.CREATED).send(book);
});

const getBooks = catchAsync(async (req, res) => {
    const books = await bookService.getBooks();
    res.status(200).send(books);
});

const updateBook = catchAsync(async (req, res) => {
    const updatedBook = await bookService.updateBook(req.params.bookId, req.body);
    res.status(200).send(updatedBook);
});

const deleteBook = catchAsync(async (req, res) => {
    await bookService.deleteBook(req.params.bookId)
    res.status(httpStatus.OK).send({message:'Book deleted'});
});

const getBook = catchAsync(async (req, res) => {
    const book = await bookService.getBookbyId(req.params.bookId);
    if(!book){
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    res.status(httpStatus.OK).send(book);
})

module.exports = {
    createBook,
    getBooks,
    updateBook,
    deleteBook,
    getBook,
}