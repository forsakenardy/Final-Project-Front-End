import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Profile ({ profile, getProfile }) {

    const { profileId } = useParams();
    const navigate = useNavigate();

    const [ profileCard, setProfileCard] = useState(null);


    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        if (profile.length > 0 && profileId) {
            const currentIndex = profile.findIndex((myProfile) => myProfile._id === (profileId));
            if (currentIndex !== -1) {
                setProfileCard(profile[currentIndex]);
            } else {
                console.error("Location not found");
                navigate("/404");
            }
        }
    }, [profile, profileId, navigate]);

    return (
        <div className="profile">
            <h1>{profileCard.name}</h1>
        </div>
    )
}

export default Profile