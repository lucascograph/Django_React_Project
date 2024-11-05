import React from 'react'
import Button from '../Button/Button'
import "./Popup.css"

export const Popup = ({onSubmit, onCancel, text, position}) => {
  return (
    <div className='popup' style={{left: `${position[0]}px`, top: `${position[1]}px`}}>
        <div className='popup-text'>{text}</div>
        <div className='popup-buttons'>
            <Button standard onClick={onSubmit}>Yes</Button>
            <Button standard onClick={onCancel}>No</Button>
        </div>
    </div>
  )
}
