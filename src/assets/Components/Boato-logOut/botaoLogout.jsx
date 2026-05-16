import styles from '../Boato-logOut/botaoLogout.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { SlLogout } from "react-icons/sl";
import { supabase } from '../../Config/supabase';



function BotaoLogout(){

    const navigate = useNavigate();

    const logout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    return(
        <>
        <div className={styles.content}>
            <Link to='/' className={styles.logOut} onClick={logout}>
                <SlLogout size={20} />
            </Link>
        </div>
        </>
    )
}

export default BotaoLogout