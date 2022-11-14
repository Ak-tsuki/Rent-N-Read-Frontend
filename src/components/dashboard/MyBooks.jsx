import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import BookCard from "../book-card/BookCard";
const MyBooks = () => {
  const [currentTab, setCurrentTab] = useState("listed");
  const listedBooks = [
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis craspulvinar ultrices id nisl ornare nisi. Nisi, morbi consectetur nibhdapibus maecenas elementum id nec. Velit vitae tellus ac feugiat nonridiculus.",
      cost: "20",
      image:
        "https://m.media-amazon.com/images/M/MV5BMzkyZGFlOWQtZjFlMi00N2YwLWE2OWQtYTgxY2NkNmM1NjMwXkEyXkFqcGdeQXVyNjY1NTM1MzA@._V1_FMjpg_UX1000_.jpg",
    },
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis craspulvinar ultrices id nisl ornare nisi. Nisi, morbi consectetur nibhdapibus maecenas elementum id nec. Velit vitae tellus ac feugiat nonridiculus.",
      cost: "20",
      image:
        "https://m.media-amazon.com/images/M/MV5BMzkyZGFlOWQtZjFlMi00N2YwLWE2OWQtYTgxY2NkNmM1NjMwXkEyXkFqcGdeQXVyNjY1NTM1MzA@._V1_FMjpg_UX1000_.jpg",
    },
  ];
  const rentedBook = [
    {
      title: "Anya and the Nightingale",
      author: "Sofiya Pasternack",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis craspulvinar ultrices id nisl ornare nisi. Nisi, morbi consectetur nibhdapibus maecenas elementum id nec. Velit vitae tellus ac feugiat nonridiculus.",
      cost: "20",
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1593147230l/48946798.jpg",
    },
    {
      title: "Anya and the Nightingale",
      author: "Sofiya Pasternack",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis craspulvinar ultrices id nisl ornare nisi. Nisi, morbi consectetur nibhdapibus maecenas elementum id nec. Velit vitae tellus ac feugiat nonridiculus.",
      cost: "20",
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1593147230l/48946798.jpg",
    },
  ];
  return (
    <div className="mybooks-container">
      <div className="add-book">
        {" "}
        <button className="add-book__btn">
          Add a book <FaBook />
        </button>
      </div>

      <div className="tabs">
        <div
          className={`tabs__tab ${
            currentTab === "listed" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("listed")}
        >
          Listed Books
        </div>
        <div
          className={`tabs__tab ${
            currentTab === "rented" && "tabs__tab--open"
          }`}
          onClick={() => setCurrentTab("rented")}
        >
          Rented Books
        </div>
      </div>
      <div>
        {currentTab === "rented"
          ? rentedBook.map((book) => <BookCard book={book} />)
          : listedBooks.map((book) => <BookCard book={book} />)}
      </div>
    </div>
  );
};

export default MyBooks;
