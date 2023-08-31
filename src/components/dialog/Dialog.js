import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types'; // Import PropTypes

import './dialog.css';

function CustomDialog({ open, onClose, title, content }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Disagree</Button>
        <Button onClick={onClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState('');

  const handleClickOpen = type => {
    setDialogType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="dialog__container">
      <div className="dialog__button1"></div>
      <div className="dialog__button2"></div>

      {dialogType === 'cathotel' && (
        <CustomDialog
          open={open}
          onClose={handleClose}
          title="Book Cat Hotel"
          content="Would you like to book the cat hotel?"
        />
      )}

      {dialogType === 'grooming' && (
        <CustomDialog
          open={open}
          onClose={handleClose}
          title="Book Grooming"
          content="Would you like to book grooming services?"
        />
      )}
    </div>
  );
}
