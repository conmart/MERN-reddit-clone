import axios from 'axios'

class CommentModel {
  static all(postId){
    let request = axios.get(`http://localhost:8080/api/posts/${postId}/comments/`)
    return request
  }

  static commentComments(postId, commentId){
    let request = axios.get(`http://localhost:8080/api/posts/${postId}/comments/${commentId}`)
    return request
  }

  static create(postId, comment) {
    let request = axios.post(`http://localhost:8080/api/posts/${postId}/comments/`, comment)
    return request
  }

  // static delete(post){
  //   let request = axios.delete(`http://localhost:8080/api/posts/:post_id/comments/${post._id}`)
  //   return request
  // }

  static update(postId, comment, newVotes){
      let request = axios.put(`http://localhost:8080/api/posts/${postId}/comments/${comment._id}`, {
          "votes": newVotes
      })
      console.log(request);
      return request
  }
}

export default CommentModel
