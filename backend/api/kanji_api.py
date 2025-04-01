import base64
from io import BytesIO
import numpy as np
from PIL import Image
import tensorflow as tf

# Assuming your model is loaded here (you can load it only once in your app)
# Replace with the actual path to your trained model
model = tf.keras.models.load_model('path/to/your/kanji_model.h5')

def process_image(image_base64):
    """
    Process the Base64 encoded image to prepare it for model prediction.
    """
    # Decode the base64 string into image data
    image_data = base64.b64decode(image_base64)
    image = Image.open(BytesIO(image_data)).convert('L')  # Convert to grayscale
    
    # Resize to the size your model expects (e.g., 28x28 for MNIST)
    image = image.resize((28, 28))
    
    # Convert to numpy array and normalize the pixel values
    img_array = np.array(image) / 255.0
    img_array = img_array.reshape(1, 28, 28, 1)  # Reshape for the model
    
    return img_array

def check_kanji(image_base64, target_kanji):
    """
    Check if the drawn image matches the target Kanji.
    """
    # Process the image
    processed_image = process_image(image_base64)
    
    # Run the model to get a prediction
    prediction = model.predict(processed_image)
    predicted_class = np.argmax(prediction)  # Get the class with the highest probability
    
    # Check if the prediction matches the target Kanji class
    # Assuming you have a mapping of classes to Kanji characters, or your model outputs a Kanji index
    target_kanji_class = get_kanji_class(target_kanji)  # A function that maps 'genki' to the right class
    
    if predicted_class == target_kanji_class:
        return True  # The drawing is similar to the target Kanji
    else:
        return False  # The drawing is not similar

def get_kanji_class(target_kanji):
    """
    Map a target Kanji (e.g., 'genki') to its corresponding class index in the model.
    This is just a simple example; you can extend it based on your model's output.
    """
    kanji_mapping = {
        "genki": 0,  # The class index for 'genki' kanji
        # Add more mappings as needed
    }
    return kanji_mapping.get(target_kanji, -1)  # Return -1 if Kanji not found
