import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase/app';

import { firebaseReducer, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import sequences from './sequences/reducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  sequences,
});
const middlewares = [thunk.withExtraArgument(getFirebase)];
const initialState = window && window.__INITIAL_STATE__; // set initial state here
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  // enableClaims: true, // Get custom claims along with the profile
};
export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};
export default store;
