import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import NewPage from './pages/New';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
 


function App() {
  const theme = {
    primary: "#0061a5",
    secondary: "#0b3c66",
    background: "#F0F0F5",
    text: "#6C6C80",
    white: "#fff",
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/new' element={<NewPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  );

}

export default App;
