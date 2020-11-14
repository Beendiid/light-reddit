import React, { useState } from 'react'

function Header({ currentSub, setCurrentSub }) {
  const [search, setSearch] = useState()

  const onSubmit = (e) => {
    e.preventDefault()
    setCurrentSub(search)
  }
  const onChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className='header'>
      <div className='logo'>
        <h2>Light Reddit</h2>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            name='search'
            placeholder='Search Subreddit'
            onChange={onChange}
          />
        </form>
      </div>
      <nav>
        <div>
          <p className='current-sub'>r/{currentSub}</p>
          <p onClick={() => setCurrentSub('popular')}>POPULAR</p>
          <p onClick={() => setCurrentSub('worldnews')}>WORLD NEWS</p>
          <p onClick={() => setCurrentSub('AskReddit')}>ASK REDDIT</p>
        </div>
        <select name='' id='' onChange={(e) => setCurrentSub(e.target.value)}>
          <option value='roastme'>Roastme</option>
          <option value='pics'>Pics</option>
          <option value='programming'>Programming</option>
          <option value='programmerhumor'>Programmer Humor</option>
          <option value='humansbeingbros'>humans Being Bros</option>
          <option value='cursedcomments'>Cursed Comments</option>
          <option value='rareinsults'>Rare Insults</option>
          <option value='todayilearned'>Today I Learned</option>
        </select>
      </nav>
    </div>
  )
}

export default Header
