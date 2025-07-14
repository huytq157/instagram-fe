
import { Box, Stack, Avatar, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

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

const ChatHeader = ({ person }) => {
    const { activeUsers } = useContext(AuthContext);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                p: 1,
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                sx={{ borderBottom: "1px solid #ccc", p: 2 }}
                spacing={1}
            >

                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}                
                    variant={activeUsers?.find(user => user._id === person?.user?._id) ? 'dot' : ''}
                >
                    <Avatar src={person?.user?.avatar} alt="" />

                </StyledBadge>

                <Typography variant="subtitle2" display="block" gutterBottom>
                    {person?.user?.username}
                </Typography>
            </Stack>
        </Box>
    )
}

export default ChatHeader;