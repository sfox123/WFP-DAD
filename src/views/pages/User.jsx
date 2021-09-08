import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function FormDialog(props) {
    const { open, setOpen, name, passWord } = props


    const handleClose = () => {
        setOpen(false);
    };



    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">User Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can copy the username and password fields but can't edit
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        value={name}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="email"
                        value={passWord}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} color='secondary'>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}