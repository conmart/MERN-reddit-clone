import React, {Component} from 'react';
import TextPost from '../components/textPost/TextPost';
import TextPostModel from '../Models/TextPost';
import CommentModel from '../Models/Comment';
import Comment from '../components/comment/Comment';
import Voting from '../components/Voting';
import CreateCommentForm from '../components/comment/CreateCommentForm';

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
      // console.log(res);
      let allComments = res.data;
      // console.log("comments", allComments);
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
    // console.log('from PostContainer', comment);
    CommentModel.create(this.state.post._id, comment).then(res => {
      // console.log(res);
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

  //added later
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
    // console.log("Post", post);
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

      </div>
    )
  }

}

export default PostContainer
