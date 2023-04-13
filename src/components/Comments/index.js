import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'

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
  state = {
    commentsList: [],
    nameInput: '',
    commentInput: '',
  }

  onNameChange = event => {
    this.setState({nameInput: event.target.value})
  }

  onCommentChange = event => {
    this.setState({commentInput: event.target.value})
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleLike={this.toggleLike}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onSubmitForm = event => {
    const {nameInput, commentInput} = this.state
    event.preventDefault()
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      nameInput: '',
      commentInput: '',
      commentsList: [...prevState.commentsList, newComment],
    }))
  }

  toggleLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filteredUserData = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({
      commentsList: filteredUserData,
    })
  }

  render() {
    const {commentsList, id, nameInput, commentInput} = this.state

    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="top-container">
            <div className="left-container">
              <h1>Comments</h1>
              <p className="desc">Say something about CCBP technologies</p>
              <form onSubmit={this.onSubmitForm}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="text-input"
                  onChange={this.onNameChange}
                />{' '}
                <br />
                <textarea
                  placeholder="Your Comment"
                  rows="6"
                  className="text-input"
                  onChange={this.onCommentChange}
                />
                <div>
                  <button className="btn-style" type="submit">
                    Add Comment
                  </button>
                </div>
              </form>
            </div>

            <div className="right-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
                className="right-image"
              />
            </div>
          </div>
          <div className="bottom-container">
            <div>
              <p className="total">
                {' '}
                <span className="count">
                  {commentsList.length}
                </span> comments{' '}
              </p>
            </div>
            <div>
              <ul className="comment-container">{this.renderCommentsList()}</ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
