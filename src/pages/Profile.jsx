import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL


function Profile({ profile, getProfile }) {
    const { profileId } = useParams();
    const navigate = useNavigate();
    const [profileCard, setProfileCard] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [originalProfile, setOriginalProfile] = useState({});

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

           getProfile();
            setIsEditing(false);
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
                <img src={profileCard.imageUrl} alt={`${profileCard.name}'s profile`} />
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="name"
                            value={editedProfile.name}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            value={editedProfile.phoneNumber}
                            onChange={handleChange}
                        />
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h1>{profileCard.name}</h1>
                        <p>{profileCard.email}</p>
                        <h1>{profileCard.phoneNumber}</h1>
                        <button onClick={handleEditClick}>Edit Profile</button>
                    </>
                )}
            </div>
            <div>
            </div>
        </div>
    );
}

export default Profile;
