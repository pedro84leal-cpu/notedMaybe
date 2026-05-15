import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './assets/Pages/Home/home'
import IntroPage from './assets/Pages/IntroPage/IntroPage'
import { useState, useEffect, useCallback } from 'react';
import { supabase } from './assets/Config/supabase';
import Login from './assets/Pages/Login/login';
import Registo from './assets/Pages/Registo/registo'
import RotaProtegida from './assets/Components/RotaProtegida/RotaProtegida';
import SplashScreen from './assets/Components/SplashScreen/SplashScreen'




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

        <Route path='/splash' element={<SplashScreen />} />
        <Route path='/' element={<SplashScreen />} />

        <Route path='/intro' element={
          <IntroPage onStart={
            () => navigate('/registo')}
            onLogin={() => navigate('/login')} />
          }
        />
        
        <Route path='/home' element={
          <RotaProtegida>
            <Home  temaEscuro={temaEscuro} 
              toggleTema={mudaTema}
              pesquisa={pesquisa}
              setPesquisa={setPesquisa}
              notas={notas}
              setNotas={setNotas}
              buscarNotas={buscarNotas} />
          </RotaProtegida>
        }/>
        
        <Route path='/login' element={<Login /> } />
        <Route path='/registo' element={<Registo />} />

      </Routes>
    </>
  )
}

export default App
