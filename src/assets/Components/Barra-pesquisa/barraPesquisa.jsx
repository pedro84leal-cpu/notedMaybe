import styles from '../Barra-pesquisa/barraPsquisa.module.css';


function BarraPesquisa({ pesquisa, setPesquisa }) {
  return (
    <div className={styles.content}>
    <input
      type="text"
      placeholder="Pesquisar..."
      value={pesquisa}
      onChange={(e) => setPesquisa(e.target.value)}
      className={styles.input}

    />
    </div>
  );
}

export default BarraPesquisa;