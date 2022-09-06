import Router from './Router';
import { useEffect, useState } from 'react';
import api from './apis';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    api.users.get().then((data) => setUser(data));
  }, []);
  return <Router user={user} />;
}

export default App;
