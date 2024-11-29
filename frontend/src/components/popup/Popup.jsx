import React, { useEffect, useRef } from 'react'
import Button from '../Button/Button'
import "./Popup.css"

export const Popup = ({onSubmit, onCancel, text, position}) => {

    const popupRef = useRef(null)

    useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onCancel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);



    return (
      <div className='popup' ref={popupRef} style={{left: `${position[0]}px`, top: `${position[1]}px`}}>
          <div className='popup-text'>{text}</div>
          <div className='popup-buttons'>
              <Button standard onClick={onSubmit}>Yes</Button>
              <Button standard onClick={onCancel}>No</Button>
          </div>
      </div>
    )
}
