import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Filter } from 'lucide-react';

export function MovementsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const movements = [
    { 
      id: 1, 
      date: '24 Sep 2024', 
      description: 'Transferencia recibida de María González', 
      amount: 500000, 
      type: 'income',
      account: 'Ahorros ****1234',
      status: 'completed'
    },
    { 
      id: 2, 
      date: '23 Sep 2024', 
      description: 'Pago Servicios Públicos EPM', 
      amount: -120000, 
      type: 'expense',
      account: 'Corriente ****5678',
      status: 'completed'
    },
    { 
      id: 3, 
      date: '22 Sep 2024', 
      description: 'Compra Supermercado Éxito', 
      amount: -85000, 
      type: 'expense',
      account: 'Tarjeta ****9012',
      status: 'completed'
    },
    { 
      id: 4, 
      date: '22 Sep 2024', 
      description: 'Retiro ATM Zona Rosa', 
      amount: -200000, 
      type: 'expense',
      account: 'Ahorros ****1234',
      status: 'completed'
    },
    { 
      id: 5, 
      date: '21 Sep 2024', 
      description: 'Domiciliación nómina empresa', 
      amount: 2500000, 
      type: 'income',
      account: 'Corriente ****5678',
      status: 'completed'
    },
    { 
      id: 6, 
      date: '20 Sep 2024', 
      description: 'Consignación sucursal', 
      amount: 800000, 
      type: 'income',
      account: 'Ahorros ****1234',
      status: 'completed'
    },
    { 
      id: 7, 
      date: '20 Sep 2024', 
      description: 'Compra online Amazon', 
      amount: -89000, 
      type: 'expense',
      account: 'Tarjeta ****9012',
      status: 'pending'
    },
    { 
      id: 8, 
      date: '19 Sep 2024', 
      description: 'Compra POS Restaurante', 
      amount: -65000, 
      type: 'expense',
      account: 'Tarjeta ****9012',
      status: 'completed'
    },
    { 
      id: 9, 
      date: '18 Sep 2024', 
      description: 'Transferencia a Juan Pérez', 
      amount: -300000, 
      type: 'expense',
      account: 'Ahorros ****1234',
      status: 'completed'
    },
    { 
      id: 10, 
      date: '17 Sep 2024', 
      description: 'Pago mínimo tarjeta de crédito', 
      amount: 45000, 
      type: 'payment',
      account: 'Corriente ****5678',
      status: 'completed'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#00B894';
      case 'pending':
        return '#FDCB00';
      case 'failed':
        return '#D63031';
      default:
        return '#717182';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'pending':
        return 'Pendiente';
      case 'failed':
        return 'Fallida';
      default:
        return 'Desconocido';
    }
  };

  const filteredMovements = movements.filter(movement => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'income') return movement.type === 'income' || movement.type === 'payment';
    if (selectedFilter === 'expense') return movement.type === 'expense';
    return true;
  });

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-4">
        <h1 className="text-gray-900 text-xl font-semibold mb-4">Movimientos</h1>
        
        {/* Filters */}
        <div className="flex gap-3 mb-4">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="flex-1">
              <div className="flex items-center">
                <Filter size={16} className="mr-2 text-gray-500" />
                <SelectValue placeholder="Filtrar por tipo" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="income">Ingresos</SelectItem>
              <SelectItem value="expense">Gastos</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="flex-1">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-gray-500" />
                <SelectValue placeholder="Período" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Este trimestre</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 border border-gray-200 rounded-xl shadow-sm">
            <p className="text-gray-600 text-sm">Ingresos</p>
            <p className="font-bold" style={{ color: '#00B894' }}>
              {formatCurrency(3845000)}
            </p>
          </Card>
          <Card className="p-4 border border-gray-200 rounded-xl shadow-sm">
            <p className="text-gray-600 text-sm">Gastos</p>
            <p className="font-bold" style={{ color: '#D63031' }}>
              {formatCurrency(859000)}
            </p>
          </Card>
        </div>
      </div>

      {/* Movements List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-900 font-semibold">
            Historial ({filteredMovements.length} movimientos)
          </h2>
        </div>

        <div className="space-y-2">
          {filteredMovements.map((movement) => (
            <Card key={movement.id} className="p-4 border border-gray-200 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{movement.description}</p>
                  <p className="text-gray-500 text-sm">{movement.account}</p>
                </div>
                <div className="text-right">
                  <p 
                    className="font-semibold"
                    style={{ 
                      color: movement.type === 'income' || movement.type === 'payment' ? '#00B894' : '#D63031' 
                    }}
                  >
                    {movement.type === 'income' || movement.type === 'payment' ? '+' : ''}{formatCurrency(movement.amount)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{movement.date}</span>
                <div className="flex items-center">
                  <div 
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: getStatusColor(movement.status) }}
                  ></div>
                  <span 
                    className="text-sm"
                    style={{ color: getStatusColor(movement.status) }}
                  >
                    {getStatusText(movement.status)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="pt-4">
          <Button 
            variant="outline" 
            className="w-full py-3 border border-gray-200 hover:bg-gray-50"
          >
            Cargar más movimientos
          </Button>
        </div>
      </div>
    </div>
  );
}