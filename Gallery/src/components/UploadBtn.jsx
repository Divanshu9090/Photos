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
  getDocs,
} from "firebase/firestore";
import "../styles/UploadBtn.css"; // Import your CSS file

const UploadBtn = ({ folder, setFolder }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [newFolder, setNewFolder] = useState("");
  const [folders, setFolders] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const folderRef = collection(db, "users", user.uid, "folders");
    const unsubscribe = onSnapshot(folderRef, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => doc.data().name);
      setFolders(["Recent", ...fetched.filter((f) => f !== "Recent")]);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchTotalStorage = async () => {
      const photosRef = collection(db, "users", user.uid, "photos");
      const snapshot = await getDocs(photosRef);
      let total = 0;
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.size) total += data.size;
      });
      setTotalSize(total);
    };

    fetchTotalStorage();
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

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    else return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const saveImageToFirebase = async (url, sizeInBytes) => {
    if (!user) return;

    try {
      await addDoc(collection(db, "users", user.uid, "photos"), {
        folder,
        imageUrl: url,
        size: sizeInBytes,
        timestamp: serverTimestamp(),
      });

      setTotalSize((prevSize) => prevSize + sizeInBytes); // still update live
      console.log("Image saved to Firestore");
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
          const imageUrl = result.info.secure_url;
          const imageSize = result.info.bytes;

          console.log("Upload Success:", imageUrl);
          console.log("Image Size (bytes):", imageSize);

          await saveImageToFirebase(imageUrl, imageSize);
        } else if (error) {
          console.error("Upload Error:", error);
        }
      }
    );
  }, [folder]);

  return (
    <div className="upload-section">
      {/* Folder Selector */}
      <div className="folder-control">
        <label>Choose Folder:</label>
        <select value={folder} onChange={handleFolderChange}>
          {folders.map((f, idx) => (
            <option key={idx} value={f}>
              {f}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newFolder}
          onChange={(e) => setNewFolder(e.target.value)}
          placeholder="New folder name"
        />
        <button onClick={handleCreateFolder}>+ Create</button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* Upload Button */}
        {totalSize < 100 * 1024 * 1024 ? (
          <button
            className="upload-trigger"
            onClick={() => widgetRef.current.open()}
          >
            <MdUpload />
            Upload
          </button>
        ) : (
          <div className="limit-exceeded">Storage Limit Exceeded (100 MB)</div>
        )}

        {/* Storage Usage */}
        <div className="storage-text">
          Storage Used: <span>{formatSize(totalSize)}</span>
        </div>
      </div>
    </div>
  );
};

export default UploadBtn;
