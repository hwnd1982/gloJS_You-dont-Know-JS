document.querySelector('.adv').remove();

const 
  books = document.querySelectorAll('.book'),
  sortBookList = function(bookList) {
    let sortList = {};
    const booksBlock = document.querySelector('.books');

    bookList.forEach((book) => {
      const bookTitle = document.querySelector('a');

      sortList[bookTitle.textContent.match(/\d+/)] = book;  
      book.remove();
    });

    for (let i = 1; i <= Object.keys(sortList).length; i++) {
      booksBlock.append(sortList[i]);
    }
  } (books);