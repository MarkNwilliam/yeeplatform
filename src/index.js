import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const App = lazy(() => import('./App'));
const AuthProvider = lazy(() => import('./contexts/AuthContext').then(module => ({ default: module.AuthProvider })));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <Suspense fallback={<div>Loading...</div>}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Suspense>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
