import { Request, Response } from "express";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import { db } from "../../config";
import { getLocalIP } from "../utils/getIp";
import { Room } from "../../types";

export async function GetMyRoom(req: Request, res: Response) {
    try {
        const ip = getLocalIP();

        const roomsQuery = query(
            ref(db, "rooms"),
            orderByChild("owner"),
            equalTo(ip)
        );

        const snapshot = await get(roomsQuery);

        if (!snapshot.exists()) {
            return res.status(200).json({ success: true, rooms: [] });
        }

        const rooms: Room[] = [];
        const data = snapshot.val();
        for (const [key, value] of Object.entries(data)) {
            rooms.push({
                ...(value as Room),
                roomId: key
            });
        }

        return res.status(200).json({ success: true, rooms });
    } catch (error) {
        console.error("Failed to get room:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get room",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}
