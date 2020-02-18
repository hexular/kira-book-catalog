import React, { useState, useEffect } from "react";
import { render } from "react-dom";

export default function App() {

  const [data, setData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [placeholder, setPlaceholder] = useState('Loading...')

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
  }, [])

  return (
    <React.Fragment>
      <ul>
        {loaded ? data.map(book => {
          return (
            <li key={book.id}>
              {book.title} by {book.author}
            </li>
          );
        })
        :
        'loading'
      }
      </ul>
    </React.Fragment>
  )
}

const container = document.getElementById("app");
render(<App />, container);