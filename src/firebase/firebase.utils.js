import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAiVS-S6YgGvawUzdpRR0Czo_Bv6Ms4bjs",
    authDomain: "crwn-db-35b4d.firebaseapp.com",
    projectId: "crwn-db-35b4d",
    storageBucket: "crwn-db-35b4d.appspot.com",
    messagingSenderId: "859807634353",
    appId: "1:859807634353:web:f4f3169cb87dc9839da390",
    measurementId: "G-7QXXZWSYWW"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const shapShot = await userRef.get()

    if(!shapShot.exists){
        const { displayName, email } = userAuth
        const createdAt = new Date()
        try{
            await userRef.set({
                displayName, 
                email, 
                createdAt, 
                ...additionalData
            })
        }catch(error){
            console.log('error creating user ', error.message)
        }
    }

    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch()
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, obj)
    })

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data()

        return{
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    } , {})
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ promt:'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase