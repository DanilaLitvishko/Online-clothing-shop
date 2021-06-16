import {takeLatest, put, all, call} from 'redux-saga/effects'
import axios from 'axios'

import UserActionTypes from './user.types'

import {signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure} from './user.actions'

export function* signInWithEmail({payload:{email, password}}){
    try{
        const {data} = yield axios.post('http://localhost:5000/login', {email, password }, {withCredentials: true})
        yield put(signInSuccess(data.user))
    }catch(error){
        put(signInFailure(error))
    }
}

export function* isUserAuthenticated(){
    try{
        const {data} = yield axios.get('http://localhost:5000/verify', {withCredentials: true})
        if(data) yield put(signInSuccess(data))
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* signOut(){
    try{
        const {data} = yield axios.get('http://localhost:5000/logout', {withCredentials: true})
        yield (put(signOutSuccess(data.user)))
    }catch(error){
        yield put(signOutFailure(error))
    }
}

export function* singUp({payload:{email, displayName, password}}){
    try{
        const {data} = yield axios.post('http://localhost:5000/signup', { displayName, email, password }, {withCredentials: true})
        yield put(signUpSuccess(data.user))
        yield put(signInSuccess(data.user))
    }catch(error){
        yield put(signUpFailure(error))
    }
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
        call(onEmailSignInStart), 
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSingUpStart),
    ])
}
