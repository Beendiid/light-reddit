import React, { useState, useEffect } from 'react'
import axios from 'axios'
import loadingIcon from './loading.gif'
import Comments from './Comments'
import parse from 'html-react-parser'

function Body({ posts, setCurrentSub, postLoading }) {
  const [comments, setComments] = useState([])
  const [commentLink, setCommentLink] = useState()
  const [commentLoading, setCommentLoading] = useState(false)
  const [scrollY, setScrollY] = useState()

  useEffect(() => {
    getComments()
  }, [commentLink])

  const CORS = 'https://cors-anywhere.herokuapp.com/'
  const REDDIT = 'https://www.reddit.com'

  const getComments = async () => {
    try {
      setCommentLoading(true)
      const res = await axios.get(commentLink)
      const data = await res.data[1].data.children
      setComments(data)
      setCommentLoading(false)
      setScrollY(window.scrollY)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  //Shrten like and comment numbers
  function shortenNumbers(num) {
    if (num <= 1000) {
      return num
    }
    if (num >= 1000 && num < 10000) {
      return num.slice(0, -3) + '.' + num.slice(1, -2) + 'k'
    }
    if (num >= 10000 && num < 100000) {
      return num.slice(0, -3) + 'k'
    }
    if (num >= 100000 < 1000000) {
      return num.slice(0, -3) + 'k'
    }
    if (num >= 1000000 < 10000000) {
      return num.slice(0, -6) + 'm'
    }
  }

  return (
    <div className='body'>
      <div className='main'>
        {postLoading ? (
          <div className='post-loading'>
            <img src={loadingIcon} alt='' />
          </div>
        ) : (
          posts.map((post) => (
            <div
              className={
                comments[0] &&
                comments[0].data.parent_id.slice(3) === post.data.id
                  ? 'post active-post'
                  : 'post'
              }
              key={post.data.id}>
              <div className='post-wrapper'>
                {post.data.url_overridden_by_dest &&
                post.data.url_overridden_by_dest.slice(-3) !== 'jpg' &&
                post.data.url_overridden_by_dest.slice(-3) !== 'png' &&
                post.data.url_overridden_by_dest.slice(-3) !== 'gif' ? (
                  <a
                    href={post.data.url_overridden_by_dest}
                    className='title title-link'
                    target='_blank'>
                    {post.data.title}
                  </a>
                ) : (
                  <p className='title'>{post.data.title}</p>
                )}
                {post.data.selftext !== '' && (
                  <p className='text'>{post.data.selftext}</p>
                )}

                {post.data.url &&
                post.data.url.slice(-3) !== 'jpg' &&
                post.data.url.slice(-3) !== 'png' &&
                post.data.url.slice(-3) !== 'gif' &&
                post.data.is_video !== true ? (
                  <img
                    src={post.data.thumbnail}
                    alt=''
                    onClick={() =>
                      setCommentLink(
                        `${CORS}${REDDIT}${post.data.permalink}.json`
                      )
                    }
                  />
                ) : (
                  <img
                    src={post.data.url}
                    alt=''
                    onClick={() =>
                      setCommentLink(
                        `${CORS}${REDDIT}${post.data.permalink}.json`
                      )
                    }
                  />
                )}

                {/* Original image fetching */}
                {/* {post.data.url !== '' && (
                  <img
                    src={post.data.url}
                    alt=''
                    onClick={() =>
                      setCommentLink(
                        `${CORS}${REDDIT}${post.data.permalink}.json`
                      )
                    }
                  />
                )} */}

                {post.data.is_video === true && (
                  <video
                    controls
                    muted={false}
                    poster={post.data.thumbnail}
                    src={post.data.media.reddit_video.fallback_url}></video>
                )}

                {/* Second Image */}
                {post.data.url !== '' && (
                  <>
                    {/* <img
                      src={post.data.thumbnail}
                      alt=''
                      onClick={() =>
                        setCommentLink(
                          `${CORS}${REDDIT}${post.data.permalink}.json`
                        )
                      }
                    /> */}

                    {/* working */}
                    {/* <div className='iframe'>
                      {post.data.media &&
                        parse(parse(`${post.data.media.oembed.html}`))}
                    </div> */}
                  </>
                )}
              </div>
              <div className='post-footer'>
                <p
                  className='subreddit-name'
                  onClick={() => setCurrentSub(post.data.subreddit)}>
                  r/{post.data.subreddit}
                </p>
                <p className='username'>{post.data.author}</p>
                <p>
                  <i className='far fa-heart'></i>
                  {shortenNumbers(`${post.data.ups}`)}
                </p>
                <p
                  className='comment-btn'
                  onClick={() =>
                    setCommentLink(
                      `${CORS}${REDDIT}${post.data.permalink}.json`
                    )
                  }>
                  <i className='far fa-comment-dots'></i>
                  {shortenNumbers(`${post.data.num_comments}`)}
                </p>

                <p>
                  <i className='fas fa-award'></i>
                  {post.data.total_awards_received}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <Comments
        scrollY={scrollY}
        comments={comments}
        loadingIcon={loadingIcon}
        commentLoading={commentLoading}
      />
    </div>
  )
}

export default Body
