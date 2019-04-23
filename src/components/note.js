/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newContent: '',
      newTitle: '',
      isEditing: 0,
      hasEdited: 0,
    };
    this.undoContent = '';
    this.undoTitle = '';
    this.position = { x: [props.note.x], y: [props.note.y] };
    this.onContentInputChange = this.onContentInputChange.bind(this);
    this.onTitleInputChange = this.onTitleInputChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleUndo = this.toggleUndo.bind(this);
  }


  onContentInputChange(event) {
    if (this.state.isEditing === 1) {
      this.setState({ newContent: event.target.value });
    }
  }

  onTitleInputChange(event) {
    if (this.state.isEditing === 1) {
      this.setState({ newTitle: event.target.value });
    }
    this.props.update('editTitle', this.props.id, this.state.newTitle);
  }

  toggleUndo() {
    if (this.state.newTitle !== '') {
      this.props.update('editTitle', this.props.id, this.state.undoTitle);
    }
    if (this.state.newContent !== '') {
      this.props.update('editContent', this.props.id, this.state.undoContent);
    }
  }

  toggleEdit() {
    this.setState({ isEditing: 1 });
    this.setState({ undoContent: this.props.note.text });
    this.setState({ undoTitle: this.props.note.title });
    this.setState({ newTitle: this.props.note.title });
    this.setState({ newContent: this.props.note.text });
  }

  toggleSave() {
    if (this.state.newTitle !== '') {
      this.props.update('editTitle', this.props.id, this.state.newTitle);
    }
    if (this.state.newContent !== '') {
      this.props.update('editContent', this.props.id, this.state.newContent);
    }
    this.setState({ isEditing: 0 });
    this.setState({ hasEdited: 1 });
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
            <TextareaAutosize
              style={{ boxSizing: 'border-box' }}
              minRows={3}
              className="editing"
              placeholder={this.props.note.text}
              onChange={this.onContentInputChange}
              value={this.state.newContent}
            />
          </div>
        </div>
      );
    }
    if (this.state.hasEdited === 1) {
      return (
        <div className="note">
          <div className="header">
            <div>
              <input className="notEditing" name="title" placeholder="New Note" onChange={this.onTitleInputChange} value={this.props.note.title} />
            </div>
            <div className="action-icons">
              <i onClick={this.toggleUndo} className="fas fa-undo" />
              <i onClick={this.toggleEdit} className="far fa-edit" />
              <i onClick={this.handleDelete} className="far fa-trash-alt" />
              <i onClick={this.handleDrag} className="drag fas fa-arrows-alt" />
            </div>
          </div>
          <div>
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
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
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
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
