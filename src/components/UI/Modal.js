import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.querySelector("#overlays");

function Modal(props) {
  // console.log(props.children);
  return (
    <>
      {createPortal(<Backdrop onClick={props.onClose} />, portalElement)};
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
      ;
    </>
  );
}

export default Modal;
