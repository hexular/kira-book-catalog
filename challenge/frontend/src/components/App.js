import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Book from './Book';

// TODO: 
// - Search by title
// - Reserved by add name and click to expand by who
//    - Render return button next to each individual reservation
// - View by reserved or available
// - Add button to send all API calls together at end
//    - Implement caching for this

export default function App() {

  const [data, setData] = useState([])
  const [display, setDisplay] = useState([])
  const [search, setSearch] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [update, setUpdate] = useState(false)

  const filterBooks = () => {
    const filteredBooks = data.filter(book => {
      return book.title
              .split(' ')
              .join('')
              .toLowerCase()
              .indexOf(search) >= 0;
    });
    setDisplay(filteredBooks)
  }

  const handleSearch = e => {
    setSearch(e.target.value)
    filterBooks()
  }

  useEffect(() => {
    fetch('api/book')
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        setData(data)
        setDisplay(data)
        setSearch(document.getElementById('search-bar').value)
        setLoaded(true)
      })
    setUpdate(false)
  }, [update === true])

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
            <Book key={book.id} book={book} setUpdate={setUpdate} />
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