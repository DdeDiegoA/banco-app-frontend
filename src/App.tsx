import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { AccountsScreen } from './components/AccountsScreen';
import { MovementsScreen } from './components/MovementsScreen';
import { TransactionsScreen } from './components/TransactionsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNavigation } from './components/BottomNavigation';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState('home');
  const [screenParams, setScreenParams] = useState<Record<string, any>>({});

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveScreen('home');
    setScreenParams({});
  };

  const handleScreenChange = (screen: string, params: Record<string, any> = {}) => {
    setActiveScreen(screen);
    setScreenParams(params);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleScreenChange} />;
      case 'accounts':
        return <AccountsScreen onNavigateToTransfer={handleScreenChange} />;
      case 'movements':
        return <MovementsScreen />;
      case 'transactions':
        return <TransactionsScreen initialParams={screenParams} />;
      case 'profile':
        return <ProfileScreen onLogout={handleLogout} />;
      default:
        return <HomeScreen onNavigate={handleScreenChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Main Content */}
      <div className="pb-20">
        {renderScreen()}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation 
        activeScreen={activeScreen} 
        onScreenChange={(screen) => handleScreenChange(screen)} 
      />
    </div>
  );
}