import './Footer.css';

/**
* Pie de página de la aplicación bancaria.
* Muestra información de copyright y derechos reservados.
* 
* Características:
* - Año calculado automáticamente
* - Accesibilidad con role="contentinfo"
* - Responsive y adaptable
*/
export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer" role="contentinfo">
            <div className="footer__container container">
                <p className="footer__text">
                    © {currentYear} Banco App - Todos los derechos reservados
                </p>
            </div>
        </footer>
    );
}