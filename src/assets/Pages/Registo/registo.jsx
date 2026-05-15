import styles from './registo.module.css'
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../Config/supabase';
import logo from '../../Images/titulo_logo.png'
import { IoReturnDownBack } from "react-icons/io5";

function Registo() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPageLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);


    const enviar = async () => {
        setErro('');

        if (passWord !== confirmar) {
            setErro('As passwords não coincidem.');
            return;
        }

        if (passWord.length < 6) {
            setErro('A password deve ter pelo menos 6 caracteres.');
            return;
        }

        const { error } = await supabase.auth.signUp({
            email: email,
            password: passWord,
        });

        if (error) {
            setErro('Erro ao criar conta. Tenta novamente.');
        } else {
            setSucesso(true);
        }
    };

    return (
        <>
        <Link to='/' className={styles.linkVoltar}>
            <IoReturnDownBack size={25} className={styles.iconeVoltar} />
        </Link>
        <div className={`${styles.content} ${pageLoaded ? styles.fadeIn : ''}`}>
            <div className={styles.logoContent}>
                <img src={logo} alt='Logo' className={styles.logo} />
            </div>

            <input
                type="text"
                placeholder="Email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className={styles.input}
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
            />

            <input
                type="password"
                placeholder="Confirmar password"
                className={styles.input}
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
            />

            {erro && <p className={styles.erro}>❌ {erro}</p>}

            <button className={styles.btn} onClick={enviar}>
                Registar
            </button>

            <button className={styles.btnSecundario} onClick={() => navigate('/login')}>
                Já tens conta? Entra aqui
            </button>

            {sucesso && (
                <div className={styles.sucesso}>
                    ✅ Conta criada! Verifica o teu email.
                </div>
            )}
        </div>
        </>
    );
}

export default Registo;
