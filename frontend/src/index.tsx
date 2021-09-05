import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import App from './app/App';
import './scss/index.scss';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App />
);
// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root') as HTMLElement
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();