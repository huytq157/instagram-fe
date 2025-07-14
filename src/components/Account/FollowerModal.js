import { Box, Stack, Typography,Avatar, Modal } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@tanstack/react-query";
import { getFollowings } from "../../services/users";
import { Link } from "react-router-dom";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    minHeight: "50px",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "8px",
    py: 3
};

const CloseSeach ={
    position: "fixed",
    top: "-30px",
    right: "-30px",
    ZIndex: 999999,
    bgcolor: "background.paper",
};

const FolloweModal = ({ showFollowersModal, setShowFollowersModal, _id }) => {
    const { data: following } = useQuery(["following"], () =>
        getFollowings(_id)
    );

    return (<>
        <Modal
            open={showFollowersModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={style}>
                <IconButton sx={CloseSeach} onClick={() => setShowFollowersModal(false)}>
                    <CloseIcon />
                </IconButton>

                {
                    following?.followings?.map((account) => (

                        <Box component={Link} to={`/profile/${account?.user_follow?._id}`} sx={{ textDecoration: "none", color: "#000", p: 5 }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{
                                px:3,
                                py:1,
                                borderRadius:"10px",
                                "&:hover": {
                                    backgroundColor: "#eee",
                                },
                            }}>
                                <Avatar alt="Remy Sharp" src={account?.user_follow?.avatar} />
                                <Box>
                                    <Typography variant="subtitle2" >
                                        {account?.user_follow?.username}
                                    </Typography>
                                    <Typography variant="body2" >
                                        {account?.user_follow?.fullname}
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


export default FolloweModal;
