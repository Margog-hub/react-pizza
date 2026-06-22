import styles from './NotFoundBlock.module.scss'


const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <h1 >
        Hічого не знайдено
      </h1>
      <p className={styles.description}>
        На жаль, поточна сторінка відсутня
      </p>
    </div>
  )
}

export default NotFoundBlock