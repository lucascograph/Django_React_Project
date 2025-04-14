import { Navbar } from "../components/Navbar/Navbar"
import { useRef, useEffect, useState } from "react"
import Button from "../components/Button/Button"
import axios from "axios"
import "./Kanji.css"

const Kanji = () => {
    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.style.border = "2px solid black"

        const ctx = canvas.getContext("2d")
        ctx.lineWidth = 3
        ctx.lineCap = "round"
        ctx.strokeStyle = "black"
        ctxRef.current = ctx

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }, [])

    const startDrawing = (e) => {
        ctxRef.current.beginPath()
        ctxRef.current.moveTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        )
        setIsDrawing(true)
    }

    const draw = (e) => {
        if (!isDrawing) return
        ctxRef.current.lineTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        )
        ctxRef.current.stroke()
    }

    const stopDrawing = () => {
        ctxRef.current.closePath()
        setIsDrawing(false)
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        const ctx = ctxRef.current

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const getBase64Image = () => {
        const canvas = canvasRef.current
        const dataUrl = canvas.toDataURL("image/png")
        return dataUrl.split(',')[1] 
    }

   
    const sendToBackend = async () => {
        const drawnImage = getBase64Image()
        console.log(drawnImage)

        try {
            const response = await axios.post('/api/checkImage/', {
                image: drawnImage 
            })


            const result = response.data
            console.log("Result from backend:", result)
            if (result) {
                alert("The drawing is similar to the kanji!")
            } else {
                alert("The drawing is not similar to the kanji.")
            }
        } catch (error) {
            console.error("Error sending image to backend:", error)
            alert("An error occurred while sending the image.")
        }
    }

    return (
        <>
            <Navbar />
            <div className="drawing-board-container">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    width={500}
                    height={500}
                />
                <div className="canvas-bottons">
                    <Button standard onClick={clearCanvas}>Clear</Button>
                    <Button standard onClick={sendToBackend}>Check Kanji</Button>
                </div>
            </div>
        </>
    )
}

export default Kanji
