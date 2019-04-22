/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-shadow */
/* eslint-disable new-cap */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import Immutable from 'immutable';
import Note from './components/note';
import AddNote from './components/add_note';
import * as db from './services/datastore';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Immutable.Map(),
    };
    this.id = 0;
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
  }

  update(type, id, value) {
    if (type === 'editTitle') {
      console.log(`Passed in the title  ${value}`);
      console.log(`with the id  ${id}`);
      db.editTitle(id, value);
    }
    if (type === 'editContent') {
      db.editContent(id, value);
    }
    if (type === 'editPosition') {
      db.editPosition(id, value.x, value.y);
    }
    if (type === 'deleteNote') {
      db.deleteNote(id);
    }
    if (type === 'addNote') {
      db.addNote();
      this.id += 1;
    }
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>Regina's Notes</h1>
          <h3>Click the "New Note" button to get started.</h3>
        </div>
        <AddNote update={(type, key, value) => this.update(type, key, value)} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return <Note key={id} id={id} note={note} update={(type, key, value) => this.update(type, key, value)} />;
        })}
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('main'));
