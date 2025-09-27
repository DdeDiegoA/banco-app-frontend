import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowRightLeft, CreditCard, Smartphone, ArrowLeft, CheckCircle } from 'lucide-react';

interface TransactionsScreenProps {
  initialParams?: {
    type?: string;
    fromAccountId?: number;
    fromAccountName?: string;
  };
}

export function TransactionsScreen({ initialParams }: TransactionsScreenProps) {
  const [activeTransaction, setActiveTransaction] = useState<string | null>(initialParams?.type || null);
  const [transactionData, setTransactionData] = useState({
    type: initialParams?.type || '',
    fromAccount: initialParams?.fromAccountId ? 
      (initialParams.fromAccountId === 1 ? 'savings' : initialParams.fromAccountId === 2 ? 'checking' : '') : '',
    toAccount: '',
    amount: '',
    description: '',
    phoneNumber: '',
    operator: '',
    service: '',
    reference: ''
  });
  const [currentStep, setCurrentStep] = useState(initialParams?.type ? 'form' : 'select'); // select, form, confirm, success

  const accounts = [
    { id: 'savings', name: 'Cuenta de Ahorros', number: '****1234', balance: 2450000 },
    { id: 'checking', name: 'Cuenta Corriente', number: '****5678', balance: 890000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleTransactionSelect = (type: string) => {
    setActiveTransaction(type);
    setTransactionData({ ...transactionData, type });
    setCurrentStep('form');
  };

  const handleInputChange = (field: string, value: string) => {
    setTransactionData({ ...transactionData, [field]: value });
  };

  const handleNext = () => {
    if (currentStep === 'form') {
      setCurrentStep('confirm');
    } else if (currentStep === 'confirm') {
      setCurrentStep('success');
    }
  };

  const handleBack = () => {
    if (currentStep === 'form') {
      setCurrentStep('select');
      setActiveTransaction(null);
    } else if (currentStep === 'confirm') {
      setCurrentStep('form');
    } else if (currentStep === 'success') {
      setCurrentStep('select');
      setActiveTransaction(null);
      setTransactionData({
        type: '',
        fromAccount: '',
        toAccount: '',
        amount: '',
        description: '',
        phoneNumber: '',
        operator: '',
        service: '',
        reference: ''
      });
    }
  };

  const getTransactionTitle = () => {
    switch (activeTransaction) {
      case 'transfer':
        return 'Transferir Dinero';
      case 'payment':
        return 'Realizar Pago';
      case 'recharge':
        return 'Recargar Celular';
      default:
        return 'Transacciones';
    }
  };

  if (currentStep === 'success') {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between pt-12 pb-4">
          <div></div>
          <h1 className="text-gray-900 font-semibold">Transacción Exitosa</h1>
          <div></div>
        </div>

        <div className="flex flex-col items-center justify-center py-12">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: '#00B894' }}
          >
            <CheckCircle size={40} className="text-white" />
          </div>
          
          <h2 className="text-gray-900 text-xl font-semibold mb-2">¡Transacción Exitosa!</h2>
          <p className="text-gray-600 text-center mb-8">
            Tu {activeTransaction === 'transfer' ? 'transferencia' : activeTransaction === 'payment' ? 'pago' : 'recarga'} ha sido procesada correctamente
          </p>

          <Card className="w-full p-6 border border-gray-200 rounded-xl shadow-sm mb-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Tipo:</span>
                <span className="text-gray-900 font-medium">
                  {activeTransaction === 'transfer' ? 'Transferencia' : 
                   activeTransaction === 'payment' ? 'Pago' : 'Recarga'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monto:</span>
                <span className="text-gray-900 font-bold">{formatCurrency(parseInt(transactionData.amount))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Desde:</span>
                <span className="text-gray-900 font-medium">
                  {accounts.find(acc => acc.id === transactionData.fromAccount)?.name}
                </span>
              </div>
              {activeTransaction === 'transfer' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Para:</span>
                  <span className="text-gray-900 font-medium">{transactionData.toAccount}</span>
                </div>
              )}
              {activeTransaction === 'recharge' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Número:</span>
                  <span className="text-gray-900 font-medium">{transactionData.phoneNumber}</span>
                </div>
              )}
              {activeTransaction === 'payment' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Servicio:</span>
                    <span className="text-gray-900 font-medium">{transactionData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Referencia:</span>
                    <span className="text-gray-900 font-medium">{transactionData.reference}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha:</span>
                <span className="text-gray-900 font-medium">{new Date().toLocaleDateString('es-CO')}</span>
              </div>
            </div>
          </Card>

          <Button
            onClick={handleBack}
            className="w-full py-3 text-white font-medium rounded-lg"
            style={{ backgroundColor: '#003366' }}
          >
            Realizar Nueva Transacción
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'confirm') {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between pt-12 pb-4">
          <button onClick={handleBack} className="p-2 rounded-lg hover:bg-gray-100">
            <ArrowLeft size={24} style={{ color: '#003366' }} />
          </button>
          <h1 className="text-gray-900 font-semibold">Confirmar Transacción</h1>
          <div></div>
        </div>

        <Card className="p-6 border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-gray-900 font-semibold mb-4">Resumen de la transacción</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Tipo:</span>
              <span className="text-gray-900 font-medium">
                {activeTransaction === 'transfer' ? 'Transferencia' : 
                 activeTransaction === 'payment' ? 'Pago' : 'Recarga'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monto:</span>
              <span className="text-gray-900 font-bold text-xl">{formatCurrency(parseInt(transactionData.amount))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Desde:</span>
              <span className="text-gray-900 font-medium">
                {accounts.find(acc => acc.id === transactionData.fromAccount)?.name}
              </span>
            </div>
            {activeTransaction === 'transfer' && (
              <div className="flex justify-between">
                <span className="text-gray-600">Para:</span>
                <span className="text-gray-900 font-medium">{transactionData.toAccount}</span>
              </div>
            )}
            {activeTransaction === 'recharge' && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Número:</span>
                  <span className="text-gray-900 font-medium">{transactionData.phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Operador:</span>
                  <span className="text-gray-900 font-medium">{transactionData.operator}</span>
                </div>
              </>
            )}
            {activeTransaction === 'payment' && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Servicio:</span>
                  <span className="text-gray-900 font-medium">{transactionData.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Referencia:</span>
                  <span className="text-gray-900 font-medium">{transactionData.reference}</span>
                </div>
              </>
            )}
            {transactionData.description && (
              <div className="flex justify-between">
                <span className="text-gray-600">Descripción:</span>
                <span className="text-gray-900 font-medium">{transactionData.description}</span>
              </div>
            )}
          </div>

          <div 
            className="p-4 rounded-lg mb-6"
            style={{ backgroundColor: '#FFF3CD', borderColor: '#FDCB00', border: '1px solid' }}
          >
            <p className="text-sm" style={{ color: '#856404' }}>
              Por favor revisa cuidadosamente los datos antes de confirmar. Esta operación no se puede deshacer.
            </p>
          </div>
        </Card>

        <Button
          onClick={handleNext}
          className="w-full py-3 text-white font-medium rounded-lg"
          style={{ backgroundColor: '#003366' }}
        >
          Confirmar Transacción
        </Button>
      </div>
    );
  }

  if (currentStep === 'form') {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between pt-12 pb-4">
          <button onClick={handleBack} className="p-2 rounded-lg hover:bg-gray-100">
            <ArrowLeft size={24} style={{ color: '#003366' }} />
          </button>
          <h1 className="text-gray-900 font-semibold">{getTransactionTitle()}</h1>
          <div></div>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fromAccount">Cuenta origen</Label>
            <Select value={transactionData.fromAccount} onValueChange={(value) => handleInputChange('fromAccount', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una cuenta" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    <div className="flex justify-between items-center w-full">
                      <span>{account.name} {account.number}</span>
                      <span className="ml-4 text-sm text-gray-500">{formatCurrency(account.balance)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {activeTransaction === 'transfer' && (
            <div className="space-y-2">
              <Label htmlFor="toAccount">Cuenta destino</Label>
              <Input
                id="toAccount"
                placeholder="Número de cuenta o usuario"
                value={transactionData.toAccount}
                onChange={(e) => handleInputChange('toAccount', e.target.value)}
                className="bg-gray-50 border-gray-200 focus:border-blue-500"
              />
            </div>
          )}

          {activeTransaction === 'payment' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="service">Servicio</Label>
                <Select value={transactionData.service} onValueChange={(value) => handleInputChange('service', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agua">Acueducto y Alcantarillado</SelectItem>
                    <SelectItem value="luz">Energía Eléctrica</SelectItem>
                    <SelectItem value="gas">Gas Natural</SelectItem>
                    <SelectItem value="telefono">Telefonía Fija</SelectItem>
                    <SelectItem value="internet">Internet</SelectItem>
                    <SelectItem value="tv">Televisión</SelectItem>
                    <SelectItem value="predial">Impuesto Predial</SelectItem>
                    <SelectItem value="vehiculo">Impuesto Vehículo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">Referencia de pago</Label>
                <Input
                  id="reference"
                  placeholder="Número de contrato o referencia"
                  value={transactionData.reference}
                  onChange={(e) => handleInputChange('reference', e.target.value)}
                  className="bg-gray-50 border-gray-200 focus:border-blue-500"
                />
              </div>
            </>
          )}

          {activeTransaction === 'recharge' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Número de celular</Label>
                <Input
                  id="phoneNumber"
                  placeholder="3001234567"
                  value={transactionData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="bg-gray-50 border-gray-200 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operator">Operador</Label>
                <Select value={transactionData.operator} onValueChange={(value) => handleInputChange('operator', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona operador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claro">Claro</SelectItem>
                    <SelectItem value="movistar">Movistar</SelectItem>
                    <SelectItem value="tigo">Tigo</SelectItem>
                    <SelectItem value="wom">WOM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="amount">Monto</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={transactionData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className="bg-gray-50 border-gray-200 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Input
              id="description"
              placeholder="Concepto de la transacción"
              value={transactionData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="bg-gray-50 border-gray-200 focus:border-blue-500"
            />
          </div>

          <Button
            type="button"
            onClick={handleNext}
            disabled={!transactionData.fromAccount || !transactionData.amount || 
                     (activeTransaction === 'transfer' && !transactionData.toAccount) ||
                     (activeTransaction === 'payment' && (!transactionData.service || !transactionData.reference)) ||
                     (activeTransaction === 'recharge' && (!transactionData.phoneNumber || !transactionData.operator))}
            className="w-full py-3 text-white font-medium rounded-lg disabled:opacity-50"
            style={{ backgroundColor: '#003366' }}
          >
            Continuar
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-4">
        <h1 className="text-gray-900 text-xl font-semibold">Transacciones</h1>
        <p className="text-gray-600">Selecciona el tipo de operación que deseas realizar</p>
      </div>

      {/* Transaction Types */}
      <div className="space-y-4">
        <Card 
          className="p-6 border border-gray-200 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleTransactionSelect('transfer')}
        >
          <div className="flex items-center">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
              style={{ backgroundColor: '#E3F2FD' }}
            >
              <ArrowRightLeft size={24} style={{ color: '#003366' }} />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 font-semibold">Transferir Dinero</h3>
              <p className="text-gray-600 text-sm">Envía dinero a otras cuentas</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 border border-gray-200 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleTransactionSelect('payment')}
        >
          <div className="flex items-center">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
              style={{ backgroundColor: '#E8F5E8' }}
            >
              <CreditCard size={24} style={{ color: '#00B894' }} />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 font-semibold">Realizar Pago</h3>
              <p className="text-gray-600 text-sm">Paga servicios y facturas</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 border border-gray-200 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleTransactionSelect('recharge')}
        >
          <div className="flex items-center">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
              style={{ backgroundColor: '#FFF8E1' }}
            >
              <Smartphone size={24} style={{ color: '#FDCB00' }} />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 font-semibold">Recargar Celular</h3>
              <p className="text-gray-600 text-sm">Recarga saldo a tu celular</p>
            </div>
          </div>
        </Card>
      </div>


    </div>
  );
}