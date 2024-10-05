import "./Button.css"


export const Button = ({onClick, children}) => {

  return (
    <button className="button-30" onClick={onClick}>{children}</button>
  )
}
