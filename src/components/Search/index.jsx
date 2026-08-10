import {useMemo ,  useState } from 'react'
import styles from './Search.module.scss'
import { useRef } from 'react'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'


const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  const inputRef = useRef()

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current.focus()
  }

  const updateSearchValue = useMemo(
  () =>
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 250),
  [dispatch]
);
  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root} >
      <svg
        xmlns="http://w3.org" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input ref={inputRef}
        // value={search} 
        value={value}
        onChange={onChangeInput}
        // onChange={(e) => setSearch(e.target.value)} 
        className={styles.input} placeholder="Пошук піц..." />
      {
        // search 
        value && (
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
            onClick={onClickClear}
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