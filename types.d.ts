interface Chat {
    sender: string;
    message: string;
    timestamp: number;
}

interface Room {
    roomId: string;
    owner: string;
    chat: Chat[];
    createdAt: number;
}

export { Chat, Room };