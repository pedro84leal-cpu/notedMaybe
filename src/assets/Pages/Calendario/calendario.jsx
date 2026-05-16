import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../Config/supabase';
import styles from './calendario.module.css';
import BotaoTema from '../../Components/Botao-tema/botaoTema';

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
               'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function Calendario({ temaEscuro, toggleTema }) {
    const navigate = useNavigate();
    const hoje = new Date();

    const [mesAtual, setMesAtual] = useState(hoje.getMonth());
    const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());
    const [notas, setNotas] = useState([]);
    const [diaSelecionado, setDiaSelecionado] = useState(null);
    const [notasDia, setNotasDia] = useState([]);
    
    const [pageLoaded, setPageLoaded] = useState(false);
  
    useEffect(() => {
        const timer = setTimeout(() => {
            setPageLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        let ativo = true;
        const buscar = async () => {
            const { data, error } = await supabase
                .from('notas')
                .select('*');
            if (!error && ativo) setNotas(data);
        };
        buscar();
        return () => { ativo = false; };
    }, []);

    const selecionarDia = (dia) => {
        if (!dia) return;
        const dataStr = `${anoAtual}-${String(mesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        setDiaSelecionado(dia);
        setNotasDia(notas.filter(n => n.data === dataStr));
    };

    const temNotas = (dia) => {
        if (!dia) return false;
        const dataStr = `${anoAtual}-${String(mesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        return notas.some(n => n.data === dataStr);
    };

    const gerarDias = () => {
        const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
        const totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate();
        const dias = [];
        for (let i = 0; i < primeiroDia; i++) dias.push(null);
        for (let d = 1; d <= totalDias; d++) dias.push(d);
        return dias;
    };

    const mesAnterior = () => {
        if (mesAtual === 0) { setMesAtual(11); setAnoAtual(a => a - 1); }
        else setMesAtual(m => m - 1);
        setDiaSelecionado(null);
        setNotasDia([]);
    };

    const proximoMes = () => {
        if (mesAtual === 11) { setMesAtual(0); setAnoAtual(a => a + 1); }
        else setMesAtual(m => m + 1);
        setDiaSelecionado(null);
        setNotasDia([]);
    };

    const isHoje = (dia) => {
        return dia === hoje.getDate() &&
               mesAtual === hoje.getMonth() &&
               anoAtual === hoje.getFullYear();
    };

    const corImportancia = (imp) => {
        if (imp === 'alta') return styles.alta;
        if (imp === 'media') return styles.media;
        return styles.baixa;
    };

    return (
        <div className={`${styles.page} ${pageLoaded ? styles.fadeIn : ''}`}>
            <div className={styles.top1}>
                  <button className={styles.btnVoltar} onClick={() => navigate('/home')}>
                    ← Voltar
                </button>
                <BotaoTema temaEscuro={temaEscuro} toggleTema={toggleTema} />
            </div>
            <div className={styles.header}>
                <h1 className={styles.titulo}>
                    Calendário
                </h1>
            </div>
            <div className={styles.navMes}>
                <button className={styles.btnNav} onClick={mesAnterior}>‹</button>
                <h2 className={styles.mesAno}>{MESES[mesAtual]} {anoAtual}</h2>
                <button className={styles.btnNav} onClick={proximoMes}>›</button>
            </div>
            <div className={styles.diasSemana}>
                {DIAS_SEMANA.map(d => (
                    <div key={d} className={styles.diaSemana}>{d}</div>
                ))}
            </div>
            <div className={styles.grelha}>
                {gerarDias().map((dia, i) => (
                    <div key={i}
                        className={`${styles.celula} ${!dia ? styles.vazia : ''} ${dia && isHoje(dia) ? styles.hoje : ''} ${dia && diaSelecionado === dia ? styles.selecionado : ''}`}
                        onClick={() => selecionarDia(dia)}
                    >
                        {dia && (
                            <>
                                <span className={styles.numeroDia}>{dia}</span>
                                {temNotas(dia) && <div className={styles.ponto} />}
                            </>
                        )}
                    </div>
                ))}
            </div>
            {diaSelecionado && (
                <div className={styles.notasDia}>
                    <h3 className={styles.tituloNotasDia}>{diaSelecionado} de {MESES[mesAtual]}</h3>
                    {notasDia.length === 0 ? (
                        <p className={styles.semNotas}>Sem notas neste dia.</p>
                    ) : (
                        notasDia.map(nota => (
                            <div key={nota.id} className={`${styles.cartaoNota} ${corImportancia(nota.importancia)}`}>
                                <div className={styles.notaHeader}>
                                    <span className={styles.notaTitulo}>{nota.titulo}</span>
                                    {nota.hora && <span className={styles.notaHora}>🕐 {nota.hora}</span>}
                                </div>
                                {nota.conteudo && <p className={styles.notaConteudo}>{nota.conteudo}</p>}
                                <div className={styles.notaFooter}>
                                    {nota.categoria && <span className={styles.badge}>{nota.categoria}</span>}
                                    {nota.importancia && <span className={`${styles.badge} ${corImportancia(nota.importancia)}`}>{nota.importancia}</span>}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Calendario;
