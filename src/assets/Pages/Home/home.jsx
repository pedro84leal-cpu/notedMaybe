import BotaoTema from '../../Components/Botao-tema/botaoTema'
import Menu from '../../Components/Menu/menu'
import styles from './home.module.css'
import BarraPesquisa from '../../Components/Barra-pesquisa/barraPesquisa'
import logo from '../../Images/logo.png'
import Modal from '../../Components/Modal/modal'
import logoApp from '../../Images/titulo_logo.png'
import { LuClock } from 'react-icons/lu';
import { BsFire } from 'react-icons/bs'; 



function Home({ temaEscuro, toggleTema, pesquisa, setPesquisa, notas = [] }){

    const notasFiltradas = notas.filter(nota =>
        nota.titulo.toLowerCase().includes(pesquisa.toLowerCase()) ||
        nota.conteudo.toLowerCase().includes(pesquisa.toLowerCase())
    );

    const hoje = new Date().toISOString().split('T')[0];
    const notasHoje = notas.filter(nota => nota.data === hoje);
    const notasImportantes = notas.filter(nota => nota.importancia === 'alta');

    return(
    <>
    <Menu />
    <div className={styles.topo}>
        <BarraPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa} />
        <BotaoTema temaEscuro={temaEscuro} toggleTema={toggleTema} />        
    </div>
    <div className={styles.container}>
        <img src={logoApp} alt="Notinhas" className={styles.notinhas} />
        <div className={styles.grid}>
            <div className={styles.quadrado1}>
                <h3 className={styles.diario}>
                    Hoje
                </h3>
                <div className={styles.lista}>
                {notasHoje.map(nota => (
                    <p  key={nota.id}> <LuClock size={10} style={{color: '#110252'}} /> {nota.titulo}</p>
                ))}
                </div>
            </div>
            <div className={styles.quadrado2}>
                  <h3 className={styles.importante}>
                    Importante
                </h3>
                <div className={styles.lista}>
                {notasImportantes.map(nota => (
                    <p key={nota.id}> <BsFire size={10} style={{color: '#f7331d'}} /> {nota.titulo}</p>
                ))}
                </div>             
            </div>
        </div>
        <div className={styles.grid2}>
            <div className={styles.quadrado3}>
                <h3 className={styles.wallet}>
                    Wallet
                </h3>
            </div>
        </div>
     

    </div> 


    {pesquisa && notasFiltradas.length === 0 && (
        <Modal onClose={() => setPesquisa('')}>
            <div className={styles.semResultados}>
                <img src={logo} alt="Notinhas" className={styles.mascote} />
                <p>Sem resultados... porque não perguntas ao meu amigo Gemini?</p>
                <button className={styles.botaoClaude}>
                    Perguntar ao Gemini
                </button>
            </div>
        </Modal>
    )}
        
    {pesquisa && notasFiltradas.length > 0 && (          
        <Modal onClose={() => setPesquisa('')}>
            <img src={logo} alt="Notinhas" className={styles.mascote} />
            <div className={styles.listaNotas}>
            {notasFiltradas.map(nota => (
                <div key={nota.id} className={styles.cartao}>                        
                <h3>{nota.titulo}</h3>
                <p>{nota.categoria}</p>
                <p>{nota.conteudo}</p>
                <p>{nota.data}</p>
                <p>{nota.importancia}</p>
                </div>
            ))}
            </div>
        </Modal>
    )}
       
    </>

    )
}

export default Home