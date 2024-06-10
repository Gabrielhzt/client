import React from "react";
import './info.css';

const Info = ({ loadingUser, user, errorUser }) => {
    return (
        <div className="info">
            <p>On this page, you can view your current username and email address. To modify this information, press the "Edit Profile" button. Then, fill in the fields with the new information and press "Edit Profile" again to save the changes.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start'}}>
                <p>Full Name: {user.full_name}</p>
                <p>Email: {user.email}</p>
                <p>Password: ****</p>
                <button className="edit">Edit</button>
            </div>
        </div>
    )
}

export default Info;