import Router from './Router';
import { useEffect, useState } from 'react';
import api from './utils/api';
import auth from './utils/auth';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!auth.isLoggedIn()) {
      return;
    }
    api
      .get('/profile')
      .then((data) => {
        setUser(data);
      })
      .catch(() => auth.clear());
  }, []);
  return <Router user={user} />;
}

export default App;
