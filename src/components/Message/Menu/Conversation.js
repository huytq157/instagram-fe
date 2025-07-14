import { Box, Stack, Avatar, Typography, Badge } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getConversation, setConversation } from "../../../services/messages";
import { AuthContext } from "../../../context/AuthContext";
import { UserContext } from "../../../context/UserProvider";
import { formatDate } from "../../../utils/contants";
import { styled } from '@mui/material/styles';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


const Conversation = ({ users }) => {
    const { setPerson, person } = useContext(UserContext);
    const { user, newMessageFlag, activeUsers } = useContext(AuthContext);
    const [message, setMessage] = useState({});

    useEffect(() => {
        const getConversationMessage = async () => {
            const data = await getConversation({ senderId: user?._id, receiverId: users?.user?._id });
            setMessage({ text: data?.message, timestamp: data?.updatedAt });
        }
        getConversationMessage();
    }, [newMessageFlag]);

    const getUser = async () => {
        setPerson(users);
        await setConversation({ senderId: user._id, receiverId: users?.user?._id });
    }

    return (

        <Box onClick={() => getUser()}>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                    "&:hover": {
                        background: "#eee",
                    },
                    p: 1,
                    borderRadius: "5px",
                    cursor:'pointer'
                }}
            >

                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant={activeUsers?.find(user => user._id === person?.user?._id) ? 'dot' : ''}
                >
                    <Avatar src={users?.user?.avatar} alt="" />
                </StyledBadge>
                <Box sx={{ width: "100%" }}>
                    <Typography variant="subtitle2" gutterBottom>
                        {users?.user?.username}
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {message?.text?.includes('localhost') ? 'media' : message.text}
                        </Typography>


                        {message?.text &&
                            <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                sx={{ width: "20%" }}
                            >
                                {formatDate(message?.timestamp)}
                            </Typography>
                        }
                    </Stack>
                </Box>
            </Stack>
        </Box>)
}


export default Conversation;