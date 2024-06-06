import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/profile.css"
import { AuthContext } from "../auth.context";
import { useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL

function Profile({ profile, getProfile }) {
    const { profileId } = useParams();
    const navigate = useNavigate();
    const [profileCard, setProfileCard] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [originalProfile, setOriginalProfile] = useState({});

    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        if (profile.length > 0 && profileId) {
            const currentIndex = profile.findIndex((myProfile) => myProfile._id === profileId);
            if (currentIndex !== -1) {
                setProfileCard(profile[currentIndex]);
                setEditedProfile(profile[currentIndex]);
                setOriginalProfile(profile[currentIndex]);
            } else {
                console.error("Profile not found");
                navigate("/404");
            }
        }
    }, [profile, profileId, navigate]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put(`${API_URL}/users/${profileId}`, editedProfile);

            if (!response.data) {
                throw new Error('Failed to update profile');
            }
            console.log("this is user", profile);
            getProfile();
            setIsEditing(false);
            setUser(response.data.user)
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedProfile(originalProfile);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    if (!profileCard) {
        return <div><img className="ball2" src="https://i.ibb.co/WKTHyR0/white-ball.png" alt="" /></div>;
    }

    const defaultImage = "https://c0.klipartz.com/pngpicture/81/570/gratis-png-perfil-logo-iconos-de-computadora-usuario-usuario.png"

    return (
        <div className="profile">
            <div>
                {isEditing ? (
                    <div className="editor">
                        <div className="edit-profile-title">

                        <h4>Edit profile</h4>
                        </div>
                        <div className="edit-name">
                            <label >Set New Name:</label>
                            <input
                                placeholder="Full Name"
                                type="text"
                                name="name"
                                value={editedProfile.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="edit-phone">
                            <label >New Phone Number:</label>
                            <input
                                placeholder="Only digits"
                                type="text"
                                name="phoneNumber"
                                value={editedProfile.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="edit-location">
                            <label > Where are you now?:</label>
                            <select type="text"
                                name="location"
                                value={editedProfile.location}
                                onChange={handleChange} >
                                <option value="Bilbao">Bilbao</option>
                                <option value="Barcelona">Barcelona</option>
                                <option value="Madrid">Madrid</option>
                                <option value="La Habana">La Habana</option>
                            </select>

                        </div>
                        <div className="edit-image">
                            <label >New image url:</label>
                            <input
                                placeholder="Incert a valid url"
                                type="text"
                                name="image"
                                value={editedProfile.image}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="edit-description">
                            <label >Write something about you:</label>
                            <input
                                placeholder="I am the best player"
                                type="text"
                                name="description"
                                value={editedProfile.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="save-cancel-buttons">
                            <button onClick={handleSaveClick}>Save</button>
                            <button className="cancel-edit-profile" onClick={handleCancelClick}>Cancel</button>
                        </div>

                    </div>
                ) : (
                    <div className="my-profile">
                        <div className="left-profile">
                            <img className="profile-image" src={profileCard.image} alt="profile image" />
                            <h2>{profileCard.name}</h2>
                            <p>email: {profileCard.email}</p>
                            <h4>phone number: {profileCard.phoneNumber}</h4>
                            <h4>Location: {profileCard.location}</h4>

                            <button className="reserve" onClick={handleEditClick}>Edit Profile</button>
                        </div>
                        <div className="right-profile">
                            <h3>Description: </h3>
                            <p>{profileCard.description}</p>
                            <h1>Rank: {profileCard.rank}</h1>
                        </div>
                    </div>
                )}
            </div>

            <div>
            </div>
        </div>
    );
}

export default Profile;
