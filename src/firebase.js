// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc2eu0XSnWjn9QmT5D-bELuGFhK66GSpM",
  authDomain: "photo-web-app-73f78.firebaseapp.com",
  projectId: "photo-web-app-73f78",
  storageBucket: "photo-web-app-73f78.appspot.com",
  messagingSenderId: "777356004686",
  appId: "1:777356004686:web:ac2c16a765dfd151de621f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const storage = getStorage();

export function signup(email, password){
    return createUserWithEmailAndPassword(auth, email, password);

}

export function login(email, password){
    return signInWithEmailAndPassword(auth, email, password);

}

export function useAuth(){
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user) );
        return unsub;
    }, [])

    return currentUser;
}

export function logout(){
    return signOut(auth);
}


export async function upload(file, currentUser, setLoading){
    const fileRef = ref(storage, currentUser.uid + '.png');
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(currentUser, {photoURL});

    
    
    setLoading(false);
    alert("File Uploaded Successfully");
}