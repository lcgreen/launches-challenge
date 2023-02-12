

import React from "react";
import Image from "next/image";
import styles from "./cardHeader.module.css";

export type CardHeaderProps = {
  title: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  utcDate: string;
  status: 'success' | 'error';
};

const CardHeader = ( props: React.PropsWithChildren<CardHeaderProps> ): JSX.Element => {
  const { imageAlt, image, imageWidth, imageHeight, title, utcDate } = props;

  // Format the date
  const formattedDate = (date) => new Date(date).toDateString();

  return (
    <>
      <div className={styles.container}>
        {image && <Image className={styles.image} alt={imageAlt} src={image} width={imageWidth} height={imageHeight} />}
        <div className={styles.body}>
          <div className={styles?.title}>{title}</div>
          <span className={styles?.date}>{formattedDate(utcDate)}</span>
        </div>
      </div>
    </>
  );
};

export default CardHeader;