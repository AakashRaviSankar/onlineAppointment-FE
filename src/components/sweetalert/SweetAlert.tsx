import React from "react";
import styles from "./styles.module.css";

import successGif from "../../assets/images/success.gif";
import infoGif from "../../assets/images/info.gif";
import warningGif from "../../assets/images/warning.gif";
import errorGif from "../../assets/images/error.gif";

interface AlertMessageProps {
  type: "success" | "info" | "warning" | "error";
  message1: string;
  message2: string;
  buttonText1?: string;
  buttonText2?: string;
  buttonText3?: string;
  onButtonClick1?: () => void;
  onButtonClick2?: () => void;
  onButtonClick3?: () => void;
  visible: boolean;
  onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  message1,
  message2,
  buttonText1,
  buttonText2,
  buttonText3,
  onButtonClick1,
  onButtonClick2,
  onButtonClick3,
  visible,
  onClose,
}) => {
  const getGif = (
    type: "success" | "info" | "warning" | "error"
  ): string | undefined => {
    switch (type) {
      case "success":
        return successGif;
      case "info":
        return infoGif;
      case "warning":
        return warningGif;
      case "error":
        return errorGif;
      default:
        return undefined;
    }
  };

  if (!visible) return null;

  const gifSrc = getGif(type);

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <div className={styles.icon}>
        {gifSrc && (
          <img src={gifSrc} alt={`${type} icon`} className={styles.gif} />
        )}
      </div>
      <div className={styles.text}>
        <h2>{message1}</h2>
        <p>{message2}</p>
      </div>
      <div className={styles.buttonContainer}>
        {buttonText1 && (
          <button className={styles.alertButton1} onClick={onButtonClick1}>
            {buttonText1}
          </button>
        )}
        {buttonText2 && (
          <button className={styles.alertButton2} onClick={onButtonClick2}>
            {buttonText2}
          </button>
        )}
        {buttonText3 && (
          <button className={styles.alertButton3} onClick={onButtonClick3}>
            {buttonText3}
          </button>
        )}
      </div>
      <span className={styles.close} onClick={onClose}>
        &times;
      </span>
    </div>
  );
};

export default AlertMessage;
