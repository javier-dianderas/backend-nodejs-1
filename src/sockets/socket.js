let io = null;

export const setSocket = (socketInstance) => {
    io = socketInstance;
};

export const getSocket = () => {
    return io;
};