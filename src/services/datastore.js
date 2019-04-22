/* eslint-disable import/prefer-default-export */
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCUzXMy0gIiqwblcDyDjCc6TS-bRhg3Ajk',
  authDomain: 'cs52-lab3-c1f35.firebaseapp.com',
  databaseURL: 'https://cs52-lab3-c1f35.firebaseio.com',
  projectId: 'cs52-lab3-c1f35',
  storageBucket: 'cs52-lab3-c1f35.appspot.com',
  messagingSenderId: '900658289334',
};
firebase.initializeApp(firebaseConfig);

export function fetchNotes(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function editTitle(id, value) {
  firebase.database().ref('notes').child(id).update({ title: value });
}
export function editContent(id, value) {
  firebase.database().ref('notes').child(id).update({ text: value });
}

export function deleteNote(id) {
  firebase.database().ref('notes').child(id).remove();
}

export function addNote() {
  firebase.database().ref('notes').push({
    title: '',
    text: '',
    x: 10,
    y: 10,
    zIndex: 0,
  });
}

export function editPosition(id, x, y) {
  firebase.database().ref('notes').child(id).update({ x, y });
}
