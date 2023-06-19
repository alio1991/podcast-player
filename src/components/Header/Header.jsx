import './Header.scss';
import {
    useNavigate
  } from 'react-router-dom';

  
function Header() {
    const navigate = useNavigate();

    return (
        <div className="header">
            <h3 onClick={() => navigate('/')}>Podcaster</h3>
        </div>
    )
}

export default Header;
