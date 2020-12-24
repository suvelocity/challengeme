import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import network from '../../services/network';
import Swal from 'sweetalert2';

function getModalStyle() {
    const top = '15vh';
    const left = '28vw';

    return {
        top: `${top}`,
        left: `${left}`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '40vw',
        height: '60vh',
        maxHeight: '400px',
        overflowY: 'auto',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    input: {
        width: '100%',
    },
}));

export default function ResetPassword({ open = false, setOpen, getAllTeams }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();

    const handleSubmitNewWebhookTeam = async () => {
        try {
            if (newPassword === confirmNewPassword) {
                await network.post('/api/v1/users/change-password', { oldPassword, newPassword, });
                setOpen(false);
            } else {
                Swal.fire({
                    style:{zIndex: 100},
                    icon: 'error',
                    title: 'New Password and Confirm New Password must be identical!',
                    showConfirmButton: true,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Reset Password field, Please try again later  ',
            });
         }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Change Your Password</h2>
            <div id="simple-modal-description">
                <Input
                    className={classes.input}
                    onChange={(event) => setOldPassword(event.target.value)}
                    placeholder="Old Password..."
                />
                <br />
                {' '}
                <br />
                <Input
                    className={classes.input}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="New Password..."
                />
                {' '}
                <br />
                {' '}
                <br />
                <Input
                    className={classes.input}
                    onChange={(event) => setConfirmNewPassword(event.target.value)}
                    placeholder="Confirm New Password ..."
                />
                {' '}
            </div>

            <br />

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitNewWebhookTeam}
            >
                Confirm
      </Button>
        </div>
    );

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    );
}
