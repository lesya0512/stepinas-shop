import { showCountMessage } from "@/lib/utils/common";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '@/styles/heading-with-count/index.module.scss'
import { IHeadingWithCountProps } from "@/types/elements";

const HeadingWithCount = ({
  count,
  title,
  spinner,
}: IHeadingWithCountProps) => {
  return (
    <h1 className={`site-title ${styles.title}`}>
      <span>{title}</span>
      <span className={styles.title__count}>
        {spinner ? <FontAwesomeIcon icon={faSpinner} spin /> : count}{' '}
        {showCountMessage(`${count}`)}
      </span>
    </h1>
  );
};

export default HeadingWithCount;