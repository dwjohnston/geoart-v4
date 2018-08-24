import firebase from "firebase"; 
import config from "./api-key"; 
    
const fireApp = firebase.initializeApp(config);

export default fireApp; 



