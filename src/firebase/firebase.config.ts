import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCX_nci2fCN7LXsQ3R5pVF4lBf_c2Xe4cc',
	authDomain: 'diagnostikare-prueba.firebaseapp.com',
	projectId: 'diagnostikare-prueba',
	storageBucket: 'diagnostikare-prueba.appspot.com',
	messagingSenderId: '220329853223',
	appId: '1:220329853223:web:88c2f6fd0d2565c9962902',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore;

export { db, firebase as fireb };
