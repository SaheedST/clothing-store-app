import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8gcYEcSb0KE6DNSGPa5RRpLAJtnyeeTo",
  authDomain: "crwn-shopping-db-dfe48.firebaseapp.com",
  projectId: "crwn-shopping-db-dfe48",
  storageBucket: "crwn-shopping-db-dfe48.appspot.com",
  messagingSenderId: "658148651490",
  appId: "1:658148651490:web:fe22321daafaa69bfec9bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Sign in with Google
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// Sign in with Popup
export const signInWithGooglePopup = async () =>
  await signInWithPopup(auth, provider);

// Create user with eamail and password
export const createNewUserWithEmail = async (email, password) => {
  if (!email && !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign user in with email and password
export const signInUserWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign user out
export const signUserOut = async () => {
  await signOut(auth);
};

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Create products collection in Firestore
export const addCollectionAndDocuments =async (collectionKey, objectsToAdd)=>{
const collectionRef = collection(db, collectionKey);
const batch = writeBatch(db);
objectsToAdd.forEach((object) => {
  const docRef = doc (collectionRef, object.title.toLowerCase());
  batch.set(docRef, object)
});

await batch.commit();
console.log('done');

}

// get categories and documents from FireStore
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})

  return categoryMap;
}

// Create user record in Firestore
export const createUserDocFromAuth = async (userAuth, additionalInfo) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return userDocRef;
};

// set up authentication state observer

export const userAuthenticationObserver = (callback) =>
  onAuthStateChanged(auth, callback);
