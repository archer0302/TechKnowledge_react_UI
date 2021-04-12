import React, { useState } from 'react';

import NetworkGraph from './graph/NetworkGraph';
import Navigation from './navigation/Navigator';

function App() {

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <Navigation />
      <NetworkGraph center="razor" />
    </div>
  );
}

export default App;
