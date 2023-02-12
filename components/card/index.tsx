import styles from './card.module.css';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';

type CardProps = {
  header: React.ReactNode;
  footer?: React.ReactNode;
}

const Card = (props: React.PropsWithChildren<CardProps>): JSX.Element => {
  const { header, footer, children } = props;
  return (
    <div tabIndex={0} className={styles.container}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default Card;
