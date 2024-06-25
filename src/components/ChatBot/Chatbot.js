'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import styles from './Chat.css';
import OpenAI from 'openai';


function ChatBot({ chat, setChat }) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

   

    
    const timeOfDay = () => {
        const date = new Date();
        const hours = date.getHours();
        if (hours < 12) {
            return 'morning';
        } else if (hours < 18) {
            return 'afternoon';
        } else {
            return 'evening';
        }
    };

    const sendMessage = async (message) => {
        setChat((prevChat) => [...prevChat, { message, sender: 'user' }]);
        setLoading(true);
        try {
            const response = await fetch('/api/chatbot/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
                },
                body: JSON.stringify({ message }),
            });
            const data = await response.json();
            setChat((prevChat) => [
                ...prevChat,
                { message: data.choices[0].message.content, sender: 'bot' },
            ]);
        } catch (error) {
            console.error(error);
            setChat((prevChat) => [...prevChat, { message: "I'm sorry, lo-fi bot is currently unavailable. Try refreshing the page or come back later!", sender: "bot" }]);
        } finally {
            setLoading(false);
        }
    };

    const handleChatSubmit = (data) => {
        sendMessage(data.message);
    };

    const clearChat = () => {
        setChat([
            {
                message: `Hello, how are you this ${timeOfDay()}?`,
                sender: 'bot',
            },
        ]);
    };

    return (
        <div className={styles.chatbox}>
            <h2>Ask Me Anything✨</h2>
            <Button onClick={clearChat} style={{ position: "absolute", right: "10px", top: "10px" }}>Clear Chat</Button>
            <div id="chatBody" className={styles.chatStyle}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                    }}
                >
                    {chat.map((message, index) => (
                        <div key={index}
                            className={styles.messageStyle}
                            style={{
                                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                backgroundColor: message.sender === 'user' ? '#f3f3f3' : '#f1f1f1',
                            }}>
                            {message.message}
                        </div>
                    ))}
                </div>
            </div>
            <form
                onSubmit={handleSubmit(handleChatSubmit)}
                style={{ display: "flex", justifyContent: "space-between" }}
                className={styles.formStyle}
            >
                <input
                    type="text"
                    name="message"
                    {...register("message", { required: true })}
                    placeholder="Type a message..."
                    style={{ width: "80%" }}
                />
                <Button disabled={loading} type="submit" style={{ width: "20%" }}>
                    Send
                </Button>
            </form>
            {errors.message && <p style={{ color: 'red' }}>Message is required.</p>}
        </div>
    );
}

export default ChatBot;