const socket = io('http://localhost:3000', {
  path: '/socket-inside',
  extraHeaders: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJiYkBnbWFpbC5jb20iLCJpZCI6ImEzOWUwZWNhLTQ4ZjYtNGIxYS05YmY2LTM5MTYwYjM3ODZlMCIsImlhdCI6MTY0MTg4NDE3MSwiZXhwIjoxNjQxODg3NzcxfQ.MJ_AlpLmlA9KWG4cOKw_A7Hj5668qtzJFnxqyBbTZTA',
  },
});

const message = document.getElementById('message');
const messages = document.getElementById('messages');

const handleSubmitNewMessage = () => {
  socket.emit('msgToServer', { data: message.value });
};

socket.on('msgToClient', ({ data }) => {
  handleNewMessage(data);
});

const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
};

const buildNewMessage = (message) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  return li;
};
