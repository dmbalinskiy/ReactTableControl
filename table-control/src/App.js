import './App.css';

// Filename - App.js
import './App.css';
import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import TabPanel from './components/tabPanel/tabPanel';

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <TabPanel />
        </StyledEngineProvider>
    )
}




export default App;
