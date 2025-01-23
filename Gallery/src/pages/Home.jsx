import React from "react";
import HeroSection from "../components/HeroSection";
import PhotoCard from "../components/PhotoCard";

const Home = () => (
  <>
    <HeroSection title="Welcome to PhotoVault" />
    <div className="container-fluid tm-container-content tm-mt-60">
      <div className="row">
        {photos.map((photo, idx) => (
          <PhotoCard key={idx} {...photo} />
        ))}
      </div>
    </div>
  </>
);

export default Home;
