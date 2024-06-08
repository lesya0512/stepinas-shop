'use client'
import Link from 'next/link'
import styles from '@/styles/main/index.module.scss'

const AllLink = () => {

  return (
    <Link href='/catalog' className={styles.all}>
      <span />
        AllLink
    </Link>
  )
}

export default AllLink