import React from 'react';

export const messagesContainer = {
  message: {
    status: 'error',
    text: 'Error message!'
  }
};

export const MessageContext = React.createContext(
  // default value
  messagesContainer.message
);
