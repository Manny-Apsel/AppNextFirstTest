import React, { Component } from 'react';
import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material'
import User from './User'
import Task from './Task'

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { selectedUserId: null, selectedUsername: null };
    this.selectedUserId = this.selectedUserId.bind(this);
    this.awaitSetState = this.awaitSetState.bind(this);
  }

  async awaitSetState(newState) {
    new Promise(resolve =>
      this.setState(
        newState,
        resolve
      ));
  }

  async selectedUserId(user) {
    await this.awaitSetState({ selectedUserId: user.userId, selectedUsername: user.userName  });
  }


  render() {
    let task = this.state.selectedUserId == null
      ? null
      : <Task userId={this.state.selectedUserId} username={this.state.selectedUsername} />
    return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <User onGetTasks={this.selectedUserId} />
        </Grid>
        <Grid item xs={8}>
          {task}
        </Grid>
      </Grid>
    );
  }
}
