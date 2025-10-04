import React, { type ReactNode } from 'react';
import './RedirectButton.css';

/**
 * Interface para las props del componente RedirectButton
 * Esta es la estructura de datos para el botón de redirección reutilizable
*/
interface RedirectButtonProps {
    /** Elemento de ícono a renderizar (componente de íconos SVG) */
    icon: ReactNode;
    /** Texto descriptivo del botón */
    label: string;
    /** Función para manejar click/redirección */
    onClick?: () => void;
    /** Estado visual que indica si el botón está activo/seleccionado */
    isActive?: boolean;
}

/**
 * Componente atómico RedirectButton
 * Botón reutilizable diseñado para acciones de navegación o redirección.
 * Incluye soporte para estados activos, accesibilidad completa y diseño responsive.
*/
const RedirectButton: React.FC<RedirectButtonProps> = ({
    icon,
    label,
    onClick,
    isActive = false,
}) => {
    /**
     * Construcción dinámica de clases CSS basada en el estado
     * Aplica la clase activa solo cuando isActive es true
    */
    const buttonClasses = `button ${isActive ? 'button--active' : ''}`.trim();

    return (
        <button
            type="button"
            className={buttonClasses}
            onClick={onClick}
            aria-label={label}
            aria-pressed={isActive}
        >
            {/* Contenedor del ícono */}
            <span className="button__icon" aria-hidden="true">
                {icon}
            </span>
            <span className="button__label">{label}</span>
        </button>
    );
};

export default RedirectButton;