import styles from '../Menu/menu.module.css'
import { NavLink } from 'react-router-dom'
import { FaCalendarAlt } from "react-icons/fa";
import { TbHomeFilled } from "react-icons/tb";
import { FaWallet } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
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
            <NavLink to='/' className={({ isActive }) => isActive ? styles.linkAtivo : styles.link}>
               <TbHomeFilled className={styles.icone} />
            </NavLink>

            <NavLink to='/agenda'  className={({ isActive }) => isActive ? styles.linkAtivo : styles.link}>
                <FaCalendarAlt className={styles.iconeMidle} />
            </NavLink>

            <NavLink className={({ isActive }) => isActive ? styles.linkAtivo : styles.link} onClick={abrirForm}>
                <IoMdAddCircle className={styles.iconeAdd} />
            </NavLink>

            <NavLink to='/agenda'  className={({ isActive }) => isActive ? styles.linkAtivo : styles.link}>
                <FaWallet  className={styles.iconeMidle} />
            </NavLink>

         
            <NavLink to='/agenda'  className={({ isActive }) => isActive ? styles.linkAtivo : styles.link}>
                <CgProfile className={styles.icone} />
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