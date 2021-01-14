import firebase from '../../configs/firebase';
const dbRef = firebase.firestore();

export const SET_SEQUENCES = 'SET_SEQUENCES';
export const getSequences = (payload) => async (dispatch) => {
  let sequenceList = [];
  try {
    await dbRef
      .collection('sequences')
      .orderBy('date')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          sequenceList.push({
            ...data,
            id: doc.id,
            date: data.date.toDate(),
          });
        });
        return dispatch({
          type: SET_SEQUENCES,
          payload: sequenceList,
        });
      });
  } catch (error) {
    return console.log('Error getting sequence list: ', error);
  }
};
export const addSequence = (payload) => async (dispatch) => {
  try {
    await dbRef.collection('sequences').add({
      ...payload,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });

    return dispatch(getSequences());
  } catch (error) {
    return console.log('Error adding sequence: ', error);
  }
};
export const editSequence = (payload) => async (dispatch) => {
  const { id, sequence, symptoms, pathogen, viralFactor } = payload;
  try {
    await dbRef
      .collection('sequences')
      .doc(id)
      .update({
        sequence,
        symptoms,
        pathogen,
        viralFactor,
        updated: firebase.firestore.FieldValue.serverTimestamp(),
      })

      .then((querySnapshot) => {
        return dispatch(getSequences());
      });
  } catch (error) {
    return console.log('Error editing sequence: ', error);
  }
};
