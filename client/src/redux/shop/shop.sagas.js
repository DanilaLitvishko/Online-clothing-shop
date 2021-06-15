import { takeLatest, call, put, all } from 'redux-saga/effects'

import { firestore, convertCollectionsSnapshotToMap } from '../../utils/firebase.utils' 

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import ShopActionTypes from './shop.types'

export function* fetchCollectionsAsync(){
    
    try{
        const collectionRef = yield firestore.collection('collections');
        const snapshot = yield collectionRef.get()
        console.log(snapshot)
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
        yield put(fetchCollectionsSuccess(collectionsMap))
    }catch(error){
        console.log(error)
        yield put(fetchCollectionsFailure(error))
    }
}

export function* fetchCollectionsStart(){
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync 
    )
}

export function* shopSagas(){
    yield(all([call(fetchCollectionsStart)]))
}