'use strict';

const 
  getKey = function(str, ...instructions ) {
    return instructions.reduce(function(key, instruction) {
      if (!key) {
        key = str.match(instruction);
        key = key ? key[0] : key;
      } 
      return key;
    }, null);
  },
  sortElemList = function(elemsList, sortBy) {
    let sortList = {};
    const elemsParent = elemsList[0].parentElement;
    
    elemsList.forEach((elem) => {
      let key;

      if (sortBy) {
        key = getKey(document.querySelector(sortBy).textContent, 
          /(?<=Книга )\d+/, /(?<=Глава )\d+/, /(?<=Приложение )[A-Z]+/
          );
      } else {
        key = getKey(elem.textContent, 
          /(?<=Книга )\d+/, /(?<=Глава )\d+/, /(?<=Приложение )[A-Z]+/
          );
      }
      
      if (key) {
        sortList[key] = elem;  
        elem.remove();
      }
    });

    for (let key of Object.keys(sortList).sort()) {
      elemsParent.append(sortList[key]);
    }
  },
  fixDoc = function(books) {
    // Удалить рекламу со страницы
    document.querySelector('.adv').remove();
    // Заменить картинку заднего фона на другую из папки image
    document.body.style.backgroundImage = "url('/image/you-dont-know-js.jpg')";
    // Восстановить порядок книг.
    sortElemList(books, 'a');

    books.forEach(function(book) {
      const bookTitle = book.querySelector('a');

      if (getKey(bookTitle.textContent, /(Книга 3)/)) {
        // Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
        bookTitle.textContent = 'Книга 3. this и Прототипы Объектов';
      }
      if (getKey(bookTitle.textContent, /(Книга 6)/)) {
        // В шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
        let newChapter = document.createElement('li');
        
        newChapter.textContent = 'Глава 8: За пределами ES6';
        book.querySelector('ul').append(newChapter);
        sortElemList(book.querySelectorAll('li'));
      }
      if (getKey(bookTitle.textContent, /(Книга 2)/) || getKey(bookTitle.textContent, /(Книга 5)/)) {
        // Восстановить порядок глав во второй и пятой книге 
        sortElemList(book.querySelectorAll('li'));
      }  
    });
  }(document.querySelectorAll('.book'));