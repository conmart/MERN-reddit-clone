import React, { Component } from 'react';

class Voting extends Component {


  render(){
    return(
      <div className='Voting'>
        <span
          className='Upvote'
          onClick={ () => this.props.onVote(this.props.elem, 1) }>
            &uarr;
        </span>
        <span
          className='Downvote'
          onClick={ () => this.props.onVote(this.props.elem, -1) }>
            &darr;
        </span>
      </div>
    )
  }



}

export default Voting
