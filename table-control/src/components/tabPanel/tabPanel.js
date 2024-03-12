import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Table from '../table/table'
import rangeManager from '../../logic/rangeManager';
import {
  getHorizontalManagerForTables,
  getVerticalManagerForTable1, 
  getVerticalManagerForTable2
} from '../../logic/rangeManagersFactory'
import SerializationBar from '../serializationBar/serializationBar';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const exportHandler = (table) => {

  }

  const importHandler = (table) => {

  }

  let tab1 = new Table( { colMgr: getVerticalManagerForTable1(), rowMgr: getHorizontalManagerForTables()});
  let bar1 = new SerializationBar({table : tab1});
  let tab2 = new Table( { colMgr: getVerticalManagerForTable2(), rowMgr: getHorizontalManagerForTables()});
  let bar2 = new SerializationBar({table : tab2});
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Table 1" />
          <Tab label="Table 2"  />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div>
          {bar1 }
          {tab1 }
        </div>
        
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div>
          {bar2 }
          {tab2 }
        </div>
        
      </CustomTabPanel>
    </Box>
  );
}
