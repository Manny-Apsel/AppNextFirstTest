import React, { Component } from 'react';
import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material'
import User from './User'

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { selectedUserId: null };
    this.selectedUserId = this.selectedUserId.bind(this);
  }

  selectedUserId(userId) {
    this.setState({ selectedUserId: userId });
    console.log("state changed");
  }


  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <User onGetTasks={this.selectedUserId} />
        </Grid>
        <Grid item xs={8}>
          {/* Tasks component */}
        </Grid>
      </Grid>
    );
  }
}
