import React, {Component} from 'react';
import TextPost from '../components/textPost/TextPost';
import TextPostModel from '../Models/TextPost';
import CommentModel from '../Models/Comment';
import Comment from '../components/comment/Comment';
import Voting from '../components/Voting';
import CreateCommentForm from '../components/comment/CreateCommentForm';
import { Link } from 'react-router-dom';

class PostContainer extends Component {

  constructor(){
    super();
    this.state = {
      post: '',
      comments: []
    };
  }


  fetchComments(){
    CommentModel.all(this.state.post._id).then(res => {
      let allComments = res.data;
      this.setState({
        comments: allComments
      })
    })
  }

  componentWillMount(){
    let postId = this.props.match.params.id;
    TextPostModel.getOne(postId).then(res => {
      let thePost = res.data;
      this.setState({
        post: thePost
      })
      this.fetchComments()
    });
  }

  createComment(comment){
    CommentModel.create(this.state.post._id, comment).then(res => {
      this.setState(prevState => {
        prevState.comments.push(res.data);
        return prevState
      })
    })
  }


  onVoteComment(comment, voteDirection){
    let newVotes = comment.votes + voteDirection
    CommentModel.update(this.state.post._id, comment, newVotes).then( (res) => {
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

  onVotePost(post, voteDirection){
    let newVotes = post.votes + voteDirection
    TextPostModel.update(post._id, newVotes).then( (res) => {
      this.setState(prevState => {
        prevState.post.votes = newVotes
        return prevState
      })
    })
  }

  render(){
    let post = this.state.post;
    return(
      <div>
        <TextPost
        key={ post._id }
        post={ post }
        />
        <Voting
        onVote={this.onVotePost.bind(this)}
        elem={post} />
        <CreateCommentForm
        createComment={this.createComment.bind(this)}
        post_id={post._id}
        />
        { this.state.comments.map(comment => {
          return <div>
            <Voting
            onVote={this.onVoteComment.bind(this)}
            elem={comment}/>
            <Comment
            key={comment._id}
            comment={comment}
            postId={post._id}/>

            </div>
        })}
        <Link to={'/'} className="back-btn">
          <p>Back to all posts</p>
        </Link>
      </div>
    )
  }

}

export default PostContainer
