/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';


class AddNote extends Component {
  constructor(props) {
    super(props);
    this.handleNewNote = this.handleNewNote.bind(this);
  }

  handleNewNote() {
    this.props.update('addNote', '', '');
  }

  render() {
    return (
      <button type="button" onClick={this.handleNewNote}>New Note</button>
    );
  }
}
export default AddNote;
