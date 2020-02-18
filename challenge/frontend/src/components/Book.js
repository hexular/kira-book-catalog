import React, { useState, useEffect } from "react";

export default function Book(props) {

  const { title, author, quantity } = props.book

  return (
    <React.Fragment>
      <li>
        {title} by {author}
      </li>
      <p>{quantity} left in stock</p>
      <button>Return</button>
      {quantity === 0 ? <button type="button" disabled>Reserve</button> : <button type="button">Reserve</button>}
      <br/>
    </React.Fragment>
  )
}