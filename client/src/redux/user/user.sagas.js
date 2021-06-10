import {takeLatest, put, all, call} from 'redux-saga/effects'

import UserActionTypes from './user.types'

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'

import {signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure} from './user.actions'

export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData)
        const userSnapshot = yield userRef.get()
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* signInWithGoogle(){
    try{
        const { user } = yield auth.signInWithPopup(googleProvider)
        yield getSnapshotFromUserAuth(user)
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* signInWithEmail({payload:{email, password}}){
    try{
        //const { user } = yield auth.signInWithEmailAndPassword(email, password)
        //yield getSnapshotFromUserAuth(user)
        const res = yield fetch('http://localhost:5000/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
        const {user} = yield res.json();
        yield put(signInSuccess(user))
    }catch(error){
        put(signInFailure(error))
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser()
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* signOut(){
    try{
        yield auth.signOut()
        yield (put(signOutSuccess()))
    }catch(error){
        yield put(signOutFailure(error))
    }
}

export function* singUp({payload:{email, displayName, password}}){
    try{
        /*const { user } = yield auth.createUserWithEmailAndPassword(email, password)
        yield put(signUpSuccess({user, additionalData:{displayName}}))*/
        const res = yield fetch('http://localhost:5000/signup', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ displayName, email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        const {user} = yield res.json();
        yield put(signUpSuccess(user))
        yield put(signInSuccess(user))
    }catch(error){
        yield put(signUpFailure(error))
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSingUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START, singUp)
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSingUpStart),
    ])
}
