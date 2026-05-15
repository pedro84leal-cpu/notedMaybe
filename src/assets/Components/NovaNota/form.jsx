import styles from './form.module.css'
import { useState } from 'react'
import imagemTitulo from '../../Images/titulo.png'
import { supabase } from '../../Config/supabase';

function NovaNota({ buscarNotas }){

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [categoria, setcategoria] = useState('');
  const [importancia, setimportancia] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [sucesso, setSucesso] = useState(false);

 const enviar = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('notas')
      .insert([{
        titulo,
        conteudo,
        categoria,
        data,
        importancia,
        validada: false,
        user_id: user.id
      }]);

    if (error) {
      console.error('Erro ao guardar nota:', error);
    } else {
      setSucesso(true);
      buscarNotas();
      setTimeout(() => setSucesso(false), 3000);
      setTitulo('');
      setConteudo('');
      setcategoria('');
      setData('');
      setimportancia('');
    }
};

  return (
    <div className={styles.card}>
      <img src={imagemTitulo} alt="Notinhas" className={styles.tituloNotinhas} />
      <h2 className={styles.titulo}>Nova nota</h2>

      <div className={styles.formGroup}>
        <input 
          type="text" 
          placeholder="Titulo" 
          className={styles.input}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <textarea 
          placeholder="Apontamentos" 
          className={styles.textarea}
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
        />
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

      <div className={styles.campoData}>
        <label className={styles.label}>Data</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <label className={styles.label}>Hora</label>
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