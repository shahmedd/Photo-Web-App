import { useAuth, upload } from "./firebase";
import { useEffect, useState } from "react";

export default function Profile(){

    const currentUser = useAuth();
    const [photoURL, setPhotoURL] = useState("https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg");
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleChange(e){
        if (e.target.files[0]){
            setPhoto(e.target.files[0])
        }

    }

    function handleClick(){
        upload(photo, currentUser, setLoading);

    }

    useEffect(() => {
        if (currentUser?.photoURL){
            
            setPhotoURL(currentUser.photoURL)
        }
        
    }, [currentUser])


    return (
        <div className="imgfields">
            <input type="file" onChange={handleChange}/>
            <button id="uploadfile_btn" disabled={loading || !photo} onClick={handleClick} >Upload</button>
            <img src={photoURL} alt="Profile_Img" className="profileimg"/>
        </div>
    );
}