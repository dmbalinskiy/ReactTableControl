import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Table from '../table/table'
import {
  getHorizontalManagerForTables,
  getVerticalManagerForTable1, 
  getVerticalManagerForTable2
} from '../../logic/rangeManagersFactory'

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

  let tab1 = new Table( { colMgr: getVerticalManagerForTable1(), rowMgr: getHorizontalManagerForTables()});
  let tab2 = new Table( { colMgr: getVerticalManagerForTable2(), rowMgr: getHorizontalManagerForTables()});
  
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
          {tab1 }
        </div>
        
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div>
          {tab2 }
        </div>
        
      </CustomTabPanel>
    </Box>
  );
}
