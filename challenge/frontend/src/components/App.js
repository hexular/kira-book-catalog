import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Book from './Book';

export default function App() {

  const [data, setData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    fetch('api/book')
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        setData(data)
        setLoaded(true)
      })
    setUpdate(false)
  }, [update === true])

  return (
    <React.Fragment>
      <ul>
        {loaded ? data.map(book => {
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