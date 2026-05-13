import styles from '../Boato-logOut/botaoLogout.module.css'
import { Link } from 'react-router-dom'
import { MdOutlineLogin } from "react-icons/md";


function BotaoLogout(){

    return(
        <>
            <div className={styles.content}>
                <Link to='/' className={styles.logOut}>
                    Log Out <MdOutlineLogin size={15} />
                </Link>

            </div>

        </>

    )
}

export default BotaoLogout