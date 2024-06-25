import React, { useState } from "react";
import './info.css';
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../../features/user/userSlice";

const Info = ({ loadingUser, user, errorUser }) => {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false);
    const [fullName, setFullName] = useState(user.full_name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')

    const handleEditClick = () => {
        if (!edit) {
            setFullName(user.full_name);
            setEmail(user.email);
            setPassword('');
        } else {
            dispatch(updateUserInfo({ full_name: fullName, email, password }))
            setMessage('Successfully modified')
        }
        setEdit(!edit);
    };

    return (
        <div className="info">
            <p>On this page, you can view your current username and email address. To modify this information, press the "Edit Profile" button. Then, fill in the fields with the new information and press "Edit Profile" again to save the changes.</p>
            {loadingUser || errorUser ? (
                <p>Loading...</p>
            ):(
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start'}}>
                    <div className="flex">
                        <p>Full Name:</p>
                        {!edit && <p>{user.full_name}</p>}
                        {edit && <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />}
                    </div>
                    <div className="flex">
                        <p>Email:</p>
                        {!edit && <p>{user.email}</p>}
                        {edit && <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />}
                    </div>
                    <div className="flex">
                        <p>Password:</p>
                        {!edit && <p>****</p>}
                        {edit && <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />}
                    </div>
                    <button className="edit" onClick={handleEditClick}>{edit ? 'Save' : 'Edit Profile'}</button>
                    {message}
                </div>
            )}
        </div>
    )
}

export default Info;