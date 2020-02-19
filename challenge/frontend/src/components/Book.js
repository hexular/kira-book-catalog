import React, { useState, useEffect } from "react";

export default function Book(props) {
  const disabled = true;
  const { id, title, author, quantity, reserved } = props.book;

  console.log(props)
  console.log('hello world')

  // PATCH method proved to be unnecessarily complicated given the Django REST framework
  // Decided to use PUT with a partial update
  const reserveBook = change => {
    const newReserved = reserved + change;
    console.log(reserved, change)
    fetch(`api/book/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reserved: newReserved })
    });
    props.setUpdate(true)
  }

  return (
    <React.Fragment>
      <li>
        {title} by {author}
      </li>
      <p>{quantity} left in stock</p>
      <p>{reserved} currently on hold</p>
      {reserved === 0 ? <button disabled>Return</button> : <button onClick={() => reserveBook(-1)}>Return</button>}
      {quantity === 0 || quantity === reserved ? <button disabled>Reserve</button> : <button onClick={() => reserveBook(1)}>Reserve</button>}
    </React.Fragment>
  )
}