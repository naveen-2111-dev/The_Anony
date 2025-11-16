import { Request, Response } from "express";
import { get, ref } from "firebase/database";
import { db } from "../../config";

export async function GetRoom(req: Request, res: Response) {
    try {
        let { roomId } = req.params;
        if (!roomId) {
            return res.status(404).json({ success: false, message: "roomId Not found" });
        }

        const roomRef = ref(db, `rooms/${roomId}`);

        const snapshot = await get(roomRef);

        if (!snapshot.exists()) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        const roomData = snapshot.val();

        return res.status(200).json({ success: true, room: roomData });
    } catch (error) {
        console.error("Failed to get room:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get room",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}
