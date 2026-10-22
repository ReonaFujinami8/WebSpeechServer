import { useRef, useState } from "react";
import { WebSocketClient } from "../services/webSocketClient"
import { START_RECOGNITION, STOP_RECOGNITION } from "../utils/constant";
import type { RecognitionResult } from "../types/recognitionResult";

export const useWebsocket = () => {
    const clientRef = useRef<WebSocketClient | null>(null);

    const [isConnected, setIsConnected] = useState(false);
    const [recvMessage, setRecvMessage] = useState("");

    const webSocketConnect = (url:string) => {
        clientRef.current?.disconnect(); // 既存の接続先相手がいれば、切断

        const client = new WebSocketClient(receive, openSocket, closeSocket);

        clientRef.current = client;
        client.connect(url);
    };

    const webSocketDisconnect = () => {
        clientRef.current?.disconnect();
    };

    const webSocketSend = (recognitionResult: RecognitionResult) => {
        clientRef.current?.send(JSON.stringify(recognitionResult));
    };

    const receive = (message: string) => {
        if (message === START_RECOGNITION || message === STOP_RECOGNITION) {
            setRecvMessage(message);
        }
        else {
            console.log(`未定義のコマンドを受信しました。\n受信コマンド:${message}`);
            setRecvMessage("");
        }
    }

    const openSocket = () => {
        setIsConnected(true);
    };

    const closeSocket = () => {
        setIsConnected(false);
    }

    return {
        isConnected,
        recvMessage,
        webSocketConnect,
        webSocketDisconnect,
        webSocketSend 
    }
}