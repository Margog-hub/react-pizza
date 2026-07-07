import { useContext } from 'react'
import styles from './Search.module.scss'
import { SearchContext } from '../../App'

const Search = () => {
 const { search, setSearch } =  useContext(SearchContext)
  return (
    <div className={styles.root} >
      <svg xmlns="http://w3.org" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input value={search} onChange={(e) => setSearch(e.target.value)} className={styles.input} placeholder="Пошук піц..." />
{
  search && (
 <svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="24" 
  height="24" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="#1b1b1b" 
  strokeWidth={2} 
  strokeLinecap="round" 
  strokeLinejoin="round" 
  className={styles.clearIcon} 
  onClick={() => setSearch('')}
>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</svg>
  )
}
   
    </div>
  )
}

export default Search