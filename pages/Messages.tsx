import React, { useState } from 'react';
import HeaderBanner from '../components/HeaderBanner';
// FIX: Import the Message type to be used for explicit typing.
import { Conversation, Message } from '../types';
// FIX: Import the Button component to resolve the 'Cannot find name 'Button'' error.
import Button from '../components/ui/Button';

const mockConversations: Conversation[] = [
    {
        id: 1,
        title: 'Equipo EcoTech',
        participants: ['Juan Pérez', 'Ana Gómez', 'Carlos Ruiz'],
        avatar: 'https://i.pravatar.cc/150?img=1',
        messages: [
            { id: 1, sender: 'other', text: '¡Hola equipo! ¿Cómo vamos con el prototipo?', timestamp: '10:30 AM', avatar: 'https://i.pravatar.cc/150?img=5' },
            { id: 2, sender: 'me', text: '¡Hola Ana! Justo terminé la primera versión del backend.', timestamp: '10:32 AM', avatar: 'https://i.pravatar.cc/150?img=32' },
            { id: 3, sender: 'other', text: 'Genial, lo reviso y te doy feedback.', timestamp: '10:35 AM', avatar: 'https://i.pravatar.cc/150?img=5' },
        ]
    },
    {
        id: 2,
        title: 'Mentoría con Elena',
        participants: ['Juan Pérez', 'Elena Rodriguez'],
        avatar: 'https://i.pravatar.cc/150?img=2',
        messages: [
             { id: 1, sender: 'other', text: 'Juan, vi tu proyecto y me parece muy interesante. ¿Hablamos la próxima semana?', timestamp: 'Ayer', avatar: 'https://i.pravatar.cc/150?img=2' },
        ]
    }
];

const Messages: React.FC = () => {
    const [conversations, setConversations] = useState(mockConversations);
    const [selectedId, setSelectedId] = useState<number | null>(1);
    const [newMessage, setNewMessage] = useState('');

    const selectedConversation = conversations.find(c => c.id === selectedId);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newMessage.trim() || !selectedId) return;

        const updatedConversations = conversations.map(c => {
            if (c.id === selectedId) {
                // FIX: Explicitly type the new message object to ensure the 'sender' property conforms to the 'me' | 'other' literal type.
                const newMessageObj: Message = {
                    id: Date.now(),
                    sender: 'me',
                    text: newMessage,
                    timestamp: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit'}),
                    avatar: 'https://i.pravatar.cc/150?img=32'
                };

                return {
                    ...c,
                    messages: [
                        ...c.messages,
                        newMessageObj
                    ]
                }
            }
            return c;
        });

        setConversations(updatedConversations);
        setNewMessage('');
    };

    return (
        <>
            <HeaderBanner title="Buzón de Mensajes" subtitle="Comunícate con tu equipo, mentores y la comunidad." />
            <div className="flex h-[calc(100vh-12rem)] bg-white rounded-lg shadow-md">
                {/* Conversations List */}
                <div className="w-1/3 border-r border-slate-200 overflow-y-auto">
                    {conversations.map(conv => (
                        <div key={conv.id} 
                             onClick={() => setSelectedId(conv.id)}
                             className={`p-4 cursor-pointer flex items-center gap-3 transition-colors ${selectedId === conv.id ? 'bg-teal-50' : 'hover:bg-slate-50'}`}>
                            <img src={conv.avatar} alt={conv.title} className="w-12 h-12 rounded-full"/>
                            <div>
                                <p className="font-semibold text-slate-800">{conv.title}</p>
                                <p className="text-sm text-slate-500 truncate">{conv.messages[conv.messages.length - 1].text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Window */}
                <div className="w-2/3 flex flex-col">
                    {selectedConversation ? (
                        <>
                            <div className="p-4 border-b border-slate-200">
                                <h2 className="text-xl font-bold text-slate-800">{selectedConversation.title}</h2>
                            </div>
                            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                                {selectedConversation.messages.map(msg => (
                                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                                        {msg.sender === 'other' && <img src={msg.avatar} alt="avatar" className="w-8 h-8 rounded-full"/>}
                                        <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.sender === 'me' ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-800'}`}>
                                            <p>{msg.text}</p>
                                            <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-rose-100' : 'text-slate-500'} text-right`}>{msg.timestamp}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200">
                                <div className="flex gap-2">
                                    <input type="text"
                                           value={newMessage}
                                           onChange={(e) => setNewMessage(e.target.value)}
                                           placeholder="Escribe un mensaje..."
                                           className="flex-1 px-3 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                    <Button type="submit">Enviar</Button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-slate-500">
                            <p>Selecciona una conversación para empezar a chatear.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Messages;
