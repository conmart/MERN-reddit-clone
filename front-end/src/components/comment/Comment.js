import React, { Component } from 'react';
import './Comment.css';
import CreateCommentForm from './CreateCommentForm';
import CommentModel from '../../Models/Comment';
import Voting from '../Voting';


class Comment extends Component {


  constructor(){
    super();
    this.state = {
      comments: []
    };
  }

  fetchComments(){
    CommentModel.commentComments(this.props.postId, this.props.comment._id).then(res => {
      // console.log(res);
      let allComments = res.data;
      // console.log("comments", allComments);
      this.setState({
        comments: allComments
      })
      // console.log(`List of comment belonging to ${this.props.comment.title}, ${this.state.comments}`);
    })
  }

  componentWillMount(){
    // console.log('from componentWillMount', this.props.comment);
    this.fetchComments()
  }

  createComment(comment){
    CommentModel.create(this.props.postId, comment).then(res => {
      // console.log(res);
      this.setState(prevState => {
        prevState.comments.push(res.data);
        return prevState
      })
    })
  }

  onVoteComment(comment, voteDirection){
    let newVotes = comment.votes + voteDirection
    CommentModel.update(this.props.postId, comment, newVotes).then( (res) => {
      this.setState(prevState => {
        let commentToUpdate = prevState.comments.filter((aComment) => {
          return aComment._id === comment._id
        })
        commentToUpdate[0].votes = newVotes
        let sortedComments = prevState.comments.sort(function(a, b){
          return a.votes < b.votes;
        });
        return prevState
      })
    })
  }


  render() {
    return (
      <div className="Comment">
        <p className="Comment-content">
          {this.props.comment.content}
          <br />
          Votes: {this.props.comment.votes}
        </p>

        <CreateCommentForm
        createComment={this.createComment.bind(this)}
        comment_id={this.props.comment._id}
        />
        { this.state.comments.map(comment => {
          return <div>
              <Voting
              onVote={this.onVoteComment.bind(this)}
              elem={comment}/>
              <Comment
              key={comment._id}
              comment={comment}
              postId={this.props.postId}/>
            </div>

        })}
      </div>
    );
  }
}

export default Comment;
