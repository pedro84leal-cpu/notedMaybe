import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/Pages/Home/home'
import { useState, useEffect, useCallback } from 'react';
import { supabase } from './assets/Config/supabase';

function App() {

  const [temaEscuro, setTemaEscuro] = useState(true);
  const [pesquisa, setPesquisa] = useState('');
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    document.body.classList.toggle('claro', !temaEscuro);
  }, [temaEscuro]);

  const mudaTema = () => setTemaEscuro(!temaEscuro);

  const buscarNotas = useCallback(async () => {
    const { data, error } = await supabase
      .from('notas')
      .select('*');
    if (!error) setNotas(data);
  }, []);

  useEffect(() => {
    buscarNotas(); // eslint-disable-line
  }, [buscarNotas]);

  return (
    <>
    <Routes>
      <Route path='/' element={
        <Home 
          temaEscuro={temaEscuro} 
          toggleTema={mudaTema}
          pesquisa={pesquisa} 
          setPesquisa={setPesquisa}
          notas={notas}
          setNotas={setNotas}
          buscarNotas={buscarNotas}
        />} 
      />
    </Routes>
    </>
  )
}

export default App
