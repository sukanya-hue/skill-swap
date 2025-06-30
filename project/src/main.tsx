import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

console.log('Application starting...');
console.log('Environment:', import.meta.env.MODE);
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Has Supabase Key:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found');
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found</div>';
  throw new Error('Root element not found');
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React app rendered successfully');
} catch (error) {
  console.error('Error rendering React app:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; color: red; font-family: Arial, sans-serif;">
      <h2>Application Error</h2>
      <p>Failed to load the application. Please check the console for details.</p>
      <pre>${error}</pre>
    </div>
  `;
}