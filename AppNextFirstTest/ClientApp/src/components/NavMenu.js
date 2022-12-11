import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { AppBar, Box, Toolbar, Typography } from '@mui/material'

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{marginBottom: "1em"}}>
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              AppNext First Test
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
}
