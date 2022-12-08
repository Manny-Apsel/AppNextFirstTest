import React, { Component } from 'react';
import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material'
import User from './User'

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <User />
        </Grid>
        <Grid item xs={8}>
          {/* Tasks component */}
        </Grid>
      </Grid>
    );
  }
}
