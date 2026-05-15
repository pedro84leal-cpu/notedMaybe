import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../Config/supabase';

function RotaProtegida({ children }) {

    const navigate = useNavigate();
    const [verificando, setVerificando] = useState(true);

    useEffect(() => {
        const verificar = async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) {
                navigate('/login');
            } else {
                setVerificando(false);
            }
        };
        verificar();
    }, [navigate]);

    if (verificando) return null; // ou um loading spinner

    return children;
}

export default RotaProtegida;