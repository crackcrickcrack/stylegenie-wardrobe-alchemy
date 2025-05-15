
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Remove any existing event listeners for better performance
const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(<App />);
