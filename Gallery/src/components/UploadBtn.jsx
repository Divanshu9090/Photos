import { MdUpload } from "react-icons/md";
import "../styles/UploadBtn.css";

const UploadBtn = () => {
  return (
    <>
      <button className="uploadBtn">
        {" "}
        <MdUpload className="btn" />
        Upload
      </button>
    </>
  );
};

export default UploadBtn;
