import React from 'react';

export default function ChatMessages({ messages, user }) {
    return (
        <ul className="chat">
            {messages.map(message => {
                const username = message.author.name;
                const mes = message.message;
                let className = "";
                if (message.author.id == user.id)
                {
                    className = "text-right";
                }
                return (
                    <li className={className}>
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