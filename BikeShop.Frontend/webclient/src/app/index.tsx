import React, {
  // lazy,
  Suspense,
} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';
import MainPage from '../pages/main/MainPage';
import Header from '../widgets/Header/Header';
import LoginForm from '../pages/loginForm/LoginForm';
import WorkCatalog from '../pages/Service/WorkCatalog';
import WorkCatalogPage from 'pages/workCatalogPage/workCatalogPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <Header />
          <Suspense>
            <Routes>
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/productcatalog" element={<WorkCatalog />} />
              <Route path="/workcatalog" element={<WorkCatalogPage />} />
              <Route path="/" element={<LoginForm />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
