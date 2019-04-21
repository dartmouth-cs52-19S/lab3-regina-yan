/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';


class AddNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newContent: '',
      newTitle: '',
    };
    this.position = { x: [props.note.x], y: [props.note.y] };
    this.onContentInputChange = this.onContentInputChange.bind(this);
    this.onTitleInputChange = this.onTitleInputChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  render() {
    return (
      <div>
        <div>New Note Title</div>
        <div>
          <input name="title" placeholder="new Title" onChange={this.onTitleInputChange} value={this.state.newTitle} />
        </div>
        <div>New Note Content</div>
        <div>
          <textarea onChange={this.onContentInputChange} value={this.state.newContent} />
        </div>
      </div>
    );
  }
}
export default AddNote;
