import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../utils/firebase';
import { setDoc, doc } from 'firebase/firestore';
import cloudinaryConfig from '../utils/cloudinaryConfig';
import '../styles/SignupDetail.css';
import Logo from '../assets/Logo.jsx';

const SignupDetail = () => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        Name: '',
        gender: '',
        dob: '',
        email: auth.currentUser?.email || '',
        phone: '',
        about: '',
        instagram: '',
        facebook: '',
        pinterest: '',
    });

    const { CLOUDINARY_URL, UPLOAD_PRESET, CLOUD_NAME } = cloudinaryConfig;
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                document.getElementById('hidden').textContent = "Change Image";
            }
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            let profileImageUrl = null;

            if (profileImageFile) {
                const formData = new FormData();
                formData.append('file', profileImageFile);
                formData.append('upload_preset', UPLOAD_PRESET);
                formData.append('cloud_name',CLOUD_NAME);

                const response = await fetch(CLOUDINARY_URL, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                profileImageUrl = data.secure_url;
            }

            await setDoc(doc(db, 'user', auth.currentUser.uid), {
                ...formData,
                profileImage: profileImageUrl,
                userId: auth.currentUser.uid,
                
            });

            console.log('User details saved successfully.');
            navigate('/home');
        } catch (error) {
            console.error('Error saving user details:', error);
        }   finally {
            setLoading(false);
        }
    };

    return (
        <main id="SignupDetail-content">
            <nav className='nav-container'>
                <div id="logo">
                    <Logo/>
                </div>
                <h3>Welcome to PixelVault</h3>
            </nav>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Details</h2>

                    <div className="image-upload">
                        <label htmlFor="profileImage" className="image-upload-label">
                            <span> <h6 id="hidden">Upload Profile Image</h6>
                            <input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            </span>
                        </label>
                        {profileImage && (
                            <div className="image-preview">
                                <img id="ip" src={profileImage} alt="Profile Preview" />
                            </div>
                        )}
                    </div>

                    <fieldset>
                        <legend>Personal Information</legend>
                        <label htmlFor="Name">Name:</label>
                        <input
                            id="name"
                            type="text"
                            name="Name"
                            placeholder='Enter Name'
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                        <br />
                        <label>Gender:</label>
                        <div className="radio-group">
                        <select
                            id="gender"
                            name="gender"
                            style={{ width: "20%", marginLeft: "2%"}}
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="Other">Other</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        </div>
                        <br />
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            id="dob"
                            type="date"
                            name="dob"
                            style={{ width: "15%"}}
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />
                        <br />
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder='exa@gmail.com'
                            value={formData.email}
                            onChange={handleChange}
                            readOnly
                        />
                        <br />
                        <label htmlFor="phone">Phone:</label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            pattern="[0-9]{10}"
                            placeholder="1234567890"
                            required
                        />
                        <br />
                        <label htmlFor="about">About Me:</label>
                        <br />
                        <textarea
                            id="about"
                            name="about"
                            value={formData.about}
                            onChange={handleChange}
                            placeholder="Enter your details here..."
                            maxLength="100"
                            style={{ height: "100px", width: "90%", margin:"0 5%" }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Social Media Links</legend>
                        <label htmlFor="instagram">Instagram:</label>
                        <input
                            id="instagram"
                            type="url"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            placeholder="https://www.instagram.com/username"
                        />
                        <br />
                        <label htmlFor="facebook">Facebook:</label>
                        <input
                            id="facebook"
                            type="url"
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleChange}
                            placeholder="https://facebook.com/username"
                        />
                        <br />
                        <label htmlFor="pinterest">Pinterest:</label>
                        <input
                            id="pinterest"
                            type="url"
                            name="pinterest"
                            value={formData.pinterestb}
                            onChange={handleChange}
                            placeholder="https://pinterest.com/username"
                        />
                    </fieldset>

                    <button type="submit" disabled={loading} className="submit-button">
                        {loading ? 'Uploading...' : 'Submit'}
                    </button>
                    
                </form>
            </div>
        </main>
    );
};

export default SignupDetail;
