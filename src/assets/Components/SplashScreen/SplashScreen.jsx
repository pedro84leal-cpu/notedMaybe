import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SplashScreen.module.css';
import logo from '../../Images/Logo_NexSense.png';



function SplashScreen() {
    const navigate = useNavigate();
    const [fase, setFase] = useState('entrada'); // 'entrada' | 'visivel' | 'saida'

    useEffect(() => {
        // Fase 1 — logo aparece (0.8s de animação CSS)
        const t1 = setTimeout(() => setFase('visivel'), 800);

        // Fase 2 — brilho pulsa durante 2 segundos
        // Fase 3 — começa a sair
        const t2 = setTimeout(() => setFase('saida'), 4500);

        // Fase 4 — navega para a IntroPage
        const t3 = setTimeout(() => navigate('/intro'), 5100);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [navigate]);

    return (
        <div className={`${styles.splash} ${fase === 'saida' ? styles.saida : ''}`}>

            {/* Partículas de fundo */}
            <div className={styles.particulas}>
                {[...Array(12)].map((_, i) => (
                    <div key={i} className={styles.particula} style={{ '--i': i }} />
                ))}
            </div>

            {/* Anéis orbitais decorativos */}
            <div className={`${styles.anel} ${styles.anel1}`} />
            <div className={`${styles.anel} ${styles.anel2}`} />
            <div className={`${styles.anel} ${styles.anel3}`} />

            {/* Container do logo */}
            <div className={`${styles.logoContainer} ${fase !== 'entrada' ? styles.logoVisivel : ''}`}>

                {/* Brilho dourado atrás do logo */}
                <div className={styles.brilho} />

                {/* Logo */}
                <img
                    src={logo}
                    alt="NexSense"
                    className={styles.logo}
                />

                {/* Tagline */}
                <p className={`${styles.tagline} ${fase === 'visivel' ? styles.taglineVisivel : ''}`}>
                    Smart ideas, simple experiences.
                </p>
            </div>

            {/* Barra de loading */}
            <div className={styles.loadingContainer}>
                <div className={`${styles.loadingBar} ${fase !== 'entrada' ? styles.loadingAtivo : ''}`} />
            </div>

        </div>
    );
}

export default SplashScreen;
