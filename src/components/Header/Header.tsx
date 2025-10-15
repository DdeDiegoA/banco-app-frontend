import { Link } from 'react-router-dom';
import BankIcon from '../../assets/bank.svg'; //
import './Header.css';

/**
* Barra de navegación principal de la aplicación bancaria.
*
* Características:
* - Ícono SVG Bank fluido con clamp()
* - Navegación semántica (<nav>, <ul>, <li>)
* - Accesible y responsivo
* - Arquitectura limpia y mantenible
*/
export function Header() {
    return (
        <header className="header" role="banner">
            <div className="header__container">
                {/* Sección de marca */}
                <div className="header__brand">
                    <Link to="/" className="header__logo-link" aria-label="Ir a inicio">
                        <div className="header__icon-wrapper">
                            {/* Usa el icono SVG Bank */}
                            <img
                                src={BankIcon}
                                alt="Ícono del banco"
                                className="header__icon"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <h1 className="header__title">Kairon Bank</h1>
                    </Link>
                </div>

                {/* Sección de navegación */}
                <nav className="header__nav" role="navigation" aria-label="Navegación principal">
                    <ul className="header__nav-list">
                        <li><Link to="/" className="header__nav-link" aria-current="page">Inicio</Link></li>
                        <li><Link to="/accounts" className="header__nav-link">Cuentas</Link></li>
                        <li><Link to="/transactions" className="header__nav-link">Transacciones</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
