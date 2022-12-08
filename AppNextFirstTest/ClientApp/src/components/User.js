import React, { Component } from 'react';
import { Paper, Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Typography, Button } from '@mui/material'
import { minWidth } from '@mui/system';

export default class User extends Component {
    static displayName = User.name;

    constructor(props) {
        super(props);
        this.state = { users: [{ UserId: 1, Username: "Test" }], loading: true };
    }

    componentDidMount() {
        this.getUsers();
    }

    static renderUsersTable(users) {
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
                        {this.state.users.map(user => {
                            return <TableRow>
                                <TableCell>{user.Username}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={this.getTasks(user.UserId)}>
                                        Select
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={this.editUser(user.UserId)}>
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={this.deleteUser(user.UserId)}>
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
            : User.renderUsersTable(this.state.users);
        return (
            <div>
                <Typography variant="h5" gutterBottom>
                    Users
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    Select one of the users to show his tasks
                </Typography>
                {content}
            </div>
        );
    }

    async getUsers() {
        const response = await fetch('users');
        const data = await response.json();
        this.setState({ users: data, loading: false })
    }

    async getTasks(UserId) {
        // return user id to parent component
    }

    async editUser() {
        // open dialog to edit
    }

    async deleteUser(UserId) {
        const formData = new FormData();
        formData.append('UserId', UserId);
        const response = await fetch('users/user', { method: "DELETE", body: formData });
        this.setState({ loading: true })
        this.getUsers();
    }
}