const isbnInfo = require('node-isbn');

function isBookInfoValid(bookInfo) {
  return !!bookInfo.title && !!bookInfo.authors;
}

async function fetchBookInfo(isbn, getInfoByIsbn = isbnInfo) {
  const isbnBookInfo = await getInfoByIsbn.resolve(isbn);
  if (!isBookInfoValid(isbnBookInfo)) {
    return {
      isValid: false,
    };
  }
  const bookInfo = {
    isValid: true,
    status: 'unknown',
    title: isbnBookInfo.title,
    authors: isbnBookInfo.authors,
  };

  if (isbnBookInfo.imageLinks) {
    bookInfo.imageLinks = {
      thumbnail : isbnBookInfo.imageLinks.thumbnail,
      smallThumbnail : isbnBookInfo.imageLinks.smallThumbnail,
    }
  }

  return bookInfo;
}

async function writeBookInfo(bookInfo) {
}

async function addBook(isbn, label) {
  const bookInfo = await fetchBookInfo(isbn);
  console.log(bookInfo);
}

module.exports = {
  addBook,
  fetchBookInfo,
  isBookInfoValid,
};
