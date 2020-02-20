import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Book from './Book';

export default function App() {

  const [data, setData] = useState([]);
  const [display, setDisplay] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [update, setUpdate] = useState(false);

  const filterBooks = (filter, data) => {
    const filteredBooks = data.filter(book => {
      return book.title
              .split(' ')
              .join('')
              .toLowerCase()
              .indexOf(filter) >= 0;
    });
    setDisplay(filteredBooks);
  };

  const handleSearch = e => {
    filterBooks(e.target.value, data);
  };

  useEffect(() => {
    setLoaded(false);
    let search = document.getElementById('search-bar').value;
    fetch('api/book')
      .then(res => {
        return res.json();
      })
      .then(books => {
        setData(books);
        display.length > 0 ? filterBooks(search, books) : setDisplay(books);
        setLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      <h1>Saasvile Public Library Book Catalog</h1>
      <form autoComplete="off">
        <input 
          type="text"
          name="search-by-name"
          id="search-bar"
          placeholder="Search for a book"
          onChange={handleSearch}
        />
      </form>
      <ul>
        {loaded ? 
          display.map(book => <Book key={book.id} book={book} />)
          :
          'Loading...'
        }
      </ul>
    </React.Fragment>
  );
};

const container = document.getElementById("app");
render(<App />, container);