/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      newContent: '',
      newTitle: '',
    };
    this.position = { x: [props.note.x], y: [props.note.y] };
    this.onContentInputChange = this.onContentInputChange.bind(this);
    this.onTitleInputChange = this.onTitleInputChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  onContentInputChange(event) {
    this.setState({ newContent: event.target.value });
    this.setState({ newContent: event.target.value });
    this.props.update('editContent', this.props.id, event.target.value);
  }

  onTitleInputChange(event) {
    console.log(event.target.value);
    this.setState({ newTitle: event.target.value });
    this.props.update('editTitle', this.props.id, event.target.value);
  }


  handleDelete() {
    this.props.update('deleteNote', this.props.id, '');
  }

  handleDrag(event, ui) {
    this.props.update('editPosition', this.props.id, ui);
  }

  renderContent() {
    return (
      <div>
        <div className="header">
          <div>
            <input name="title" placeholder="new Title" onChange={this.onTitleInputChange} value={this.state.newTitle} />
          </div>
          <div className="action-icons">
            <i onClick={this.handleDelete} className="far fa-trash-alt" />
            <i onClick={this.handleEdit} className="far fa-edit" />
            <i onClick={this.handleDrag} className="drag fas fa-arrows-alt" />
          </div>
        </div>
        <div>
          <textarea onChange={this.onContentInputChange} value={this.state.newContent} />
          {/* <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} /> */}
        </div>
      </div>
    );
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
        <div className="note">
          {this.renderContent()}
        </div>

      </Draggable>
    );
  }
}
export default Note;
