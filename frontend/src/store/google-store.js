import firebase from "firebase";
import config from "./api-key.json";

const fireApp = firebase.initializeApp(config);

export default fireApp;
