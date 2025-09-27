import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Download, ArrowRightLeft, Eye, EyeOff } from 'lucide-react';

interface AccountsScreenProps {
  onNavigateToTransfer: (screen: string, params: Record<string, any>) => void;
}

export function AccountsScreen({ onNavigateToTransfer }: AccountsScreenProps) {
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const [showBalance, setShowBalance] = useState(true);

  const accounts = [
    {
      id: 1,
      type: 'Cuenta de Ahorros',
      number: '1234567890',
      balance: 2450000,
      movements: [
        { id: 1, date: '24 Sep 2024', description: 'Transferencia recibida de María González', amount: 500000, type: 'income' },
        { id: 2, date: '22 Sep 2024', description: 'Retiro ATM Zona Rosa', amount: -200000, type: 'expense' },
        { id: 3, date: '20 Sep 2024', description: 'Consignación sucursal', amount: 800000, type: 'income' },
        { id: 4, date: '18 Sep 2024', description: 'Transferencia a Juan Pérez', amount: -300000, type: 'expense' },
      ]
    },
    {
      id: 2,
      type: 'Cuenta Corriente',
      number: '9876543210',
      balance: 890000,
      movements: [
        { id: 1, date: '23 Sep 2024', description: 'Pago Servicios Públicos EPM', amount: -120000, type: 'expense' },
        { id: 2, date: '21 Sep 2024', description: 'Domiciliación nómina', amount: 2500000, type: 'income' },
        { id: 3, date: '19 Sep 2024', description: 'Compra POS Supermercado', amount: -85000, type: 'expense' },
      ]
    },
    {
      id: 3,
      type: 'Tarjeta de Crédito',
      number: '1111222233334444',
      balance: -150000,
      availableCredit: 2000000,
      isCredit: true,
      movements: [
        { id: 1, date: '24 Sep 2024', description: 'Compra online Amazon', amount: -89000, type: 'expense' },
        { id: 2, date: '22 Sep 2024', description: 'Pago mínimo tarjeta', amount: 45000, type: 'payment' },
        { id: 3, date: '20 Sep 2024', description: 'Compra restaurante', amount: -65000, type: 'expense' },
      ]
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const formatAccountNumber = (number: string) => {
    if (number.length === 16) {
      return `**** **** **** ${number.slice(-4)}`;
    }
    return `****${number.slice(-4)}`;
  };

  if (selectedAccount) {
    const account = accounts.find(acc => acc.id === selectedAccount);
    
    return (
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pt-12 pb-4">
          <button 
            onClick={() => setSelectedAccount(null)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={24} style={{ color: '#003366' }} />
          </button>
          <h1 className="text-gray-900 font-semibold">Detalle de Cuenta</h1>
          <div></div>
        </div>

        {/* Account Info */}
        <Card className="p-6 border border-gray-200 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-gray-900 font-semibold">{account.type}</h2>
              <p className="text-gray-500 text-sm">{formatAccountNumber(account.number)}</p>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {showBalance ? <EyeOff size={20} className="text-gray-600" /> : <Eye size={20} className="text-gray-600" />}
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-1">
              {account.isCredit ? 'Saldo actual' : 'Saldo disponible'}
            </p>
            <p 
              className="text-2xl font-bold"
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
              <p className="text-gray-600 text-sm mt-1">
                Crédito disponible: {showBalance ? formatCurrency(account.availableCredit + account.balance) : '•••••••'}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button 
              className="flex-1 py-3 text-white font-medium rounded-lg"
              style={{ backgroundColor: '#003366' }}
              onClick={() => onNavigateToTransfer('transactions', { 
                type: 'transfer', 
                fromAccountId: account.id,
                fromAccountName: account.type 
              })}
            >
              <ArrowRightLeft size={18} className="mr-2" />
              Transferir
            </Button>
            <Button 
              variant="outline" 
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Download size={18} />
            </Button>
          </div>
        </Card>

        {/* Recent Movements */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-900 font-semibold">Movimientos Recientes</h2>
            <button className="text-sm" style={{ color: '#003366' }}>
              Ver más
            </button>
          </div>

          <div className="space-y-2">
            {account.movements.map((movement) => (
              <Card key={movement.id} className="p-4 border border-gray-200 rounded-xl shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{movement.description}</p>
                    <p className="text-gray-500 text-sm">{movement.date}</p>
                  </div>
                  <p 
                    className="font-semibold text-right"
                    style={{ 
                      color: movement.type === 'income' || movement.type === 'payment' ? '#00B894' : '#D63031' 
                    }}
                  >
                    {movement.type === 'income' || movement.type === 'payment' ? '+' : ''}{formatCurrency(movement.amount)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center pt-12 pb-4">
        <h1 className="text-gray-900 text-xl font-semibold">Mis Cuentas</h1>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {showBalance ? <EyeOff size={20} className="text-gray-600" /> : <Eye size={20} className="text-gray-600" />}
        </button>
      </div>

      {/* Accounts List */}
      <div className="space-y-4">
        {accounts.map((account) => (
          <Card 
            key={account.id} 
            className="p-6 border border-gray-200 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedAccount(account.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-gray-900 font-semibold">{account.type}</h3>
                <p className="text-gray-500 text-sm">{formatAccountNumber(account.number)}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm">
                  {account.isCredit ? 'Saldo actual' : 'Saldo disponible'}
                </p>
                <p 
                  className="text-xl font-bold"
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
              </div>
            </div>

            {account.isCredit && (
              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Crédito disponible</span>
                  <span className="text-gray-900 font-medium">
                    {showBalance ? formatCurrency(account.availableCredit + account.balance) : '•••••••'}
                  </span>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}