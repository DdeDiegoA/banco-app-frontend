import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Banco App</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="hover:underline">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/accounts" className="hover:underline">Cuentas</Link>
                        </li>
                        <li>
                            <Link to="/transactions" className="hover:underline">Transacciones</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
