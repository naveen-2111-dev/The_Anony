import { Request, Response } from "express";
import { ref, set } from "firebase/database";
import { nanoid } from "nanoid";
import { db } from "../../config";
import { getLocalIP } from "../utils/getIp";

export async function CreateRoom(req: Request, res: Response) {
    try {
        let { roomId } = req.body;
        if (!roomId) {
            roomId = nanoid(10);
        }

        const ip = getLocalIP();

        if (!ip) {
            return res.status(400).json({ success: false, message: "IP address not found" });
        }

        const roomRef = ref(db, `rooms/${roomId}`);

        await set(roomRef, {
            owner: ip,
            createdAt: Date.now(),
        });

        return res.status(200).json({ success: true, roomId });
    } catch (error) {
        console.error("Failed to create room:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create room",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}
