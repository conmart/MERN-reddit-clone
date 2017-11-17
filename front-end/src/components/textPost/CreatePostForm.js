import React, { Component } from 'react';

class CreatePostForm extends Component {

  constructor(){
      super()
      this.state = {
        title: '',
        content: '',
        thumbnail_image_url: ''
      }
  }

  onInputChange(event, stateVariable){
      this.setState({
        [stateVariable]: event.target.value
      })
  }

  onFormSubmit(event){
    event.preventDefault()
    let post = {
      "title": this.state.title,
      "content": this.state.content,
      "thumbnail_image_url": this.state.thumbnail_image_url,
      "votes": 0
    }
    // console.log(post);
    this.props.createPost(post)
    this.setState({
      title: '',
      content: '',
      thumbnail_image_url: '',
    })
  }


  render() {
    return(
      <div className='createForm textPostForm'>
        <h2>Create New Post</h2>
        <form onSubmit={event => this.onFormSubmit(event)}>
          <input
            onChange={event => this.onInputChange(event, "title")}
            placeholder='Title'
            type='text'
            value={this.state.title} />
          <input
            onChange={event => this.onInputChange(event, "content")}
            placeholder='Content'
            type='text'
            value={this.state.content} />
          <input
            onChange={event => this.onInputChange(event, "thumbnail_image_url")}
            placeholder='Image'
            type='text'
            value={this.state.thumbnail_image_url} />

          <button type='submit'>Create Post</button>
        </form>
      </div>)
  }

}

export default CreatePostForm
