import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import GazillaApiContext from './components/GazillaApiContext';
import gazillaApi from './services/gazillaApi';




ReactDOM.render( 
        <GazillaApiContext.Provider value={gazillaApi}>
        <App />
        </GazillaApiContext.Provider>
        , 
  document.getElementById('root')
);
