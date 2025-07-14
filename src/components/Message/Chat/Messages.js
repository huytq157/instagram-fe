import {Box} from "@mui/material";
import FooterChat from "./ChatFooter";
import Message from "./Message";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getMessages, newMessages } from "../../../services/messages";

const Messages = ({ person, conversation }) => {
  
    const [messages, setMessages] = useState([]);
    const [incomingMessage, setIncomingMessage] = useState(null);
    const [value, setValue] = useState();
    const [file, setFile] = useState();
    const [image, setImage] = useState();

    const scrollRef = useRef();

    const { user, socket, newMessageFlag, setNewMessageFlag } = useContext(AuthContext);

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            })
        })
    }, []);

    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessages(conversation?._id);
            setMessages(data);   
        }
        getMessageDetails();
    }, [conversation?._id, person._id, newMessageFlag]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: "smooth" })
    }, [messages]);

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
            setMessages((prev) => [...prev, incomingMessage]);

    }, [incomingMessage, conversation]);

    const receiverId = conversation?.members?.find(member => member !== user?._id);


    const sendText = async (e) => {
        let code = e.keyCode || e.which;
        if (!value) return;

        if (code === 13) {
            let message = {};
            if (!file) {
                message = {
                    senderId: user?._id,
                    receiverId: receiverId,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value
                };
            } else {
                message = {
                    senderId: user?._id,
                    receiverId: receiverId,
                    conversationId: conversation._id,
                    type: 'file',
                    text: image
                };
            }

            socket.current.emit('sendMessage', message);

            await newMessages(message);

            setValue('');
            setFile();
            setImage('');
            setNewMessageFlag(prev => !prev);
        }
    }

    return (
        <>

            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    p: 1,
                    mb: 10,
                    overflow: "auto",
                }}
            >
                 {messages.map((message, index) => (
                    <Box key={index} ref={index === messages.length - 1 ? scrollRef : null}>
                        <Message message={message} />
                    </Box>
                ))}
            </Box>


            <FooterChat
                sendText={sendText}
                value={value}
                setValue={setValue}
                setFile={setFile}
                file={file}
                setImage={setImage}
             />
        </>
    )
}

export default Messages;