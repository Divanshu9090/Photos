import React from "react";

const PhotoCard = ({ imgSrc, title, date, views }) => (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
        <figure className="effect-ming tm-video-item">
            <img src={imgSrc} alt={title} className="img-fluid" />
            <figcaption className="d-flex align-items-center justify-content-center">
                <h2>{title}</h2>
                <a href="#">View more</a>
            </figcaption>
        </figure>
        <div className="d-flex justify-content-between tm-text-gray">
            <span>{date}</span>
            <span>{views} views</span>
        </div>
    </div>
);

export default PhotoCard;
