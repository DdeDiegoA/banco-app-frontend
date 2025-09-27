import React from 'react';
import { Home, CreditCard, TrendingUp, ArrowRightLeft, User } from 'lucide-react';

interface BottomNavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

export function BottomNavigation({ activeScreen, onScreenChange }: BottomNavigationProps) {
  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'accounts', label: 'Cuentas', icon: CreditCard },
    { id: 'movements', label: 'Movimientos', icon: TrendingUp },
    { id: 'transactions', label: 'Transacciones', icon: ArrowRightLeft },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <div 
      className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-2 py-2"
      style={{ boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex justify-around">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onScreenChange(id)}
            className="flex flex-col items-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1"
            style={{
              color: activeScreen === id ? '#003366' : '#717182',
              backgroundColor: activeScreen === id ? '#f0f8ff' : 'transparent'
            }}
          >
            <Icon size={20} className="mb-1" />
            <span className="text-xs truncate">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}