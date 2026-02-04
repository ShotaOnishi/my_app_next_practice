"use client";

import { useState } from "react";
import { useRecoilState } from "recoil";
import { sendMessageAtom } from "@/common/store/chat/chat";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const ChatForm: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [, setSender] = useRecoilState(sendMessageAtom);

    const sendMessage = async () => {
        if (!message) return;

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: "user",
                    message: message,
                }),
            });

            const data = await response.json();
            setSender(true);
        } catch (err) {
            console.error(err);
        }

        setMessage("");
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                padding: 20,
                background: "#fff",
            }}
        >
            <div style={{ display: "flex", gap: 10 }}>
                <input
                    style={{
                        width: "100%",
                        lineHeight: 2.5,
                        padding: 10,
                        borderRadius: 10,
                        border: "1px solid #ccc",
                    }}
                    type="text"
                    value={message}
                    placeholder="新しいチャットを送る..."
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                />
                <Button
                    variant="contained"
                    onClick={() => {
                        sendMessage();
                    }}
                >
                    <SendIcon />
                </Button>
            </div>
        </div>
    );
};