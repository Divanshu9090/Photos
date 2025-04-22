import { useEffect, useRef, useState } from "react";
import { MdUpload } from "react-icons/md";
import { db, auth } from "../utils/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";

const UploadBtn = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [folder, setFolder] = useState("Recent");
  const [newFolder, setNewFolder] = useState("");
  const [folders, setFolders] = useState([]);

  const user = auth.currentUser;

  // Fetch folders from Firestore
  useEffect(() => {
    if (!user) return;

    const folderRef = collection(db, "users", user.uid, "folders");
    const unsubscribe = onSnapshot(folderRef, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => doc.data().name);
      setFolders(["Recent", ...fetched.filter((f) => f !== "Recent")]);
    });

    return () => unsubscribe();
  }, [user]);

  const handleFolderChange = (e) => {
    setFolder(e.target.value);
  };

  const handleCreateFolder = async () => {
    const trimmed = newFolder.trim();
    if (!trimmed || folders.includes(trimmed)) return;

    try {
      const folderRef = doc(db, "users", user.uid, "folders", trimmed);
      await setDoc(folderRef, { name: trimmed });
      setNewFolder("");
      setFolder(trimmed);
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const saveImageToFirebase = async (url) => {
    if (!user) return;

    try {
      await addDoc(collection(db, "users", user.uid, "photos"), {
        folder,
        imageUrl: url,
        timestamp: serverTimestamp(),
      });
      console.log("✅ Image saved to Firestore");
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djbpxzczf",
        uploadPreset: "First_time_using",
      },
      async function (error, result) {
        if (result && result.event === "success") {
          console.log("📤 Upload Success:", result.info.secure_url);
          await saveImageToFirebase(result.info.secure_url);
        } else if (error) {
          console.error("❌ Upload Error:", error);
        }
      }
    );
  }, [folder]);

  return (
    <div>
      {/* Folder Selector */}
      <div className="folder-control" style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "0.5rem" }}>Choose Folder:</label>
        <select value={folder} onChange={handleFolderChange}>
          {folders.map((f, idx) => (
            <option key={idx} value={f}>
              {f}
            </option>
          ))}
        </select>
        <br />
        <input
          type="text"
          value={newFolder}
          onChange={(e) => setNewFolder(e.target.value)}
          placeholder="New folder name"
          style={{ marginTop: "0.5rem" }}
        />
        <button onClick={handleCreateFolder} style={{ marginLeft: "0.5rem" }}>
          + Create
        </button>
      </div>

      {/* Upload Button */}
      <button
        onClick={() => widgetRef.current.open()}
        style={{
          border: "1px solid black",
          padding: "8px 16px",
          borderRadius: "6px",
          backgroundColor: "#f1f1f1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MdUpload />
        Upload
      </button>
    </div>
  );
};

export default UploadBtn;
