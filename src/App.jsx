import Router from './Router';
import { useEffect, useState } from 'react';
import apis from './apis';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    apis.users.get().then((data) => setUser(data));
  }, []);
  return <Router user={user} />;
}

export default App;
