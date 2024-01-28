import React from 'react';

export default function ChatMessages({ messages }) {
    return (
        <ul className="chat">
            {messages.map(message => {
                const username = message.author.name;
                const mes = message.message;
                return (
                    <li>
                        <strong>{username}</strong>
                        <div className="mb-2 text-white">
                            <p className="bg-[#6CC655] inline p-1 mb-2 rounded">{mes}</p>
                        </div>
                    </li>
                )
            })}
        </ul>
    );
}