import React, { useState } from 'react';

import NetworkGraph from './graph/NetworkGraph';

function App() {

  return (
    <div style={{ height: '100vh' }}>
      <NetworkGraph center="razor" />
    </div>
  );
}

export default App;
