import React from 'react';

export const messagesContext = {
  message: {
    status: '',
    text: '',
    shown: false
  },
  clearMessages: async () => {
    messagesContext.message = {
      status: '',
      text: '',
      shown: true
    };
  },
  setMessage: async (status, text) => {
    messagesContext.message = {
      status: status,
      text: text,
      shown: false
    };
  },
  toggleShown: async () => {
    messagesContext.message.shown =
      messagesContext.message.shown === true ? false : true;
  }
};

export const MessageContext = React.createContext(messagesContext);
