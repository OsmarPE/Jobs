import Link from "next/link";


export default function Footer() {
  return (
     <footer className="footer">
            <div className="container">
                <div className="footer__body">
                    <div className="footer__info">
                        <h3 className="footer__brand">JobsIA</h3>
                        <address className="footer__address">
                            <p>Calle 102 #102 Norte, Mérida,</p>
                            <p>Yucatán.</p>
                        </address>
                        <div className="footer__contact">
                            <Link href="mailto:support@propease.com" className="footer__email">support@propease.com</Link>
                            <Link href="tel:+1234567890" className="footer__phone">+1 (123) 456-7890</Link>
                        </div>
                    </div>

                    <nav className="footer__nav">
                        <div className="footer__column">
                            <h4 className="footer__heading">Navegación</h4>
                            <ul className="footer__links">
                                <li><Link href="#inicio" className="footer__link">Inicio</Link></li>
                                <li><Link href="#nosotros" className="footer__link">Nosotros</Link></li>
                                <li><Link href="#servicios" className="footer__link">Servicios</Link></li>
                                <li><Link href="#testimonios" className="footer__link">Testimonios</Link></li>
                            </ul>
                        </div>

                        <div className="footer__column">
                            <h4 className="footer__heading">Compañía</h4>
                            <ul className="footer__links">
                                <li><Link href="#terminos" className="footer__link">Términos y condiciones</Link></li>
                                <li><Link href="#privacidad" className="footer__link">Privacidad y política</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
    </footer>
  )
}
