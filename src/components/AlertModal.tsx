import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type ActionButtonProps = { name: string; onClick: () => void };

type AlertModalProps = {
  open: boolean;
  title: string;
  description: string;
  agreeButton: ActionButtonProps;
  disagreeButton: ActionButtonProps;
};

function AlertModal({
  open,
  title,
  description,
  agreeButton,
  disagreeButton,
}: AlertModalProps) {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={disagreeButton.onClick}>{disagreeButton.name}</Button>
        <Button onClick={agreeButton.onClick} autoFocus>
          {agreeButton.name}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertModal;
