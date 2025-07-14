import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import Sidebar from "../Sidebar";
import { useContext, useState } from "react";
import { CreatePostModalContext } from "../../context/CreatePostModalContext";
import CreateModal from "../Modal/CreatePostModal";

const MainLayout = ({ children }) => {
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

  return (
    <Container
      maxWidth="100%"
      sx={{ height: "100vh", display: "flex", justifyContent: "space-between" }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "19%",
          height: "100%",
          borderRight: "1px solid #ccc",
        }}
      >
        <Sidebar />
      </Box>
      <Box sx={{ width: "81%", display: "block", ml: "19%", pt: 2 }}>
        {children}
      </Box>

      {isOpen && <CreateModal handleClose={handleClose} />}

      <Dialog
        open={showDismissDialog}
        onClose={handleCancelDismiss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Dismiss</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to dismiss the post creation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleCancelDismiss}>Cancel</button>
          <button onClick={handleConfirmDismiss} autoFocus>
            Confirm
          </button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MainLayout;
