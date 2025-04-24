import React, { useState } from "react";
import "../styles/EditImage.css";

const EditImage = ({ image, onSave, onCancel }) => {
  console.log("Editing image:", image);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [blur, setBlur] = useState(0);
  const [editedImage, setEditedImage] = useState(image.imageUrl); // Start with the original image
  const handleSave = () => {
    onSave({ ...image, editedImage });
  };

  return (
    <div className="edit-image-container" style={{ marginBottom: "3rem" }}>
      <h2>Edit Image</h2>
      <img
        src={editedImage}
        alt="Editing"
        style={{
          transform: `scale(${zoom}) rotate(${rotation}deg)`,
          filter: `blur(${blur}px)`,
          maxWidth: "100%",
          maxHeight: "500px",
        }}
      />
      <div className="controls">
        <div>
          <label>Zoom:</label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
        </div>
        <div>
          <label>Rotation:</label>
          <input
            type="number"
            value={rotation}
            onChange={(e) => setRotation(e.target.value)}
          />
        </div>
        <div>
          <label>Blur:</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={blur}
            onChange={(e) => setBlur(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleSave}>Save Image</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditImage;
