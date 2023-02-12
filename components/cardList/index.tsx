import { PropsWithChildren } from 'react';
import styles from './cardList.module.scss';

const CardList = (props: PropsWithChildren<{}>) => {
  const { children } = props;
  return <div className={styles.container}>{children}</div>;
};

export default CardList;