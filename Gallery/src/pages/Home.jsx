import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer.jsx";
import NavBar from "../components/Navbar.jsx";
import UploadBtn from "../components/UploadBtn.jsx";
import { auth, db } from "../utils/firebase";
import "../styles/Home.css";
// import "../styles/UploadBtn.css";

const Home = () => {
  const [images, setImages] = useState([]);
  const [folders, setFolders] = useState(["Recent"]);
  const [folder, setFolder] = useState("Recent");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = collection(db, "users", user.uid, "photos");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const folderSet = new Set(["Recent"]);
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.folder) folderSet.add(data.folder);
      });
      setFolders([...folderSet]);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user || !folder) return;

    const ref = collection(db, "users", user.uid, "photos");
    const q = query(ref, where("folder", "==", folder));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedImages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(fetchedImages);
    });

    return () => unsubscribe();
  }, [folder]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="hero-section">
      <NavBar />
      <div className="folder-selector">
        <label htmlFor="folder-select">View Folder:</label>
        <select
          id="folder-select"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        >
          {folders.map((folder, idx) => (
            <option key={idx} value={folder}>
              {folder}
            </option>
          ))}
        </select>
      </div>
      <UploadBtn folder={folder} setFolder={setFolder} />
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((image) => (
            <div
              className="image-card"
              key={image.id}
              onClick={() => handleImageClick(image.imageUrl)}
            >
              <img src={image.imageUrl} alt="uploaded" className="image" />
            </div>
          ))
        ) : (
          <p className="no-images-text">No images in this folder yet.</p>
        )}
      </div>

      {selectedImage && (
        <div className="image-modal">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <img src={selectedImage} alt="selected" className="modal-image" />
            <button className="close-modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
