import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Book from './Book';

// TODO: 
// - Reserved by add name and click to expand by who
//    - Render return button next to each individual reservation
// - View by reserved or available
// - Add button to send all API calls together at end
//    - Implement caching for this

export default function App() {

  const [data, setData] = useState([])
  const [display, setDisplay] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [update, setUpdate] = useState(false)

  const filterBooks = (filter, data) => {
    const filteredBooks = data.filter(book => {
      return book.title
              .split(' ')
              .join('')
              .toLowerCase()
              .indexOf(filter) >= 0;
    });
    setDisplay(filteredBooks)
  }

  const handleSearch = e => {
    filterBooks(e.target.value, data)
  }

  useEffect(() => {
    console.log(display)
    setLoaded(false)
    let search = document.getElementById('search-bar').value;
    fetch('api/book')
      .then(res => {
        return res.json()
      })
      .then(books => {
        console.log(books)
        setData(books)
        display.length > 0 ? filterBooks(search, books) : setDisplay(books);
        setLoaded(true)
      })
  }, [update])

  return (
    <React.Fragment>
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
        {loaded ? display.map(book => {
          return (
            <Book key={book.id} book={book} update={update} setUpdate={setUpdate} />
          );
          })
          :
          'Loading...'
        }
      </ul>
    </React.Fragment>
  )
}

const container = document.getElementById("app");
render(<App />, container);