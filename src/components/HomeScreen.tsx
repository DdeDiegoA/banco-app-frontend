import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowRightLeft, Smartphone, CreditCard, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface HomeScreenProps {
  onNavigate?: (screen: string, params?: any) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [showBalance, setShowBalance] = useState(true);

  const accounts = [
    { type: 'Cuenta de Ahorros', number: '****1234', balance: 2450000 },
    { type: 'Cuenta Corriente', number: '****5678', balance: 890000 },
    { type: 'Tarjeta de Crédito', number: '****9012', balance: -150000, isCredit: true },
  ];

  const recentTransactions = [
    { description: 'Transferencia recibida', amount: 500000, date: '24 Sep', type: 'income' },
    { description: 'Pago Servicios Públicos', amount: -120000, date: '23 Sep', type: 'expense' },
    { description: 'Compra Supermercado', amount: -85000, date: '22 Sep', type: 'expense' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center pt-12 pb-4">
        <div>
          <h1 className="text-gray-900 text-xl font-semibold">¡Hola, Juan!</h1>
          <p className="text-gray-600">Bienvenido a Kairon Bank</p>
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#003366' }}>
          <span className="text-white font-semibold">JD</span>
        </div>
      </div>

      {/* Account Summary */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900 font-semibold">Resumen de Cuentas</h2>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {showBalance ? <EyeOff size={20} className="text-gray-600" /> : <Eye size={20} className="text-gray-600" />}
          </button>
        </div>

        {accounts.map((account, index) => (
          <Card key={index} className="p-4 border border-gray-200 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-gray-600 text-sm">{account.type}</p>
                <p className="text-gray-500 text-sm">{account.number}</p>
              </div>
              <div className="text-right">
                <p 
                  className="font-semibold"
                  style={{ 
                    color: account.isCredit ? (account.balance < 0 ? '#D63031' : '#00B894') : '#003366' 
                  }}
                >
                  {showBalance ? (
                    account.isCredit && account.balance < 0 ? 
                    `-${formatCurrency(account.balance)}` : 
                    formatCurrency(account.balance)
                  ) : '•••••••'}
                </p>
                {account.isCredit && (
                  <p className="text-gray-500 text-sm">Disponible</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-gray-900 font-semibold">Accesos Rápidos</h2>
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 h-auto border border-gray-200 hover:bg-gray-50"
            onClick={() => onNavigate?.('transactions', { type: 'transfer' })}
          >
            <ArrowRightLeft size={24} className="mb-2" style={{ color: '#003366' }} />
            <span className="text-sm">Transferir</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 h-auto border border-gray-200 hover:bg-gray-50"
            onClick={() => onNavigate?.('transactions', { type: 'payment' })}
          >
            <CreditCard size={24} className="mb-2" style={{ color: '#003366' }} />
            <span className="text-sm">Pagar</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 h-auto border border-gray-200 hover:bg-gray-50"
            onClick={() => onNavigate?.('transactions', { type: 'recharge' })}
          >
            <Smartphone size={24} className="mb-2" style={{ color: '#003366' }} />
            <span className="text-sm">Recargar</span>
          </Button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-900 font-semibold">Últimas Transacciones</h2>
          <button className="text-sm" style={{ color: '#003366' }}>
            Ver todas
          </button>
        </div>

        <div className="space-y-2">
          {recentTransactions.map((transaction, index) => (
            <Card key={index} className="p-4 border border-gray-200 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{transaction.description}</p>
                  <p className="text-gray-500 text-sm">{transaction.date}</p>
                </div>
                <p 
                  className="font-semibold"
                  style={{ 
                    color: transaction.type === 'income' ? '#00B894' : '#D63031' 
                  }}
                >
                  {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}