import {
  Box,
  IconButton,
  Modal,
  TextField,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import React from "react";
import { CircularProgress } from "@mui/material";

import SearchAccountItem from "./SearchAccountItem";
import useSearchUsers from "../../../hook/useSearchUsers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "310px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
};

const CloseSeach = {
  position: "fixed",
  top: "-30px",
  right: "-30px",
  ZIndex: 999999,
  bgcolor: "background.paper",
};

const SearchModal = ({ openSearch, setOpenSearch }) => {
  const {
    handleOnChangeInput,
    loading,
    searchResults,
    searchText,
    setShowBox,
    showSearchBox,
  } = useSearchUsers();

  return (
    <>
      <Modal
        open={openSearch}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <IconButton sx={CloseSeach} onClick={() => setOpenSearch(false)}>
            <CloseIcon />
          </IconButton>

          <TextField
            onFocus={() => setShowBox(true)}
            value={searchText}
            onChange={handleOnChangeInput}
            placeholder="Search"
            variant="standard"
            fullWidth
            sx={{ p: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                  {/* Search */}
                </InputAdornment>
              ),
              endAdornment: loading && (
                <InputAdornment position="end">
                  <CircularProgress size={16} color="inherit" />
                </InputAdornment>
              ),
            }}
          />

          <Box open={showSearchBox && searchResults?.length > 0}>
            <Box sx={{ width: "100%" }}>
              {searchResults?.map((account) => (
                <Box
                  sx={{
                    background: "ccc",
                    px: 2,
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                      background: "#eee",
                    },
                  }}
                  onClick={() => setOpenSearch(false)}
                >
                  <SearchAccountItem account={account} key={account._id} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SearchModal;
