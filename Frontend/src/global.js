import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
  body {

   
    font-family: 'Poppins', sans-serif;
    background-image:url('./layered-peaks-haikei.svg');
  }
`;

function App() {
  return (
    <div>
      <GlobalStyles /> {/* Apply the global styles */}
      {/* Your app content */}
    </div>
  );
}

export default App;
