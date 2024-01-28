import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Header from '@/Layouts/Header';
import ChatMessages from '@/Components/Chat/ChatMessages';
import ChatForm from '@/Components/Chat/ChatForm';

export default function Chats(props) {
    const user = props.auth.user;
    const oponent = props.oponent
    const [messages, setMessages] = useState([]);

    // メッセージをバックエンドに送信
    const sendMessage = useCallback(async (message) => {
        await axios.post(route('chat.store'), { message: message, oponent_id: oponent.id });
        setMessages(prevState => ([ ...prevState, { message: message, author: user }]));
    });

    // チャットメッセージを取得する
    const getChatMessages = async () => {
        // const res = await axios.get(route('chat.fetch'));
        const res = await axios.get(route('chat.fetch', {oponent: oponent.id}));
        setMessages(res.data);
    };

    useEffect(() => {
        getChatMessages();
    }, []);

    return (
        <Header auth={props.auth} header={`${oponent.name}とのプライベートチャット`}>
            <div className="py-12 h-[600px]">
                <div className="mx-[8%] bg-white h-full overflow-y-scroll p-3">
                    <ChatMessages messages={messages} />
                </div>
                <div className="mx-[8%] bg-white border-t-2">
                    <ChatForm user={user} sendMessage={sendMessage} />
                </div>
            </div>
        </Header>
    );
}