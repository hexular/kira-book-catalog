import React, { useState, useEffect } from "react";

export default function Book(props) {


  return (
    <React.Fragment>
      <li key={props.book.id}>
        {props.book.title} by {props.book.author}
      </li>
      <p>{props.book.quantity} left in stock</p>
      <button>Reserve</button>
    </React.Fragment>
  )
}