import "./index.html";
import "./index.scss";
import illustration from "./images/illustration.svg";

import data from "./data.js";
import books from "./books.js";
import { changeSlide } from "./modules/sliderUtils.js";

const sliderItem = document.getElementById("slider-item");
const sliderNav = document.getElementById("slider-nav");
const sliderBts = document.querySelectorAll(".slider-nav__item");
const navBooks = document.getElementById("books-nav");
// const moreBooksBtn = document.getElementById("more-books");

// localStorage.clear();
let storageBooks = localStorage.getItem("books");
if (storageBooks === null) {
  localStorage.setItem("books", JSON.stringify([]));
} else {
  changeCartCounter();
}

function changeCartCounter() {
  const cartCounter = document.getElementById("cart-counter");
  let count = JSON.parse(localStorage.getItem("books")).length;
  count === 0 ? (cartCounter.innerHTML = 0) : (cartCounter.innerHTML = count);
}

let currentIndex = 0;
let maxBooksToShow = 6;
let currentCategory = "";

sliderBts.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    changeSlide(index, data, sliderItem, sliderBts);
  });
});

function addBook(btn, tempBook) {
  let tempBooks = JSON.parse(localStorage.getItem("books"));
  tempBooks.push(tempBook);
  localStorage.setItem("books", JSON.stringify(tempBooks));
  btn.textContent = "In the cart";
  btn.classList.add("add-book__btn-added");
  btn.addEventListener("click", () => {
    removeBook(btn, tempBook);
  });
  changeCartCounter();
}

function removeBook(removeBtn, removeBook) {
  let tempBooks = JSON.parse(localStorage.getItem("books"));
  let newBooks = tempBooks.filter((item) => item.id !== removeBook.id);
  localStorage.setItem("books", JSON.stringify(newBooks));
  removeBtn.classList.remove("add-book__btn-added");
  removeBtn.textContent = "BUY NOW";
  removeBtn.addEventListener("click", () => {
    addBook(removeBtn, removeBook);
  });
  changeCartCounter();
}

