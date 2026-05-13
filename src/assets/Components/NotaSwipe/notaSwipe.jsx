import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import { MdCheckCircle  } from 'react-icons/md';
import { FaTrashAlt } from "react-icons/fa";
import styles from '../NotaSwipe/notaSwipe.module.css';

function NotaSwipe({ nota, onEliminar, onValidar, icone }) {
  const controls = useAnimation();
  const [aberto, setAberto] = useState(false);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -60) {
      controls.start({ x: -120 });
      setAberto(true);
    } else {
      controls.start({ x: 0 });
      setAberto(false);
    }
  };

  return (
    <div className={styles.swipeContainer}>
      <div className={`${styles.acoes} ${aberto ? styles.acoesAberto : ''}`}>
        <button onClick={() => onValidar(nota.id)} className={styles.validar}>
          <MdCheckCircle size={20}  />
        </button>
        <button onClick={() => onEliminar(nota.id)} className={styles.eliminar}>
          <FaTrashAlt size={18}  />
        </button>
      </div>

        <motion.div
            className={`${styles.nota} ${nota.validada ? styles.notaValidada : ''}`}
            drag="x"
            dragConstraints={{ left: -120, right: 0 }}
            dragElastic={0.05}
            animate={controls}
            onDragEnd={handleDragEnd}
        >
        {icone} {nota.titulo}
        </motion.div>
    </div>
  );
}

export default NotaSwipe;