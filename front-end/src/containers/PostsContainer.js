import React, {Component} from 'react';
import TextPost from '../components/textPost/TextPost';
import TextPostModel from '../Models/TextPost';
import CreatePostForm from '../components/textPost/CreatePostForm';
import Voting from '../components/Voting'

class PostsContainer extends Component {

  constructor(){
    super();
    this.state = {
      posts: []
    };
  }

  fetchData(){
    TextPostModel.all().then( (res) => {
      this.setState ({
        posts: res.data
      })
      // console.log(this.state.posts);
    })
  }

  componentWillMount() {
    this.fetchData()
  }

  onVotePost(post, voteDirection){
    let newVotes = post.votes + voteDirection
    TextPostModel.update(post._id, newVotes).then( (res) => {
      this.setState(prevState => {
        let postToUpdate = prevState.posts.filter((aPost) => {
          return aPost._id === post._id
        })
        postToUpdate[0].votes = newVotes
        let sortedPosts = prevState.posts.sort(function(a, b){
          return a.votes < b.votes;
        });
        return prevState
      })
    })
  }

  createNewPost(post) {
    TextPostModel.create(post).then( (res) => {
      // console.log(res);
      this.setState(prevState => {
        prevState.posts.push(res.data);
        return prevState
      })
    })
  }

  render(){
    return(
      <div className="PostsContainer">
        <h4>PostsContainer</h4>
        <CreatePostForm createPost={this.createNewPost.bind(this)} />
        <div className="PostsContainer-content">
          { this.state.posts.map(post => {
            return <div><TextPost
              key={ post._id }
              post={post}
               />
               <Voting
               onVote={this.onVotePost.bind(this)}
               elem={post} /></div>
          }) }
        </div>
      </div>
    )
  }

}

export default PostsContainer
