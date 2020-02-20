import React, { useState } from "react";

export default function Book(props) {

  // By giving the book component it's own state, the rendering can be done without additional GET calls to the API
  // As long as there is not error in the PUT request below, the state updates with proper rendering

  const [book, setBook] = useState(props.book);

  const { id, title, author, quantity, reserved } = book;

  // PATCH method proved to be unnecessarily complicated given the Django REST framework
  // Decided to use PUT with a partial update to update the reserved part

  const reserveBook = change => {
    const newReserved = reserved + change;
    fetch(`api/book/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reserved: newReserved })
    })
      .then(() => setBook({ ...props.book, reserved: newReserved }))
      .catch(err => alert('Could not reach the server', err));
  };

  // The ternary operators below decide whether to disable the buttons depending on the current inventory of the book
  // as well as the current number of reserved books

  return (
    <React.Fragment>
      <li>
        "{title}" by {author}
      </li>
      <p>{quantity} left in stock</p>
      <p>{reserved} currently on hold</p>
      {reserved === 0 ? <button disabled>Return</button> : <button onClick={() => reserveBook(-1)}>Return</button>}
      {quantity === 0 || quantity === reserved ? <button disabled>Reserve</button> : <button onClick={() => reserveBook(1)}>Reserve</button>}
    </React.Fragment>
  );
};