'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { useForm } from 'react-hook-form';
import styles from './Chat.css';

function ChatBot({ chat, setChat }) {
    const [loading, setLoading] = useState(false);
    const [intents, setIntents] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Load intents from the JSON file when the component mounts
    useEffect(() => {
        async function loadIntents() {
            try {
                const response = await fetch('../ChatBot/intents.json');
                const data = await response.json();
                setIntents(data.root.intents); // Corrected 'roost' to 'root'
            } catch (error) {
                console.error('Error loading intents:', error);
            }
        }

        loadIntents();
    }, []);

    // Function to get response based on user input
    function getResponse(userInput) {
        userInput = userInput.toLowerCase();
        for (let intent of intents) {
            for (let pattern of intent.patterns) {
                if (userInput.includes(pattern.toLowerCase())) {
                    return intent.responses[Math.floor(Math.random() * intent.responses.length)];
                }
            }
        }
        return "Sorry, I don't understand that."; // Default response
    }

    // Function to handle user input and chatbot response
    const handleChatSubmit = (data) => {
        const userInput = data.message;
        setChat((prevChat) => [...prevChat, { message: userInput, sender: 'user' }]);
        
        const response = getResponse(userInput);
        setChat((prevChat) => [...prevChat, { message: response, sender: 'bot' }]);
    };

    // Clears the chat
    const clearChat = () => {
        setChat([{
            message: `Hello, how are you this ${timeOfDay()}?`,
            sender: 'bot',
        }]);
    };

    // Time of day function
    const timeOfDay = () => {
        const hours = new Date().getHours();
        if (hours < 12) return 'morning';
        if (hours < 18) return 'afternoon';
        return 'evening';
    };

    return (
        <div className={styles.chatbox}>
            <h2>Ask Me Anything✨</h2>
            <Button onClick={clearChat} style={{ position: "absolute", right: "10px", top: "10px" }}>Clear Chat</Button>
            <div id="chatBody" className={styles.chatStyle}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
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
