import * as React from 'react';
import Navbar from './components/navbar/Navbar';
import Banner from './components/banner/Banner';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  return (
    <div>
      <div>
        <Navbar></Navbar>
        <Banner></Banner>
      </div>
    </div>
  );
}

export default App;
