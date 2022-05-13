const httpStatus = require('http-status');
const { Book } = require('../models');
const ApiError = require('../utils/ApiError');

const getBookbyId = async (id) => {
    return Book.findById(id);
}
const createBook = async (bookBody) => {
    return Book.create(bookBody);
};

const getBooks = async () => {
    const books = await Book.find({}).sort({ createdAt: -1 });
    return books;
};

const updateBook = async(bookId, updatedBody) => {
    const book = await getBookbyId(bookId);
    if(!book){
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    Object.assign(book, updatedBody);
    await book.save();
    return book;
};

const deleteBook = async (bookId) => {
    const book = await getBookbyId(bookId);
    if(!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    await book.remove();
    return book;
}

module.exports = {
    getBookbyId,
    createBook,
    getBooks,
    updateBook,
    deleteBook,
}