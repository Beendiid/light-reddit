import React from 'react'

function Comments({ comments, commentLoading, loadingIcon, scrollY }) {
  const scrollToPost = () => {
    window.scrollTo(0, scrollY)
  }

  //hide showpost btn
  document.addEventListener('scroll', () => {
    if (document.querySelector('.btn-showpost')) {
      if (
        window.scrollY >= Math.floor(scrollY) - 500 &&
        window.scrollY <= Math.floor(scrollY) + 500
      ) {
        document.querySelector('.btn-showpost').classList.add('btn-hide')
      } else {
        document.querySelector('.btn-showpost').classList.remove('btn-hide')
      }
    }
  })

  if (comments.length === 0) {
    return (
      <div className='comments'>
        <div className='comments-icon'>
          <i className='far fa-comment-dots'></i>
          <p className='title'>Comments ({comments.length})</p>
          <button className='btn btn-showpost' onClick={scrollToPost}>
            Show post
          </button>
        </div>
        <div className='comment-loading'>
          <p>Select a post to see comments</p>
        </div>
      </div>
    )
  } else if (commentLoading === true) {
    return (
      <div className='comments'>
        <div className='comments-icon'>
          <i className='far fa-comment-dots'></i>
          <p className='title'>Comments ({comments.length})</p>
        </div>
        <div className='comment-loading'>
          <img src={loadingIcon} alt='' />
        </div>
      </div>
    )
  }
  return (
    <div className='comments'>
      <div className='comments-icon'>
        <i className='far fa-comment-dots'></i>
        <p className='title'>Comments ({comments.length})</p>
        <button className='btn btn-showpost' onClick={scrollToPost}>
          Show post
        </button>
      </div>
      {comments.map((comment) => (
        <React.Fragment key={comment.data.id}>
          <div className='comment'>
            <p className='username'>{comment.data.author}</p>
            <p>{comment.data.body}</p>
          </div>
          {comment.data.replies && (
            <details>
              <summary>
                Replies ({comment.data.replies.data.children.length})
              </summary>

              {comment.data.replies.data.children.map((reply) => (
                <div className='reply' key={reply.data.id}>
                  <p className='reply-username'>{reply.data.author}</p>
                  <p>
                    <span className='mention-username'>
                      {comment.data.author}
                    </span>
                    {reply.data.body}
                  </p>
                </div>
              ))}
            </details>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Comments
