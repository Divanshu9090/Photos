const cloudinaryConfig = {
    CLOUDINARY_URL: import.meta.env.VITE_APP_CLOUDINARY_URL,
    UPLOAD_PRESET: import.meta.env.VITE_APP_UPLOAD_PRESET,
    NAME: import.meta.env.VITE_APP_CLOUDINARY_NAME,
};

export default cloudinaryConfig;