function changeCategory(chapter, countToShow) {
  currentCategory = chapter;
  const navBooksArr = [...document.getElementsByClassName("books-nav__item")];
  navBooksArr.forEach((item) => {
    item.classList.remove("books-nav__item-active");
    if (item.textContent == chapter.category) {
      item.classList.add("books-nav__item-active");
    }
  });
  const KEY = "AIzaSyAflhKirH6ed2lH_lXFWzXw3bZuoho0gxc";
  const url = `https://www.googleapis.com/books/v1/volumes?q="subject:${chapter.url}"&key=${KEY}&printType=books&startIndex=0&maxResults=${countToShow}&langRestrict=en`;
  console.log(url);
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      const mainBooksBlock = document.getElementById("books-block");
      mainBooksBlock.innerHTML = ``;

      let books = data.items;
      console.log(books);
      books.forEach((book) => {
        // main block creation >>
        const bookBlock = document.createElement("div");
        bookBlock.classList.add("books-block-item");
        // main block <<

        const picture = document.createElement("img");
        if (book.volumeInfo.imageLinks) {
          picture.src = book.volumeInfo.imageLinks.thumbnail;
        } else {
          picture.src = illustration;
        }
        picture.alt = "book logo";
        bookBlock.appendChild(picture);

        const bookDesc = document.createElement("div");
        bookDesc.classList.add("books-desc");
        if (book.volumeInfo.authors) {
          const booksAuthors = document.createElement("div");
          booksAuthors.classList.add("books-authors");
          bookDesc.appendChild(booksAuthors);
          const authors = book.volumeInfo.authors;

          authors.forEach((author, i, arr) => {
            const authorSpan = document.createElement("p");

            i !== arr.length - 1
              ? (authorSpan.textContent = `${author}, `)
              : (authorSpan.textContent = author);
            authorSpan.classList.add("books-authors__author");
            booksAuthors.appendChild(authorSpan);
          });
        }
        const bookTitle = document.createElement("span");
        bookTitle.textContent = book.volumeInfo.title;
        bookDesc.appendChild(bookTitle);
        const bookPopularity = document.createElement("div");
        bookPopularity.classList.add("books-popularity");
        bookDesc.appendChild(bookPopularity);

        const bookStars = document.createElement("div");
        bookStars.classList.add("books-stars");
        bookPopularity.appendChild(bookStars);
        if (book.searchInfo) {
          const bookPresent = document.createElement("p");
          bookPresent.classList.add("books__description");
          bookPresent.textContent = book.searchInfo.textSnippet;
          bookDesc.appendChild(bookPresent);
        }
        if (book.saleInfo.listPrice != undefined) {
          const bookPrice = document.createElement("span");
          bookPrice.textContent =
            book.saleInfo.listPrice.amount +
            " " +
            book.saleInfo.listPrice.currencyCode;
          bookDesc.appendChild(bookPrice);
        }

        const rating = book.volumeInfo.averageRating;

        for (let index = 0; index < Math.floor(rating); index++) {
          const starImg = `<svg width="12" height="11" viewBox="0 0 12 11" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#FFD700"/>
                            </svg>`;
          bookStars.innerHTML += starImg;
        }
        let difference = rating - Math.floor(rating);
        if (difference > 0) {
          bookStars.innerHTML += `<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="${difference * 100}%" stop-color="#FFD700"/>
      <stop offset="${100 - difference * 100}%" stop-color="#EEEDF5"/>
    </linearGradient>
  </defs>
  <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="url(#half-fill)"/>
</svg>`;
        }

        for (let index = 0; index < 5 - Math.ceil(rating); index++) {
          const starImg = `<svg width="12" height="11" viewBox="0 0 12 11" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5"/>
                            </svg>`;
          bookStars.innerHTML += starImg;
        }
        // if (rating === undefined) {
        //   for (let index = 0; index < 5; index++) {
        //     const starImg = `<svg width="12" height="11" viewBox="0 0 12 11" xmlns="http://www.w3.org/2000/svg">
        //                       <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5"/>
        //                     </svg>`;
        //     bookStars.innerHTML += starImg;
        //   }
        // }

        const reviews = book.volumeInfo.ratingsCount;

        if (reviews !== undefined) {
          const reviewsText = document.createElement("p");
          reviewsText.textContent = `${reviews} reviews`;
          reviewsText.style.marginLeft = "10px";
          bookPopularity.appendChild(reviewsText);
        }
        const addBookBtn = document.createElement("button");
        addBookBtn.classList.add("add-book__btn");

        let tempBooks = JSON.parse(localStorage.getItem("books"));

        if (tempBooks.find((item) => item.id === book.id) === undefined) {
          addBookBtn.textContent = "BUY NOW";
          addBookBtn.addEventListener("click", () => {
            addBook(addBookBtn, book);
          });
        } else {
          addBookBtn.classList.add("add-book__btn-added");
          addBookBtn.textContent = "In the cart";
          addBookBtn.addEventListener("click", () => {
            removeBook(addBookBtn, book);
          });
        }

        bookDesc.appendChild(addBookBtn);

        bookBlock.appendChild(bookDesc);

        mainBooksBlock.appendChild(bookBlock);
      });
      const moreBooks = document.createElement("button");
      moreBooks.textContent = "Load more";
      moreBooks.classList.add("more-books");
      moreBooks.addEventListener("click", () => {
        maxBooksToShow += 6;
        changeCategory(currentCategory, maxBooksToShow);
      });

      mainBooksBlock.appendChild(moreBooks);
    })
    .catch((error) => {
      // imagesRow.innerHTML = "Error while loading data";
      console.log(error);
    });
}

books.forEach((category) => {
  const categoryBtn = document.createElement("button");
  categoryBtn.textContent = category.category;
  categoryBtn.classList.add("books-nav__item");

  categoryBtn.addEventListener("click", () => {
    maxBooksToShow = 6;
    changeCategory(category, maxBooksToShow);
  });
  navBooks.appendChild(categoryBtn);
});

changeCategory(books[0], maxBooksToShow);
changeSlide(currentIndex, data, sliderItem, sliderBts);

setInterval(() => {
  currentIndex = (currentIndex + 1) % data.length;
  changeSlide(currentIndex, data, sliderItem, sliderBts);
}, 5000);
