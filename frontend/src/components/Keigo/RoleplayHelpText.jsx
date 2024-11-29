import { useState } from "react"
import Button from "../Button/Button"
import "./RoleplayHelpText.css"

function RoleplayHelpText({text}) {

    const [displayText, setDisplayText] = useState(false)

    const handleToggleClick = () => {
        setDisplayText(prev => !prev)
    }

    return (
        <div className="help-container">
            <Button onClick={handleToggleClick}>Toggle Help</Button>
            {displayText &&
                <div className="help-text">
                    {text}
                </div>
            }
        </div>
    )
}

export default RoleplayHelpText