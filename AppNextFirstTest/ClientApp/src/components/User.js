import React, { Component } from 'react';
import { Paper, Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Typography, Button, Dialog, DialogContent, TextField, DialogActions } from '@mui/material'

export default class User extends Component {
    static displayName = User.name;

    constructor(props) {
        super(props);
        this.state = { users: [], loading: false, dialog: false, selectedUser: {} };
        this.getUsers = this.getUsers.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.changeDialog = this.changeDialog.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        this.getUsers();
    }

    async getUsers() {
        const response = await fetch('users');
        const data = await response.json();
        this.setState({ users: data, loading: false })
    }

    getTasks(userId) {
        this.props.onGetTasks(userId)
    }

    changeDialog(user) {
        this.setState({ dialog: !this.state.dialog, selectedUser: user })
    }

    async addUser() {
        await fetch('users/user', { method: "POST", headers: { 'Content-type': 'application/json' }, body: JSON.stringify(this.state.selectedUser) })
        this.setState({ dialog: false, selectedUser: {} })
        this.getUsers();
    }

    async editUser() {
        await fetch('users/user', { method: "PUT", headers: { 'Content-type': 'application/json' }, body: JSON.stringify(this.state.selectedUser) })
        this.setState({ dialog: false, selectedUser: {} })
        this.getUsers();
    }

    async deleteUser(userId) {
        const response = await fetch(`users/user?userId=${userId}`, { method: "DELETE" });
        if (response.ok) {
            this.setState({ loading: true })
            this.getUsers();
        }
    }


    renderUsersTable(users) {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table" sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                    </TableHead>
                    <TableBody>
                        {users.map(user => {
                            return <TableRow key={user.username}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => this.getTasks(user.userId)}>
                                        Select
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => this.changeDialog(user)}>
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => this.deleteUser(user.userId)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    render() {
        let content = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderUsersTable(this.state.users);
        return (
            <div>
                <Typography variant="h5" gutterBottom>
                    Users
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    Select one of the users to show his tasks
                </Typography>
                <Button onClick={() => this.changeDialog({})}>Create new user</Button>
                {content}
                <Dialog open={this.state.dialog} onClose={() => this.changeDialog({})}>
                    <DialogContent>
                        <TextField
                            autofocus
                            margin="dense"
                            id="username"
                            label="username"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={!!this.state.selectedUser ? this.state.selectedUser.username : ""}
                            onChange={(e) => {
                                let user = this.state.selectedUser;
                                user.username = e.target.value
                                this.setState({ selectedUser: user })
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.changeDialog({})}>Close</Button>
                        <Button onClick={!!this.state.selectedUser.userId ? () => this.editUser() : () => this.addUser()}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}