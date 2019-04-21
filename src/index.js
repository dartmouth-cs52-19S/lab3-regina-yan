/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-shadow */
/* eslint-disable new-cap */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { id } from 'postcss-selector-parser';
import Immutable from 'immutable';
import Note from './components/note';

// const App = () => <div className="test">All the REACT are belong to us!</div>;
// const newNotes = Object.assign({}, this.state.notes, newNote);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Immutable.Map({
        0: {
          title: 'title1',
          text: 'asdf',
          x: 10,
          y: 10,
          zIndex: 0,
        },
        1: {
          title: 'title2',
          text: 'fdsa',
          x: 30,
          y: 30,
          zIndex: 0,
        },
        // 2: {
        //   title: 'title2',
        //   text: 'fdsa',
        //   x: 30,
        //   y: 30,
        //   zIndex: 0,
        // },
      }),
      //   editContent: '',
      //   editTitle: '',
      newNoteTitle: '',
      newNoteContent: '',
    };
  }


  update(type, id, value) {
    if (type === 'editTitle') {
      console.log(`type is ${type}`);
      console.log(`id is ${id}`);
      console.log(`value is ${value}`);
      this.setState({
        notes: this.state.notes.update(id, (n) => {
          return Object.assign({}, n, { title: value });
        }),
      });
    }
    if (type === 'editContent') {
      console.log(`type is ${type}`);
      console.log(`id is ${id}`);
      console.log(`value is ${value}`);
      this.setState({
        notes: this.state.notes.update(id, (n) => {
          return Object.assign({}, n, { text: value });
        }),
      });
    }
    if (type === 'editPosition') {
      console.log(`type is ${type}`);
      console.log(`id is ${id}`);
      console.log(`value is ${value}`);
      this.setState({
        notes: this.state.notes.update(id, (n) => {
          return Object.assign({}, n, { x: value.x, y: value.y });
        }),
      });
    }
    if (type === 'deleteNote') {
      this.setState(prevState => ({
        notes: prevState.notes.delete(id),
      }));
    }
    if (type === 'newNote') {
      this.setState(prevState => ({
        notes: prevState.notes.set(id, value),
      }));
    }
  }

  render() {
    return (
      <div>
        {this.state.notes.entrySeq().map(([id, note]) => {
          console.log('here is a note');
          return <Note id={id} note={note} update={(type, key, value) => this.update(type, key, value)} />;
        })}
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('main'));
