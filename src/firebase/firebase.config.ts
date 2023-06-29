import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ENV } from '@/utils/constanrs';

console.log(ENV);

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: ENV.REACT_APP_FIREBASE_API_KEY,
	authDomain: ENV.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: ENV.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: ENV.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: ENV.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: ENV.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore;

export { db, firebase as fireb };
