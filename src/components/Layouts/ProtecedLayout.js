import { useContext, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CreatePostModalContext } from "../../context/CreatePostModalContext";
import CreateModal from "../Modal/CreatePostModal";

const ProtecedLayout = ({ children }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const { isOpen, setIsOpen, setAction, setPost } = useContext(
    CreatePostModalContext
  );

  const [showDismissDialog, setShowDismissDialog] = useState(false);

  const handleClose = () => {
    if (isOpen) {
      setShowDismissDialog(true);
    } else {
      setAction("create");
      setPost(null);
      setIsOpen(false);
    }
  };

  const handleConfirmDismiss = () => {
    setAction("create");
    setPost(null);
    setIsOpen(false);
    setShowDismissDialog(false);
  };

  const handleCancelDismiss = () => {
    setShowDismissDialog(false);
  };

  if (!user) {
    return (
      <Navigate
        to={`/signin?redirect=${encodeURIComponent(location.pathname)}`}
      />
    );
  }
  return (
    <Box>
      {children}
      {isOpen && <CreateModal handleClose={handleClose} />}

      <Dialog
        open={showDismissDialog}
        onClose={handleCancelDismiss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xác nhận hủy</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn loại bỏ việc tạo bài viết không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDismiss} color="error"  variant="contained">
            Hủy
          </Button>
          <Button onClick={handleConfirmDismiss} variant="contained" color="success" autoFocus>
            Bỏ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProtecedLayout;
