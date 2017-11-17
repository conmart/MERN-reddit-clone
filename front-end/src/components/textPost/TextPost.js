import React, { Component } from 'react';
import './TextPost.css';
import { Link } from 'react-router-dom';


class TextPost extends Component {



  render() {
    return (
      <div className="TextPost">
        <Link to={`/posts/${this.props.post._id}`} className="TextPost-content">
          <h2> {this.props.post.title} </h2>
        </Link>
          TextPost content: {this.props.post.content}
          <br />
          <img src={this.props.post.thumbnail_image_url} />
          <h4>Votes: {this.props.post.votes}</h4>

      </div>
    );
  }
}

export default TextPost;
