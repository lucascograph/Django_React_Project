import { Navbar } from "../components/Navbar/Navbar";
import { useRef, useEffect, useState } from "react";
import axios from "axios"; // You can import Axios or use your custom API handler

const Kanji = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;
    canvas.style.border = "2px solid black";

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctxRef.current = ctx;
  }, []);

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    ctxRef.current.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    ctxRef.current.clearRect(0, 0, 500, 500);
  };

  // Function to convert the canvas to a Base64 string
  const getBase64Image = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    return dataUrl.split(',')[1];  // Return only the base64 string part
  };

  // Function to send the drawn image to the backend via API POST
  const sendToBackend = async () => {
    const drawnImage = getBase64Image();  // Get the Base64 string of the drawn image

    try {
      const response = await axios.post(`/api/checkImage/`, {
        image: drawnImage  // Send the Base64 string to the API
      });

      // Handle the response from the backend
      const result = response.data;  // Assuming the response is a JSON with "result" field
      console.log("Result from backend:", result);
      if (result) {
        alert("The drawing is similar to the kanji!");
      } else {
        alert("The drawing is not similar to the kanji.");
      }
    } catch (error) {
      console.error("Error sending image to backend:", error);
      alert("An error occurred while sending the image.");
    }
  };

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
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={sendToBackend}>Check Kanji</button> {/* Button to send image */}
      </div>
    </>
  );
};

export default Kanji;
