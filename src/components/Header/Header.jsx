import { useLocation } from 'react-router';
import './Header.scss';
import {
    useNavigate
  } from 'react-router-dom';
import { useEffect, useState } from 'react';

  
function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [showFlag, setShowFlag] = useState(false);

    useEffect(() => {
        setShowFlag(true)
        setTimeout(() => {
            setShowFlag(false)
          }, 500);
    }, [location]);


    return (
        <div className="header">
            <h3 onClick={() => navigate('/')}>Podcaster</h3>
            <div className={showFlag ? "show transition-flag" : "transition-flag"}></div>
        </div>
    )
}

export default Header;
