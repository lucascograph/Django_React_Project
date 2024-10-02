import React from 'react'
import "./Button.css"


export const Button = ({onClick, text, size="", width="250px"}) => {
  
  let height = "48px"

  if (size === "large"){
    height = "68px"
  } else if (size === "small"){
    height = "38px" 
  }

  return (
    <button className="button-30" onClick={onClick} style={{height: height, width: width}} >{text}</button>
  )
}
