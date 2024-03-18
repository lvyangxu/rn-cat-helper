


import React from 'react';
import { ContextProvider } from './components/context/context';
import { Framework } from './components/framework';


function App(): React.JSX.Element {





  return (
    <ContextProvider>
      <Framework />

    </ContextProvider >


  );
}



export default App;
