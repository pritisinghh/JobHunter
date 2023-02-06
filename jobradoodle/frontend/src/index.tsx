import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: `http://${process.env.REACT_APP_BACKEND_SERVICE_NAME}:${process.env.REACT_APP_BACKEND_PORT}`,
	timeout: 45000,
  });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
    <App />
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
