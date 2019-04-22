/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';


class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
    };
    this.handleNewNote = this.handleNewNote.bind(this);
    this.onTitleInputChange = this.onTitleInputChange.bind(this);
  }

  onTitleInputChange(event) {
    this.setState({ newTitle: event.target.value });
  }

  handleNewNote() {
    this.props.update('addNote', '', this.state.newTitle);
    this.setState({ newTitle: '' });
  }


  render() {
    return (
      <div>
        <input className="newNoteInput" name="title" placeholder="New Note Title" onChange={this.onTitleInputChange} value={this.state.newTitle} />
        <button type="button" onClick={this.handleNewNote}>New Note</button>
      </div>
    );
  }
}
export default AddNote;
