import styles from '../Login/login.module.css'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../Config/supabase';
import logo from '../../Images/titulo_logo.png'

function Login(){

    const [erro, setErro] = useState('');
    const navigate = useNavigate();
    const [showAnimation, setShowAnimation] = useState(false);
    const [email, setemail] = useState('');
    const [passWord, setpassword] = useState('');
    const [sucesso, setSucesso] = useState(false);
    const [frase, setfrase] = useState('');
    const textFrase = 'Bem-vindo de volta. Vamos tentar organizar isto?';
    const animationStarted = useRef(false);
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPageLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAnimation(true);
        }, 400);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!showAnimation || animationStarted.current) return;
        
        animationStarted.current = true;
        let i = 0;
        
        const interval = setInterval(() => {
            if (i <= textFrase.length) {
                setfrase(textFrase.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 50);
        
        return () => clearInterval(interval);
    }, [showAnimation]);

    const enviar = async () => {
    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: passWord,
    });

    if (error) {
        setErro('Email ou password incorretos.');
    }
    else {
        setSucesso(true);
        navigate('/home');
    }
    };

    return(
         <div className={`${styles.content} ${pageLoaded ? styles.fadeIn : ''}`}>
            <div className={styles.logoContent}>
                <img src={logo} alt='Logo' className={styles.logo} />
            </div>

            <div className={`${styles.introElement} ${showAnimation ? styles.visible : ""}`}>
                <p className={styles.introSlogan}>
                    {frase}
                    <span className={styles.cursor}>|</span>
                </p>
            </div>

            <input type="text" 
                    placeholder="Email" 
                    className={styles.input}
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
            />

            <input type="password" 
                    placeholder="Password" 
                    className={styles.input}
                    value={passWord}
                    onChange={(e) => setpassword(e.target.value)}
            />
            
            {erro && <p className={styles.erro}>❌ {erro}</p>}

            <button className={styles.btn} onClick={enviar}>
                Entrar
            </button>

            {sucesso && (
                <div className={styles.sucesso}>
                    Login efetuado!
                </div>
            )}
        </div>
    )
}

export default Login