import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

/**
 * Componente MainLayout
 * Layout principal que envuelve todas las páginas
 * Incluye Header, contenido Outlet y Footer
 */
export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-1">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
}