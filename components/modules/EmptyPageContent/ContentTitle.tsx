import styles from '@/styles/empty-content/index.module.scss'
import { IContentTitleProp } from '@/types/modules';

const ContentTitle = ({ title, oopsWord }: IContentTitleProp) => {
  return (
    <div className={styles.empty_content__title}>
      <span>{oopsWord}</span>
      <span>{title}</span>
    </div>
  );
};

export default ContentTitle;