import './App.css';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './Theme/DarkTheme';
import { Alert, CssBaseline, Snackbar } from '@mui/material';
import Routers from './Routers/Routers';
import { useEffect, useState } from 'react';
import { getUser } from './components/State/Authentication/Action';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantByUserId } from './components/State/Restaurant/Action';
import { findCartAction } from './components/State/Cart/Action';
import AppErrorBoundary from './components/Util/AppErrorBoundary';

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const auth = useSelector((store) => store.auth);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  useEffect(() => {
    const token = auth.jwt || jwt;
    if (!token) {
      return;
    }

    dispatch(getUser(token));
    dispatch(findCartAction(token));
  }, [dispatch, auth.jwt, jwt]);

  useEffect(() => {
    const token = auth.jwt || jwt;
    if (!token || auth.user?.role !== 'ROLE_RESTAURANT_OWNER') {
      return;
    }

    dispatch(getRestaurantByUserId(token));
  }, [dispatch, auth.jwt, auth.user?.role, jwt]);

  useEffect(() => {
    if (auth.success) {
      setToastMessage(auth.success);
      setToastSeverity('success');
      setToastOpen(true);
      return;
    }

    if (auth.error) {
      setToastMessage(String(auth.error));
      setToastSeverity('error');
      setToastOpen(true);
    }
  }, [auth.success, auth.error]);

  return (
    <AppErrorBoundary>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routers />
        <Snackbar
          open={toastOpen}
          autoHideDuration={2500}
          onClose={() => setToastOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setToastOpen(false)} severity={toastSeverity} sx={{ width: '100%' }}>
            {toastMessage}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </AppErrorBoundary>
  );
}

export default App;
