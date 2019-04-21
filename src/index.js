/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-shadow */
/* eslint-disable new-cap */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { id } from 'postcss-selector-parser';
import Immutable from 'immutable';
import Note from './components/note';
import AddNote from './components/add_note';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Immutable.Map(),
      newNoteTitle: '',
      newNoteContent: '',
    };
    this.id = 0;
  }


  update(type, id, value) {
    if (type === 'editTitle') {
      this.setState({
        notes: this.state.notes.update(id, (n) => {
          return Object.assign({}, n, { title: value });
        }),
      });
    }
    if (type === 'editContent') {
      this.setState({
        notes: this.state.notes.update(id, (n) => {
          return Object.assign({}, n, { text: value });
        }),
      });
    }
    if (type === 'editPosition') {
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
      console.log(`notes:  ${this.state.notes}`);
    }
    if (type === 'addNote') {
      const newNote = {
        title: this.state.newNoteTitle,
        text: this.state.newNoteContent,
        x: 10,
        y: 10,
        zIndex: 0,
      };
      this.setState(prevState => ({
        notes: this.state.notes.set(this.id, newNote),
      }));
      this.id += 1;
    }
  }

  render() {
    return (
      <div>
        <AddNote update={(type, key, value) => this.update(type, key, value)} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return <Note id={id} note={note} update={(type, key, value) => this.update(type, key, value)} />;
        })}
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('main'));
