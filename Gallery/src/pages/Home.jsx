import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer.jsx";
import NavBar from "../components/Navbar.jsx";
import UploadBtn from "../components/UploadBtn.jsx";
import ImageCard from "../components/ImageCard.jsx"; // Import the ImageCard component
import { auth, db } from "../utils/firebase";
import EditImage from "../components/EditImage.jsx";

const Home = () => {
  const [images, setImages] = useState([]);
  const [folders, setFolders] = useState(["Recent"]);
  const [selectedFolder, setSelectedFolder] = useState("Recent");
  const [isEditing, setIsEditing] = useState(false);
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

  const handleEdit = (image) => {
    setSelectedImage(image);
    setIsEditing(true);
  };

  const handleSave = async (editedImage) => {
    console.log("Saving edited image:", editedImage);
    setIsEditing(false);
    setSelectedImage(null);
  };

  return (
    <div className="HeroSection" >
      <NavBar />
      <div className="btn-main">
        <div style={{ marginTop: "3rem" }}>
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
      <ImageCard images={images} onEdit={handleEdit} />{" "}
      {/* Pass images and edit handler */}
      {isEditing && selectedImage && (
        <EditImage
          image={selectedImage}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default Home;
