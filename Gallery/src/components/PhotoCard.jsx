import React from "react";
import "../styles/ImageCard.css"; 

const PhotoCard = ({ imgSrc, title, date }) => {
  return (
    <div className="photo-card">
      <img src={imgSrc} alt={title} className="photo-card-image" />
      <div className="photo-card-info">
        <p className="photo-card-date">{date}</p>
      </div>
    </div>
  );
};

export default PhotoCard;
