import styles from '../Barra-pesquisa/barraPsquisa.module.css';

function BarraPesquisa({ pesquisa, setPesquisa }) {
  return (
    <input
      type="text"
      placeholder="Pesquisar..."
      value={pesquisa}
      onChange={(e) => setPesquisa(e.target.value)}
      className={styles.input}
    />
  );
}

export default BarraPesquisa;