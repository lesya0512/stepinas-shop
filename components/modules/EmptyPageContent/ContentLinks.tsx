import styles from '@/styles/empty-content/index.module.scss'
import Link from 'next/link';

const ContentLinks = ({ btnText }: { btnText: string }) => {
  return (
    <div className={styles.empty_content__links}>
      <Link href='/catalog'>{btnText}</Link>
      <Link href='/'>На главную</Link>
    </div>
  );
};

export default ContentLinks;