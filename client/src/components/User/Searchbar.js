import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import UserDetailsContext from '../context/UserDetails'

const Searchbar = ({setsearch}) => {

  return (
    <div className='search-bar' id="search-bar">
    <div className='input-group form-control'>
       <label htmlFor=""> <FontAwesomeIcon icon={faSearch} className='icon'/></label> 
        <input id="" type='text' className='' placeholder='Search or Start a new chat' onChange={(e)=>setsearch(e.target.value)}/>
    </div>
    </div>
  )
}

export default Searchbar