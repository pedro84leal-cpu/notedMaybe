import styles from '../Menu/menu.module.css'
import { NavLink } from 'react-router-dom'
import { FaCalendarAlt, FaHome } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import Modal from '../Modal/modal';
import { useState } from 'react';
import NovaNota from '../NovaNota/form';



function Menu({ buscarNotas }){

    const [FormAberto, setFormAberto] = useState(false);
            
    const abrirForm = () => {
            setFormAberto(true);
        };

    return(
    <>
    <div className={styles.container}>
        <nav className={styles.nav}>
            <NavLink to='/home' className={({ isActive }) => isActive ? styles.linkAtivo : styles.link}>
               <FaHome className={styles.icone} />
            </NavLink>        

            <NavLink className={({ isActive }) => isActive ? styles.linkAtivo : styles.link} onClick={abrirForm}>
                <IoMdAddCircle className={styles.iconeAdd} />
            </NavLink>

            <NavLink to='/calendario'  className={({ isActive }) => isActive ? styles.linkAtivo : styles.link}>
                <FaCalendarAlt className={styles.icone} />
            </NavLink>
        </nav>

            {FormAberto && (                                   
            <Modal onClose={() => setFormAberto(false)}>   
                <NovaNota buscarNotas={buscarNotas} />
            </Modal>
        )}
    </div>
    </>

    )
}

export default Menu