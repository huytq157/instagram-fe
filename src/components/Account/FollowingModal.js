import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@tanstack/react-query";
import { getFollowers } from "../../services/users";
import { Link } from "react-router-dom";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    minHeight: "50px",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "8px",
    py: 3
};

const CloseSeach = {
    position: "fixed",
    top: "-30px",
    right: "-30px",
    ZIndex: 999999,
    bgcolor: "background.paper",
};

const FollowingModal = ({ showFollowingModal, setShowFollowingsModal, _id }) => {
    const { data: follower } = useQuery(["follower"], () =>
        getFollowers(_id)
    );

    return (<>
        <Modal
            open={showFollowingModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={style}>
                <IconButton sx={CloseSeach} onClick={() => setShowFollowingsModal(false)}>
                    <CloseIcon />
                </IconButton>

                {
                    follower?.followers?.map((account) => (
                        <Box component={Link} to={`/profile/${account?.user?._id}`} sx={{ textDecoration: "none", color: "#000", p: 3 }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{
                                px: 3,
                                py: 1,
                                borderRadius: "10px",
                                "&:hover": {
                                    backgroundColor: "#eee",
                                },
                            }}>
                                <Avatar alt="Remy Sharp" src={account?.user?.avatar} />
                                <Box>
                                    <Typography variant="subtitle2" >
                                        {account?.user?.username}
                                    </Typography>
                                    <Typography variant="body2" >
                                        {account?.user?.fullname}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    ))
                }
            </Box>
        </Modal>
    </>)
}


export default FollowingModal;
