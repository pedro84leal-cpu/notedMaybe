import { useEffect, useState } from "react";
import logo from '../../Images/logo.png';
import titulo from '../../Images/titulo.png';
import "./IntroPage.css";

export default function IntroPage({ onStart, onLogin, onGuest }) {
  const [step, setStep] = useState(0);

  const [textoSlogan, setTextoSlogan] = useState('');
  const slogan = 'Notas importantes. E outras... nem por isso.';

  useEffect(() => {
    if (step < 7) return; // só começa quando o slogan aparecer
    let i = 0;
    const interval = setInterval(() => {
      setTextoSlogan(slogan.slice(0, i));
      i++;
      if (i > slogan.length) clearInterval(interval);
    }, 50); // velocidade — menos ms = mais rápido
    return () => clearInterval(interval);
  }, [step]); 

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),   // logo
      setTimeout(() => setStep(2), 800),   // título
      setTimeout(() => setStep(3), 1300),  // slogan
      setTimeout(() => setStep(4), 1700),  // pill 1
      setTimeout(() => setStep(5), 2000),  // pill 2
      setTimeout(() => setStep(6), 2300),  // pill 3
      setTimeout(() => setStep(7), 2700),  // botões
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="intro-page">
      <div className="intro-content">

        {/* Logo / Mascote */}
        <div className={`intro-element ${step >= 4 ? "visible" : ""}`}>
          <img src={logo} alt="NotedMaybe mascote" className="intro-logo" />
        </div>

        {/* Título */}
        <div className={`intro-element ${step >= 4 ? "visible" : ""}`}>
          <img src={titulo} alt="NotedMaybe" className="intro-titulo" />
        </div>

        {/* Slogan */}
        <div className={`intro-element ${step >= 7 ? "visible" : ""}`}>
          <p className="intro-slogan">
            {textoSlogan}
            <span className="cursor">|</span>
          </p>
        </div>

        {/* Pills */}
       <div className="intro-pills">
          <span className={`pill pill-teal intro-element ${step >= 1 ? "visible" : ""}`}>
            📝 Notas rápidas
          </span>
          <span className={`pill pill-orange intro-element ${step >= 2 ? "visible" : ""}`}>
            ✅ To-do List
          </span>
          <span className={`pill pill-purple intro-element ${step >= 3 ? "visible" : ""}`}>
            🗂 Organização Total
          </span>
        </div>

        {/* Botões */}
        <div className={`intro-element intro-buttons ${step >= 6 ? "visible" : ""}`}>
          <button className="btn-primary" onClick={onStart}>
            Começar agora
          </button>
          <button className="btn-secondary" onClick={onLogin}>
            Já tenho conta
          </button>
          <button className="btn-guest" onClick={onGuest}>
            Entrar como convidado
          </button>
        </div>

      </div>
    </div>
  );
}
