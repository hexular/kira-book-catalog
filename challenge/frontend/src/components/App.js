import React, { useState, useEffect } from "react";

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
              {book.title} by {book.authour}
            </li>
          );
        })
        :
        {placeholder}
      }
      </ul>
    </React.Fragment>
  )
}