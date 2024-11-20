import { useContext, useState } from "react"
import { FlashcardContext } from "../../../contexts/FlashcardContext"
import api from "../../../Api"
import "./ExportImportDeck.css"
import Button from "../../Button/Button"

export const ExportImportDeck = ( { onButtonClick, position } ) => {

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
            const deckExists = response.data["already_exists"];
            if (!deckExists) {
                setCurrentDeck(response.data["deck"])
            } else {
                alert("A copy of this deck already exists!")
            }
        } catch (error) {
            console.error("error duplicating deck:", error)
        }

        onButtonClick(false)
        setRefreshDecks(prev => !prev)
    }

    return (
        <div className='export-box' style={{left: `${position[0]}px`, top: `${position[1] - 200}px`}}>
            <div className='export-field'>Export {currentDeck?.name}: <span className="export-code">{exportCode}</span></div>
            <div className="import-field">
                Import: <input className="import-input" onChange={handleInput} placeholder="code here"></input>
            </div>
            <div className='import-buttons'>
                <Button standard onClick={handleImport}>Import</Button>
                <Button standard onClick={handleCancel}>Cancel</Button>
            </div>
        </div>
    )
}