import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './Header'
import Body from './Body'
import axios from 'axios'

function App() {
  const [currentSub, setCurrentSub] = useState('popular')
  const [posts, setPosts] = useState([])
  const [postLoading, setPostLoading] = useState(false)

  useEffect(() => {
    getPosts()
  }, [currentSub])

  const CORS = 'https://cors-anywhere.herokuapp.com/'
  const URL = `https://www.reddit.com/r/${currentSub}.json`

  const getPosts = async () => {
    try {
      setPostLoading(true)
      const res = await axios.get(`${CORS}${URL}`)
      const data = await res.data.data.children
      setPosts(data)
      console.log(data)
      setPostLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='App'>
      <Header currentSub={currentSub} setCurrentSub={setCurrentSub} />
      <Body
        postLoading={postLoading}
        posts={posts}
        setCurrentSub={setCurrentSub}
      />
    </div>
  )
}

export default App
