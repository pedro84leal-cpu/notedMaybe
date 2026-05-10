import styles from '../Botao-tema/botaoTema.module.css'



function BotaoTema({ temaEscuro, toggleTema }) {
  console.log('temaEscuro:', temaEscuro);

  return (
    <div className={styles.toggle} onClick={toggleTema}>
      <div className={`${styles.bolinha} ${!temaEscuro ? styles.direita : ''}`} />
      <span className={styles.icone}>🌙</span>
      <span className={styles.icone}>☀️</span>
    </div>
  );
}

export default BotaoTema;