import firebase from "firebase"; 
const config = {
    apiKey: "AIzaSyAfMsMQ2R8ZRSe608PTIpf_YVDg2iDKkuk",
    authDomain: "geoart-v4.firebaseapp.com",
    databaseURL: "https://geoart-v4.firebaseio.com",
    projectId: "geoart-v4",
    storageBucket: "geoart-v4.appspot.com",
    messagingSenderId: "677593427351"
    };
    
const fireApp = firebase.initializeApp(config);



export default fireApp; 



