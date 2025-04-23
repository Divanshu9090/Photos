import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer.jsx";
import NavBar from "../components/Navbar.jsx";
import UploadBtn from "../components/UploadBtn.jsx";
import "../styles/UploadBtn.css";
import { auth, db } from "../utils/firebase";

const Home = () => {
  const [images, setImages] = useState([]);
  const [folders, setFolders] = useState(["Recent"]);
  const [selectedFolder, setSelectedFolder] = useState("Recent");

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
    if (!user || !selectedFolder) return;

    const ref = collection(db, "users", user.uid, "photos");
    const q = query(ref, where("folder", "==", selectedFolder));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedImages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(fetchedImages);
    });

    return () => unsubscribe();
  }, [selectedFolder]);

  return (
    <div className="HeroSection">
      <NavBar />
      <div className="btn-main">
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="folder-select">View Folder: </label>
          <select
            id="folder-select"
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
          >
            {folders.map((folder, idx) => (
              <option key={idx} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </div>
      </div>
      <UploadBtn />
      <div
        className="main"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "10px",
          padding: "1rem 2rem",
          justifyItems: "center",
        }}
      >
        {images.length > 0 ? (
          images.map((image) => (
            <div
              key={image.id}
              style={{
                width: "100%",
                height: "300px",
                overflow: "hidden",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                position: "relative",
                transition: "transform 0.3s ease",
              }}
            >
              <img
                src={image.imageUrl}
                alt="uploaded"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))
        ) : (
          <p>No images in this folder yet.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
