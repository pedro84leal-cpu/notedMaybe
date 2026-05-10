import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/Pages/Home/home'
import { useState, useEffect } from 'react';
import apontamentos from './assets/Data/notas';



function App() {

  const [temaEscuro, setTemaEscuro] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('claro', !temaEscuro);
  }, [temaEscuro]);

  const mudaTema = () => setTemaEscuro(!temaEscuro);
  const [pesquisa, setPesquisa] = useState ('');
  const [notas, setNotas] = useState(apontamentos);

  return (
    <>
    <Routes>
      <Route path='/' element={<Home temaEscuro={temaEscuro} toggleTema={mudaTema}
                          pesquisa={pesquisa} setPesquisa={setPesquisa}
                          notas={notas} setNotas={setNotas} />} />
    </Routes>
     
    </>
  )
}

export default App
