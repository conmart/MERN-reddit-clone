import React, { Component } from 'react';

class CreateCommentForm extends Component {

  constructor(){
      super()
      this.state = {
        content: ''
      }
  }

  onInputChange(event){
      this.setState({
        content: event.target.value
      })
  }

  onFormSubmit(event){
    event.preventDefault()
    let comment = {
      "content": this.state.content,
      "votes": 0,
      "post_id": this.props.post_id,
      "comment_id": this.props.comment_id
    }
    // console.log('Comment from FormSubmit', comment);
    this.props.createComment(comment)
    this.setState({
      content: ''
    })
  }


  render() {
    return(
      <div className='createForm CommentForm'>
        <form onSubmit={event => this.onFormSubmit(event)}>
          <input
            onChange={event => this.onInputChange(event, "content")}
            placeholder='Write Comment Here'
            type='text'
            value={this.state.content} />
          <button type='submit'>Add Comment</button>
        </form>
      </div>)
  }

}

export default CreateCommentForm
