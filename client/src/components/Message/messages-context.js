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
      text: ''
    };
  },
  setMessage: async (status, text) => {
    messagesContext.message = {
      status: status,
      text: text
    };
    messagesContext.toggleShown();
  },
  toggleShown: async () => {
    messagesContext.message.shown =
      messagesContext.message.shown === true ? false : true;
  }
};

export const MessageContext = React.createContext(messagesContext);
