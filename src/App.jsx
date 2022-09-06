import Router from './Router';
import { useEffect, useState } from 'react';
import api from './apis';
import auth from './utils/auth';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!auth.isLoggedIn()) {
      return;
    }
    api.users.get().then((data) => {
      setUser(data);
    });
  }, []);
  return <Router user={user} />;
}

export default App;
