import styles from './form.module.css'
import { useState } from 'react'
import titulo from '../../Images/titulo.png'

function NovaNota(){

  const [categoria, setcategoria] = useState('');
  const [importancia, setimportancia] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const enviar = () => {
    setSucesso(true);
    setTimeout(() => setSucesso(false), 3000);
  }

  return (
    <div className={styles.card}>
      <img src={titulo} alt="Notinhas" className={styles.tituloNotinhas} />
      <h2 className={styles.titulo}>Nova nota</h2>

      <div className={styles.formGroup}>
        <input type="text" placeholder="Titulo" className={styles.input} />
      </div>

      <div className={styles.formGroup}>
        <textarea placeholder="Apontamentos" className={styles.textarea} />
      </div>

      <div className={styles.campo}>
        <select
          value={categoria}
          onChange={(e) => setcategoria(e.target.value)}
          className={styles.option}
        >
          <option value="">Selecione uma categoria...</option>
          <option value="pessoal">Pessoal</option>
          <option value="trabalho">Trabalho</option>
          <option value="saude">Saúde</option>
          <option value="financeiro">Financeiro</option>
          <option value="ideias">Ideias</option>
          <option value="estudo">Estudo</option>
          <option value="viagens">Viagens</option>
          <option value="outros">Outros</option>
        </select>
      </div>

      {/* Data e hora lado a lado */}
      <div className={styles.campoData}>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
      </div>

      <div className={styles.campo}>
        <select
          value={importancia}
          onChange={(e) => setimportancia(e.target.value)}
          className={styles.option}
        >
          <option value="">Selecione a importancia...</option>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <button className={styles.btn} onClick={enviar}>
        Guardar nota
      </button>

      {sucesso && (
        <div className={styles.sucesso}>
          Nota guardada
        </div>
      )}
    </div>
  )
}

export default NovaNota