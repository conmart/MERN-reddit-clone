import axios from 'axios'

class TextPostModel {
  static all(){
    let request = axios.get("http://localhost:8080/api/posts/")
    // console.log(request);
    return request
  }

  static getOne(postId) {
    let request = axios.get(`http://localhost:8080/api/posts/${postId}`)
    return request
  }

  static create(post) {
    let request = axios.post("http://localhost:8080/api/posts/", post)
    return request
  }

  static delete(post){
    let request = axios.delete(`http://localhost:8080/api/posts/${post._id}`)
    return request
  }

  static update(postId, newVotes){
      let request = axios.put(`http://localhost:8080/api/posts/${postId}`, {
          "votes": newVotes
      })
      return request
  }
}

export default TextPostModel
