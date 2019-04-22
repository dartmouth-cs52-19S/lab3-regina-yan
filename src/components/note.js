/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newContent: '',
      newTitle: '',
      isEditing: 0,
    };
    this.position = { x: [props.note.x], y: [props.note.y] };
    this.onContentInputChange = this.onContentInputChange.bind(this);
    this.onTitleInputChange = this.onTitleInputChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  onContentInputChange(event) {
    if (this.state.isEditing === 1) {
      this.setState({ newContent: event.target.value });
      console.log(`New Content is  ${this.newContent}`);
    }
  }

  onTitleInputChange(event) {
    if (this.state.isEditing === 1) {
      this.setState({ newTitle: event.target.value });
      console.log(`New Title is  ${this.newTitle}`);
    }
    this.props.update('editTitle', this.props.id, this.state.newTitle);
  }

  toggleEdit() {
    this.setState({ isEditing: 1 });
  }

  toggleSave() {
    console.log(this.newTitle);
    if (this.state.newTitle !== '') {
      this.props.update('editTitle', this.props.id, this.state.newTitle);
    }
    if (this.state.newContent !== '') {
      this.props.update('editContent', this.props.id, this.state.newContent);
    }
    this.setState({ isEditing: 0 });
  }

  handleDelete() {
    this.props.update('deleteNote', this.props.id, '');
  }

  handleDrag(event, ui) {
    this.props.update('editPosition', this.props.id, ui);
  }

  renderContent() {
    if (this.state.isEditing === 1) {
      return (
        <div className="editingnote">
          <div className="header">
            <div>
              <input name="title" placeholder={this.props.note.title} onChange={this.onTitleInputChange} value={this.state.newTitle} />
            </div>
            <div className="action-icons">
              <i onClick={this.toggleSave} className="fas fa-check" />
              <i onClick={this.handleDelete} className="far fa-trash-alt" />
              <i onClick={this.handleDrag} className="drag fas fa-arrows-alt" />
            </div>
          </div>
          <div>
            <textarea className="editing" placeholder={this.props.note.text} onChange={this.onContentInputChange} value={this.state.newContent} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="note">
          <div className="header">
            <div>
              <input className="notEditing" name="title" placeholder="New Note" onChange={this.onTitleInputChange} value={this.props.note.title} />
            </div>
            <div className="action-icons">
              <i onClick={this.toggleEdit} className="far fa-edit" />
              <i onClick={this.handleDelete} className="far fa-trash-alt" />
              <i onClick={this.handleDrag} className="drag fas fa-arrows-alt" />
            </div>
          </div>
          <div>
            <textarea className="notEditing" placeholder="Click Edit Button to edit Title and Text" onChange={this.onContentInputChange} value={this.props.note.text} />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <Draggable
        handle=".drag"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onDrag={this.handleDrag}
      >
        <div>
          {this.renderContent()}
        </div>

      </Draggable>
    );
  }
}
export default Note;
