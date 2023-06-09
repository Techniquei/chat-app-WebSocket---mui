import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChatPage } from './pages/ChatPage';
import { MainPage } from './pages/MainPage';
import { Provider } from 'react-redux';
import { store } from './store';
import { ProfilePage } from './pages/ProfilePage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'chat',
        element: <ChatPage />
      },
      {
        path: 'profile/:id',
        element: <ProfilePage />
      }
    ]
  }
])

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
