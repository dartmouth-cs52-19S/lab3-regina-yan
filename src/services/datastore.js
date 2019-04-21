/* eslint-disable import/prefer-default-export */
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCUzXMy0gIiqwblcDyDjCc6TS-bRhg3Ajk',
  authDomain: 'cs52-lab3-c1f35.firebaseapp.com',
  databaseURL: 'https://cs52-lab3-c1f35.firebaseio.com',
  projectId: 'cs52-lab3-c1f35',
  storageBucket: 'cs52-lab3-c1f35.appspot.com',
  messagingSenderId: '900658289334',
};
firebase.initializeApp(config);

export function fetchNotes(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    const newNotesState = snapshot.val();
    callback(newNotesState);
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
    content: '',
    x: 10,
    y: 10,
    editor: '',
  });
}

export function editPosition(id, x, y) {
  firebase.database().ref('notes').child(id).update({ x, y });
}
