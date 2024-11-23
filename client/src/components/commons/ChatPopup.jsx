import { Avatar, IconButton, InputAdornment, Stack, TextField, Typography, Box, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { LuSendHorizonal } from "react-icons/lu";
import { Chat, Close } from '@mui/icons-material';
import { useSelector } from "react-redux";
import textConfigs from "../../config/text.config";
import chatApi from "../../api/modules/chat.api";
import { useStompClient, useSubscription } from 'react-stomp-hooks';

const ChatPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [chatRooms, setChatRooms] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const { user } = useSelector((state) => state.user);
    const [roomExistenceResponse, setRoomExistenceResponse] = useState();
    const [roomId, setRoomId] = useState();
    const messagesEndRef = useRef(null);
    // const stompClient = useStompClient();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() =>
        setRoomId(null)
        , [user])

    useEffect(() => {
        scrollToBottom();
    }, [messages, isVisible]); // Depend on messages to scroll down on new messages

    // useSubscription(
    //     roomExistenceResponse && roomExistenceResponse.roomExistence
    //         ? ['/chat/receive/' + roomExistenceResponse.roomResponse.id]
    //         : [],
    //     (message) => setMessages(messages => [...messages, JSON.parse(message.body)])
    // );

    // useEffect(() => {
    //     if (roomExistenceResponse) {
    //         setMessages(roomExistenceResponse.roomRecentMessages);
    //     }
    // }, [roomExistenceResponse]);
    // console.log("messages", messages);

    const handleCreateRoom = async () => {
        const data = {
            userId: user ? user.userId : null,
            phoneNumber: phoneNumber ? phoneNumber : null
        }
        const { response, err } = await chatApi.createRoom(data)
        localStorage.setItem('roomId', response.data.dataRoom.roomId);
        setRoomId(localStorage.getItem('roomId'));
    }

    useEffect(() => {
        const getRoom = async () => {
            const { response, err } = await chatApi.getRoom(roomId);
            if (response) {
                setRoomExistenceResponse(response.data.dataRoom);
            }
        }
        getRoom();
    }, [roomId]);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    const messagesWithAvatarVisibility = messages && messages.reduce((acc, message, index) => {
        const showAvatar = message.sender === 'Admin' && (index === 0 || messages[index - 1].sender !== 'Admin');
        acc.push({ ...message, showAvatar });
        return acc;
    }, []);

    return (
        <div>
            <Button
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 999,
                    backgroundColor: '#2D89E5',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                }}
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                {isVisible ? <Close /> : <Chat />}
            </Button>
            {((isVisible && user) || (isVisible && !user && roomId)) && (
                <Box
                    display="flex"
                    flexDirection="column"
                    borderRadius='8px'
                    sx={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '330px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        zIndex: 999
                    }}
                >
                    <Stack width='100%' display='flex' direction='row' justifyContent='space-between' alignItems='center' bgcolor='#2D89E5' p={1} borderRadius='8px 8px 0 0'>
                        <Stack direction='row' alignItems='center'>
                            <Avatar size='xs' />
                            <Stack ml={1} direction='column'>
                                <Typography variant="h7" color='white'>Admin</Typography>
                                <Typography variant="body2" color='white'>Chat với chúng tôi</Typography>
                            </Stack>
                        </Stack>
                        <IoMdClose onClick={() => setIsVisible(false)} />
                    </Stack>
                    <Box height='300px' overflow='auto' bgcolor='#FFFFFF' padding='16px' >
                        {!roomId && <Box sx={{
                            display: 'flex',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            ...textConfigs.style.basicFont,
                        }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateRoom}
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    ...textConfigs.style.basicFont,
                                    marginTop: '16px',
                                    width: '40%',
                                    borderRadius: '20px',
                                }}
                            >
                                Bắt đầu
                            </Button>
                        </Box>}
                        {messagesWithAvatarVisibility && messagesWithAvatarVisibility.map((message, index) => (
                            <Stack mb={1} alignItems='center' direction={message.sender === 'Admin' ? 'row' : 'row-reverse'} key={index}>
                                {message.showAvatar ? (
                                    <Avatar name="Admin" size="md" />
                                ) : message.sender === 'Admin' ? (
                                    <Box width="30px" height="30px" /> // Hiển thị Box trống chỉ khi là tin nhắn của Admin và không có avatar
                                ) : null}
                                <Box maxWidth='200px' width='fit-content' ml={message.showAvatar || message.sender !== 'Admin' ? 2 : 10} bgcolor='#E7E6EB' padding='7px' borderRadius='10px' mb={3}>
                                    <Typography>{message.text}</Typography>
                                </Box>
                            </Stack>
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>
                    <Box bgcolor='#FFFFFF' borderRadius='0 0 8px 8px' >
                        <form >
                            <TextField
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton type="submit" edge="end">
                                                <LuSendHorizonal />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            /></form>
                    </Box>
                </Box>
            )}
            {isVisible && !user && !roomId && (
                <Box
                    display="flex"
                    flexDirection="column"
                    borderRadius='8px'
                    sx={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '330px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        zIndex: 999
                    }}
                >
                    <Stack width='100%' display='flex' direction='row' justifyContent='space-between' alignItems='center' bgcolor='#2D89E5' p={1} borderRadius='8px 8px 0 0'>
                        <Stack direction='row' alignItems='center'>
                            <Avatar size='xs' />
                            <Stack ml={1} direction='column'>
                                <Typography variant="h7" color='white'>Admin</Typography>
                                <Typography variant="body2" color='white'>Chat với chúng tôi</Typography>
                            </Stack>
                        </Stack>
                        <IoMdClose onClick={() => setIsVisible(false)} />
                    </Stack>
                    <Box height='356px' overflow='auto' bgcolor='#FFFFFF' padding='16px' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                        <Typography sx={{
                            ...textConfigs.style.basicFont,
                        }} variant="body1" >
                            Nhập số điện thoại của bạn
                        </Typography>
                        <TextField
                            size="small"
                            sx={{
                                marginTop: '16px',
                                width: '70%',
                                '& .MuiInputBase-root': {
                                    borderRadius: '20px',
                                },
                            }}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreateRoom}
                            sx={{
                                ...textConfigs.style.basicFont,
                                marginTop: '16px',
                                width: '40%',
                                borderRadius: '20px',
                            }}
                        >
                            Bắt đầu
                        </Button>


                    </Box>

                </Box>
            )}
        </div>
    );
};

export default ChatPopup;