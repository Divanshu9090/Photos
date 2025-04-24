import React from "react";
import "../styles/ImageCard.css";
import PhotoCard from "./PhotoCard";

const ImageCard = ({ images, onEdit }) => {
  return (
    <div className="image-card-container">
      {images.length > 0 ? (
        images.map((image) => (
          <div key={image.id} className="photo-card-wrapper">
            <PhotoCard
              imgSrc={image.imageUrl}
              title={image.title || "Untitled"}
              date={image.timestamp?.toDate().toLocaleDateString() || "N/A"}
            />

            <button className="edit-button" onClick={() => onEdit(image)}>
              Edit
            </button>
          </div>
        ))
      ) : (
        <p>No images in this folder yet.</p>
      )}
    </div>
  );
};

export default ImageCard;
