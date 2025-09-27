import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Shield, Bell, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

interface ProfileScreenProps {
  onLogout: () => void;
}

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const userInfo = {
    name: 'Juan David Martínez',
    email: 'juan.martinez@email.com',
    phone: '+57 300 123 4567',
    customerSince: 'Marzo 2020'
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData({ ...passwordData, [field]: value });
  };

  const handleChangePassword = () => {
    // Aquí iría la lógica para cambiar la contraseña
    console.log('Cambiar contraseña:', passwordData);
    setIsChangePasswordOpen(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const menuItems = [
    {
      id: 'change-password',
      label: 'Cambiar contraseña',
      icon: Shield,
      action: () => setIsChangePasswordOpen(true)
    },
    {
      id: 'help',
      label: 'Ayuda y soporte',
      icon: HelpCircle,
      action: () => console.log('Ayuda')
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-4">
        <h1 className="text-gray-900 text-xl font-semibold">Mi Perfil</h1>
      </div>

      {/* User Info Card */}
      <Card className="p-6 border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center mb-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
            style={{ backgroundColor: '#003366' }}
          >
            <span className="text-white text-xl font-bold">
              {userInfo.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-gray-900 font-semibold text-lg">{userInfo.name}</h2>
            <p className="text-gray-600">Cliente desde {userInfo.customerSince}</p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Email</span>
            <span className="text-gray-900 font-medium">{userInfo.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Teléfono</span>
            <span className="text-gray-900 font-medium">{userInfo.phone}</span>
          </div>
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-6 border border-gray-200 rounded-xl shadow-sm">
        <h3 className="text-gray-900 font-semibold mb-4">Configuración</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell size={20} className="mr-3 text-gray-600" />
              <div>
                <Label htmlFor="notifications" className="text-gray-900">Notificaciones push</Label>
                <p className="text-gray-600 text-sm">Recibe alertas de transacciones</p>
              </div>
            </div>
            <Switch
              id="notifications"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
        </div>
      </Card>

      {/* Menu Items */}
      <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={item.action}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center">
              <item.icon size={20} className="mr-3 text-gray-600" />
              <span className="text-gray-900 font-medium">{item.label}</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        ))}
      </Card>

      {/* Logout Button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full py-4 border-2 hover:bg-red-50"
            style={{ borderColor: '#D63031', color: '#D63031' }}
          >
            <LogOut size={20} className="mr-2" />
            Cerrar Sesión
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-sm mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">¿Deseas cerrar sesión?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Se cerrará tu sesión actual y tendrás que ingresar nuevamente tus credenciales.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col space-y-2 sm:flex-col sm:space-x-0 sm:space-y-2">
            <AlertDialogAction
              onClick={onLogout}
              className="w-full text-white font-medium"
              style={{ backgroundColor: '#D63031' }}
            >
              Cerrar Sesión
            </AlertDialogAction>
            <AlertDialogCancel className="w-full border border-gray-300">
              Cancelar
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Change Password Modal */}
      <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">Cambiar Contraseña</DialogTitle>
            <DialogDescription className="text-center">
              Ingresa tu contraseña actual y la nueva contraseña
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Contraseña actual</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Contraseña actual"
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                className="bg-gray-50 border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva contraseña</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Nueva contraseña"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                className="bg-gray-50 border-gray-200 focus:border-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirmar nueva contraseña"
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                className="bg-gray-50 border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>
          
          <DialogFooter className="flex-col space-y-2 sm:flex-col sm:space-x-0 sm:space-y-2">
            <Button
              onClick={handleChangePassword}
              disabled={!passwordData.currentPassword || !passwordData.newPassword || 
                       !passwordData.confirmPassword || passwordData.newPassword !== passwordData.confirmPassword}
              className="w-full text-white font-medium disabled:opacity-50"
              style={{ backgroundColor: '#003366' }}
            >
              Cambiar Contraseña
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsChangePasswordOpen(false)}
              className="w-full border border-gray-300"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* App Info */}
      <div className="text-center text-gray-500 text-sm pt-4">
        <p>Kairon Bank v2.1.0</p>
        <p>© 2024 Kairon Bank. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}