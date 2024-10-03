import "./Button.css"


export const Button = ({onClick, text}) => {

  return (
    <button className="button-30" onClick={onClick}>{text}</button>
  )
}
