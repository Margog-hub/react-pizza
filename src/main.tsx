import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import { store } from './redux/store.jsx';
import { Provider } from 'react-redux';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}