import React, { useState, useEffect } from 'react';

interface AdminLoginProps {
  onLogin: (email: string, password: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // On darkMode change, toggle 'dark' class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Use the parent's login handler which includes demo mode
      await onLogin(emailOrPhone, password);
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      {/* Dark/Light Mode toggle */}
      <button
        className={`absolute top-4 right-4 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
          darkMode 
            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
            : 'bg-white hover:bg-gray-50 text-gray-800 shadow-sm'
        }`}
        onClick={() => setDarkMode(dm => !dm)}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Login Card */}
      <div className={`w-full max-w-md rounded-xl shadow-xl p-8 transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-800 text-white' 
          : 'bg-white text-gray-900'
      }`}>
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <img 
            src="/rlogo.jpg" 
            alt="Recover Logo" 
            width={64} 
            height={64} 
            className="mx-auto mb-4 rounded-lg"
          />
          <h1 className="text-2xl font-bold mb-2">RECOVER</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            by <strong>MEDLINE</strong>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email ID / Phone
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="admin@demo.com or user@demo.com"
              value={emailOrPhone}
              onChange={e => setEmailOrPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Password
            </label>
            <input
              type="password"
              className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="demo123"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <a 
              href="#" 
              className={`inline-block mt-2 text-sm hover:underline ${
                darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              Reset Password
            </a>
          </div>

          {error && (
            <div className={`p-3 rounded-lg border ${
              darkMode 
                ? 'bg-red-900/50 border-red-700 text-red-300' 
                : 'bg-red-50 border-red-200 text-red-600'
            }`}>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className={`p-4 rounded-lg border ${
            darkMode 
              ? 'bg-blue-900/50 border-blue-700' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <p className={`text-sm font-medium mb-3 ${
              darkMode ? 'text-blue-300' : 'text-blue-600'
            }`}>
              <strong>Demo Credentials:</strong>
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className={`text-xs ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}>
                  Admin: admin@demo.com / demo123
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setEmailOrPhone('admin@demo.com');
                    setPassword('demo123');
                  }}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    darkMode 
                      ? 'bg-blue-800 hover:bg-blue-700 text-blue-200' 
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                  }`}
                >
                  Fill
                </button>
              </div>
              <div className="flex justify-between items-center">
                <p className={`text-xs ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}>
                  User: user@demo.com / demo123
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setEmailOrPhone('user@demo.com');
                    setPassword('demo123');
                  }}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    darkMode 
                      ? 'bg-blue-800 hover:bg-blue-700 text-blue-200' 
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                  }`}
                >
                  Fill
                </button>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Login'}
          </button>
        </form>

        <button className={`w-full mt-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
          darkMode 
            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}>
          Login with Code
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;