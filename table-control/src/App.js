import logo from './logo.svg';
import './App.css';

// Filename - App.js
import './App.css';
import Table from './components/table/table'
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import TabPanel from './tabPanel/tabPanel';

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <TabPanel />
        </StyledEngineProvider>
        // <Table />
    )
}




export default App;
