import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Error';
import { motion } from 'framer-motion';
import Change from '../ForgotPasswordPage/Change';
import network from '../../services/network';
import Swal from 'sweetalert2';

function getModalStyle() {
    const top = '15vh';
    const left = '28vw';

    return {
        top: `${top}`,
        left: `${left}`
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
        padding: theme.spacing(2, 4, 3)
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
    const [error, setError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const resetPassword = (passwordForReset, confirmPasswordForReset, oldPasswordForReset) => {
        if (oldPasswordForReset.length < 8) {
            setError('old password should be at least 8 characters');
            return false;
        }
        if (passwordForReset.length < 8) {
            setError('password should be at least 8 characters');
            return false;
        }
        if (passwordForReset !== confirmPasswordForReset) {
            setError('passwords do not match');
            return false;
        }
        if (passwordForReset === oldPasswordForReset) {
            setError(`You should choose new password`);
            return false;
        }
        return true
    };


    const handleSubmitNewWebhookTeam = async () => {
        try {
            const passAllChecks = resetPassword(newPassword, confirmNewPassword, oldPassword);
            if (passAllChecks) {
                const { data: response } = await network.patch('/api/v1/users/change-password', { oldPassword, newPassword });
                Swal.fire({
                    icon: 'success',
                    text: response.message,
                    timer: 3000,
                })
                setOpen(false);
                return;
            }
        } catch (error) {
            console.log(error.response.data.message);
            setError(error.response.data.message);
            return;
        }
    };



    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (field) => (e) => {
        switch (field) {
            case 'oldP':
                setOldPassword(e.target.value);
                break;
            case 'newP':
                setNewPassword(e.target.value);
                break;
            case 'confirmP':
                setConfirmNewPassword(e.target.value);
                break;
            default:
                break;
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {        <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">Change Your Password</h2>
                {error !== '' && (
                    <motion.div style={{
                        position: 'absolute',
                        height: '40px',
                        borderRadius: '5px',
                        width: '400px',
                        color: 'white',
                        backgroundColor: 'rgba(255, 0, 0, 0.616)',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <ErrorIcon
                            style={{
                                color: 'white',
                                marginLeft: '4px',
                            }}
                        />
                        <div style={{
                            height: 'auto',
                            margin: 'auto',
                            color: 'white'
                        }}>{error}</div>
                    </motion.div>
                )}
                <div id="simple-modal-description">
                    <Change
                        data={{ oldPassword, password: newPassword, confirmPassword: confirmNewPassword }}
                        handleChange={handleChange}
                        changePassword={true}
                    />
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitNewWebhookTeam}
                >
                    Confirm
      </Button>
            </div>}
        </Modal >
    );
}
