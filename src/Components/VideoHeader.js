import React from 'react';
import './VideoHeader.css';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function VideoHeader() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleCameraClick = () => {
        navigate('/submit'); // Navigate to /submit when the camera icon is clicked
    };

    return (
        <div className='videoHeader'>
            <ArrowBackIosIcon />
            <h3>Hive Reels</h3>
            <CameraAltOutlinedIcon onClick={handleCameraClick} style={{ cursor: 'pointer' }} />
        </div>
    );
}

export default VideoHeader;
