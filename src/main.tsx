import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { store } from '@Store/store.ts';
import { Provider } from 'react-redux';

import { App } from './App.tsx';
import './i18n';
import { ConfigProvider } from 'antd';
import { theme } from './utils/theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
