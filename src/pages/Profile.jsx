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

    const { user, setUser} = useContext(AuthContext);


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
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            <div>
                {isEditing ? (
                    <div className="editor">
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
                        <div className="edit=phone">
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
                            <label > where are u now?:</label>
                            <input
                                type="text"
                                name="location"
                                value={editedProfile.location}
                                onChange={handleChange}
                            />
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
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                ) : (
                    <div className="my-profile">
                        <div className="left-profile">
                            <img className="profile-image" src={profileCard.image} alt="profile image" />
                            <h1>{profileCard.name}</h1>
                            <p>email: {profileCard.email}</p>
                            <p>phone number: {profileCard.phoneNumber}</p>
                            <h1>Elo: {profileCard.rank}</h1>
                            <button onClick={handleEditClick}>Edit Profile</button>
                        </div>
                        <div className="right-profile">
                            <h1>Location: </h1>
                            <h3>{profileCard.location}</h3>
                            <h1>Description: </h1>
                            <h2>{profileCard.description}</h2>
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
