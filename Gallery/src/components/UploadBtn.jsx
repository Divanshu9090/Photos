import { useEffect, useRef, useState } from "react";
import { MdUpload } from "react-icons/md";
import axios from "axios";

const UploadBtn = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [uploadedImages, setUploadedImages] = useState([]); // To store the uploaded images

  // Fetch images from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/images");
        setUploadedImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djbpxzczf", // your Cloudinary cloud name
        uploadPreset: "First_time_using", // your upload preset
      },
      async function (error, result) {
        if (result && result.event === "success") {
          console.log("Upload Success:", result.info.secure_url);
          // Send the image URL to the backend
          try {
            await axios.post("http://localhost:5000/upload", {
              imageUrl: result.info.secure_url,
            });
            // Optionally, update frontend state to reflect the new image
            setUploadedImages((prevImages) => [
              ...prevImages,
              { imageUrl: result.info.secure_url },
            ]);
          } catch (error) {
            console.error("Error saving image URL to database:", error);
          }
        } else if (error) {
          console.error("Upload Error:", error);
        }
      }
    );
  }, []);

  return (
    <div>
      {/* Upload button */}
      <button
        onClick={() => widgetRef.current.open()}
        style={{
          position: "absolute",
          top: "60px",
          right: "10px",
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

      {/* Display uploaded images */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "flex-start",
          padding: "50px 20px 20px 20px",
        }}
      >
        {uploadedImages.length > 0 ? (
          uploadedImages.map((image, index) => (
            <div key={index} style={{ width: "auto", height: "350px" }}>
              <img
                src={image.imageUrl}
                alt={`uploaded-image-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          ))
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default UploadBtn;
