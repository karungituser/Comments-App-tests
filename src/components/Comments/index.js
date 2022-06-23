import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentLists: []}

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  deleteComment = commentId => {
    const {commentLists} = this.state

    this.setState({
      commentLists: commentLists.filter(comment => commentId !== comment.id),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentLists: prevState.commentLists.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentLists = () => {
    const {commentLists} = this.state

    return commentLists.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundClassNames = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundClassNames,
    }
    this.setState(prevState => ({
      commentLists: [...prevState.commentLists, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  render() {
    const {nameInput, commentInput, commentLists} = this.state

    return (
      <div className="comment-container">
        <div className="commentContainer">
          <h1 className="heading">Comments</h1>
          <div className="input-container">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="description">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                placeholder="Your Name"
                className="input-text"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                rows="6"
                placeholder="Your Comment"
                className="text-area"
                value={commentInput}
                onChange={this.onChangeCommentInput}
              />
              <button className="comment-btn" type="submit">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comment-image"
            />
          </div>
          <hr className="line" />
          <p className="content">
            <span className="comments-count">{commentLists.length}</span>
            Comments
          </p>
          <ul className="list-container">{this.renderCommentLists()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
