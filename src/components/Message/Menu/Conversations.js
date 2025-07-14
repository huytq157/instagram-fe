import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getFollowers } from "../../../services/users";
import Conversation from "./Conversation";

const Conversations = ({ text }) => {
    const [users, setUsers] = useState([])
    const { user, socket, setActiveUsers } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            let data = await getFollowers(user?._id);
            let fiteredData = data?.followers?.filter(user => user?.user?.username.toLowerCase().includes(text.toLowerCase()));
            setUsers(fiteredData);
        }
        fetchData();
    }, [text]);

    useEffect(() => {
        socket.current.emit('addUser', user);
        socket.current.on("getUsers", users => {
            setActiveUsers(users);
        })
    }, [user])


    return (
        <>
        {users.map((item, index) => (
            item?._id !== user._id && (
                <React.Fragment key={item._id}>
                    <Conversation users={item} />
                    {index !== users.length - 1 && <Box key={index} />}
                </React.Fragment>
            )
        ))}
    </>

    )
}

export default Conversations;