import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './assets/Pages/Home/home'
import IntroPage from './assets/Components/IntroPage/IntroPage'
import { useState, useEffect, useCallback } from 'react';
import { supabase } from './assets/Config/supabase';

function App() {

  const [temaEscuro, setTemaEscuro] = useState(true);
  const [pesquisa, setPesquisa] = useState('');
  const [notas, setNotas] = useState([]);
  const navigate = useNavigate();

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

        {/* Intro page — rota inicial */}
        <Route path='/' element={
          <IntroPage
            onStart={() => navigate('/registo')}
            onLogin={() => navigate('/login')}
            onGuest={() => navigate('/home')}
          />}
        />

        {/* Home — rota principal */}
        <Route path='/home' element={
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
