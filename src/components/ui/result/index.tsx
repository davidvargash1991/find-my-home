import React from "react";
import styles from "./result.module.scss";
import { Link } from "react-router-dom";
import { IProperty } from "data";
import Title from "../title";

interface IResultProps {
  property: IProperty;
  city: string;
  type: string;
  operation: string;
}

const Result: React.FC<IResultProps> = (props) => {
  const { property } = props;
  return (
    <Link to={`/detail/${property.id}`} className={styles.container}>
      <div className={styles.imgContainer}>
        <div className={styles.item}>
          <img src={property.images[0]} alt="real estate property" />
        </div>
      </div>
      <div className={styles.content}>
        <Title
          className={styles.title}
          text={`${props.type} - $${
            props.operation === "BY" ? property.buyPrice : property.rentPrice
          }`}
        />
        <div className={styles.trait}>
          <p className={styles.title}>Bathrooms:</p>
          <p className={styles.value}>{property.bathrooms}</p>
        </div>
        <div className={styles.trait}>
          <p className={styles.title}>Rooms:</p>
          <p className={styles.value}>{property.rooms}</p>
        </div>
        <div className={styles.trait}>
          <p className={styles.title}>Area:</p>
          <p className={styles.value}>{property.area}</p>
        </div>
      </div>
    </Link>
  );
};

export default Result;
