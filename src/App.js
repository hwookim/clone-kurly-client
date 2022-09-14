import React from 'react';
import Router from './Router';

import useQuery from './hooks/useQuery';
import apis from './apis';

function App() {
  const user = useQuery('user', () => apis.users.get());
  return <Router user={user} />;
}

export default App;
