import React, {useEffect, useState} from 'react';

export const useMessages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const response = await fetch('/messages');
    const newMessages = await response.json();
    setMessages(newMessages);
  };

  const createMessage = async (messageContent) => {
    await fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({content: messageContent}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Message Created:', data);
      });
  };

  const deleteMessage = async (messageId) => {
    await fetch(`/messages/${messageId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Message Deleted:', data);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {messages, createMessage, deleteMessage};
};
