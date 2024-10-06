import { useContext, useState } from "react"
import { FlashcardContext } from "../../contexts/FlashcardContext"
import api from "../../Api"
import "./ExportCode.css"

export const ExportCode = ( { onButtonClick } ) => {

    const {
        currentDeck,
        exportCode,
        setCurrentDeck,
        setRefreshDecks,
    } = useContext(FlashcardContext)

    const [ inputCode, setInputCode ] = useState("")

    const handleInput = (event) => {
        setInputCode(event.target.value)
    }

    const handleCancel = () => {
        onButtonClick(false)
    }

    const handleImport = async () => {
        try {
            const response = await api.post("/api/deck/duplicate/", {"code": inputCode})
            console.log(response.data["detail"])
            setCurrentDeck(response.data["deck"])
        } catch (error) {
            console.error("error duplicating deck:", error)
        }

        onButtonClick(false)
        setRefreshDecks(prev => !prev)
    }

    return (
        <div className="window-box">
            <div className="export">
                <p>Export deck '{currentDeck.name}':</p> {exportCode}
            </div>
            <div className="import">
                <p>Import:</p>
                <input onChange={handleInput} placeholder="deck code here:"></input>
                <button onClick={handleImport}>Import</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}