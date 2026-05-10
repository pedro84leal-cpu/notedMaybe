import styles from '../Modal/modal.module.css'

function Modal({ children, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.fechar} onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}

export default Modal