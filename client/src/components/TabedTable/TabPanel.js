import React from 'react'
import PropTypes from "prop-types";
import { Box, Typography } from '@material-ui/core';


function TabPanel({ children, value, index, ...other }) {

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}>
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

export default TabPanel
