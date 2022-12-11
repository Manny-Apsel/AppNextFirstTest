import { Table, Typography, Dialog, DialogContent, TextField, DialogActions, TableContainer, Paper, TableHead, TableCell, TableBody, TableRow, Button } from '@mui/material';
import React, { Component } from 'react';

export default class Task extends Component {

    constructor(props) {
        super(props);
        this.state = { tasks: [], dialog: false, selectedTask: {}, loading: false }
        this.getTasks = this.getTasks.bind(this);
        this.changeDialog = this.changeDialog.bind(this);
        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    componentDidMount() {
        this.getTasks();
    }

    componentWillReceiveProps(){
        this.getTasks();
    }

    async getTasks() {
        console.log("test");
        const response = await fetch(`tasks/user?UserId=${this.props.userId}`)
        const data = await response.json();
        this.setState({ tasks: data, loading: false })
    }

    changeDialog(task) {
        this.setState({ dialog: !this.state.dialog, selectedTask: task })
    }

    async addTask() {
        await fetch('tasks/task', { method: "POST", headers: { 'Content-type': 'application/json' }, body: JSON.stringify(this.state.selectedTask) })
        this.changeDialog({});
        this.getTasks();
    }

    async editTask() {
        await fetch('tasks/task', { method: "PUT", headers: { 'Content-type': 'application/json' }, body: JSON.stringify(this.state.selectedTask) })
        this.changeDialog({});
        this.getTasks();
    }

    async deleteTask(taskId) {
        const response = await fetch(`users/user?userId=${taskId}`, { method: "DELETE" });
        if (response.ok) {
            this.setState({ loading: true })
            this.getTasks();
        }
    }

    renderTasksTable(tasks) {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table" sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell></TableCell>
                        {/* <TableCell></TableCell> */}
                    </TableHead>
                    <TableBody>
                        {tasks.map(task => {
                            return <TableRow key={task.taskId}>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => this.changeDialog(task)} sx={{marginRight: "1em", minWidth:100}}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" onClick={() => this.deleteTask(task.taskId)} sx={{marginRight: "1em", minWidth:100}}>
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
            : this.renderTasksTable(this.state.tasks);
        return (
            <div>
                <Typography variant="h5" gutterBottom>
                    Tasks
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    Tasks assigned to {this.props.usename}
                </Typography>
                <Button onClick={() => this.changeDialog({})}>Create new Task</Button>
                {content}
                <Dialog open={this.state.dialog} onClose={() => this.changeDialog({})}>
                    <DialogContent>
                        <TextField
                            autofocus
                            margin="dense"
                            id="title"
                            label="title"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={!!this.state.selectedTask ? this.state.selectedTask.title : ""}
                            onChange={(e) => {
                                let task = this.state.selectedTask;
                                task.title = e.target.value
                                this.setState({ selectedTask: task })
                            }}
                        />
                        <TextField
                            autofocus
                            margin="dense"
                            id="description"
                            label="description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={!!this.state.selectedTask ? this.state.selectedTask.description : ""}
                            onChange={(e) => {
                                let task = this.state.selectedTask;
                                task.description = e.target.value
                                this.setState({ selectedTask: task })
                            }} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.changeDialog({})}>Close</Button>
                        <Button onClick={!!this.state.selectedTask.taskId ? () => this.editTask() : () => this.addTask()}>Ok</Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}