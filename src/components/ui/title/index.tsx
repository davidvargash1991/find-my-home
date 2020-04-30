import React from "react";
import styles from "./title.module.scss";
import cx from "classnames";

interface ITitleProps {
  text: string;
  className?: string;
}

const Title: React.FC<ITitleProps> = (props) => {
  return <h1 className={cx(styles.title, props.className)}>{props.text}</h1>;
};

export default Title;
