import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Profile({ profile, getProfile }) {
    const { profileId } = useParams();
    const navigate = useNavigate();
    const [profileCard, setProfileCard] = useState(null);

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        if (profile.length > 0 && profileId) {
            const currentIndex = profile.findIndex((myProfile) => myProfile._id === profileId);
            if (currentIndex !== -1) {
                setProfileCard(profile[currentIndex]);
            } else {
                console.error("Profile not found");
                navigate("/404");
            }
        }
    }, [profile, profileId, navigate]);

    if (!profileCard) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            <h1>{profileCard.name}</h1>
            <img src={profileCard.imageUrl} alt={`${profileCard.name}'s profile`} />
            <p>{profileCard.email}</p>
        </div>
    );
}

export default Profile;
