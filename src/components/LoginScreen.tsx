import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUser, setRememberUser] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login validation
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12" style={{ backgroundColor: '#003366' }}>
      <div className="flex flex-col items-center mb-12">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#00B894' }}>
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <h1 className="text-white text-3xl font-bold mb-2">Kairon Bank</h1>
        <p className="text-white/80">Banca digital segura y moderna</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border-gray-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border-gray-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberUser}
              onCheckedChange={setRememberUser}
            />
            <Label htmlFor="remember" className="text-sm text-gray-600">
              Recordar usuario
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full py-3 text-white font-medium rounded-lg transition-colors"
            style={{ backgroundColor: '#003366' }}
          >
            Ingresar
          </Button>

          <div className="text-center">
            <button
              type="button"
              className="text-sm hover:underline"
              style={{ color: '#003366' }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}