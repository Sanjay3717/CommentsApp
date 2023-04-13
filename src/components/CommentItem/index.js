// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleLike, deleteComment} = props
  const {id, name, comment, isLiked, date, initialClassName} = commentDetails
  const likeUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const outDate = formatDistanceToNow(date)
  const onClickLikeIcon = () => {
    toggleLike(id)
  }
  const onDelete = () => {
    deleteComment(id)
  }
  const initial = name.slice(0, 1)
  return (
    <li className="comment-item-container">
      <div className="comment-name-container">
        <p className={`margin-right-content initial ${initialClassName}`}>
          {initial}
        </p>
        <p className="margin-right-content name">{name}</p>
        <p className="margin-right-content comment-time">{outDate}</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="comment-icon">
        <button onClick={onClickLikeIcon} className="button-click-style">
          <img src={likeUrl} alt="like" /> Like
        </button>
        <button
          className="button-click-style"
          onClick={onDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItem
