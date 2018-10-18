import React from 'react';

export const messagesContext = {
  message: {
    status: '',
    text: ''
  },
  clearMessages: () => {
    messagesContext.message = {
      status: '',
      text: ''
    };
  },
  setMessage: (status, text) => {
    messagesContext.message = {
      status: status,
      text: text
    };
  },
};

export const MessageContext = React.createContext(messagesContext);
