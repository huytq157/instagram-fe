import { useContext } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { AuthContext } from '../../../context/AuthContext';
import { formatDate } from '../../../utils/contants';

const Wrapper = styled(Box)`
    background: #FFFFFF;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;

const Own = styled(Box)`
    background:#007aff;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    margin-left: auto;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: #000;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
`;

const Message = ({ message }) => {
    const { user } = useContext(AuthContext);

    return (
        <Box sx={{mb:0.5}}>
            {
                user._id === message.senderId ?
                    <Own>
                        {
                            message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                        }
                    </Own>
                    :
                    <Wrapper>
                        {
                            message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                        }
                    </Wrapper>
            }

        </Box>
    )
}

const TextMessage = ({ message }) => {

    return (
        <>
            <Text>{message.text}</Text>
            <Time>{formatDate(message.createdAt)}</Time>
        </>
    )
}

const ImageMessage = ({ message }) => {

    return (
        <div style={{ position: 'relative' }}>
            {
                message?.text?.includes('.pdf') ?
                    <div style={{ display: 'flex' }}>
                        <Typography style={{ fontSize: 14 }} >{message.text.split("/").pop()}</Typography>
                    </div>
                    :
                    <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message.text} alt={message.text} />
            }
            <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>

                {formatDate(message.createdAt)}
            </Time>
        </div>
    )
}


export default Message;