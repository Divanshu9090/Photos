import React from "react";
import HeroSection from "../components/HeroSection";
import VideoCard from "../components/VideoCard";

const videos = [
  { imgSrc: "img/img-01.jpg", title: "Hangers", date: "24 Oct 2020", views: 10460 },
  { imgSrc: "img/img-02.jpg", title: "Perfumes", date: "22 Oct 2020", views: 14502 },
];

const Videos = () => (
  <>
    <HeroSection title="Latest Videos" />
    <div className="container-fluid tm-container-content tm-mt-60">
      <div className="row">
        {videos.map((video, idx) => (
          <VideoCard key={idx} {...video} />
        ))}
      </div>
    </div>
  </>
);

export default Videos;
