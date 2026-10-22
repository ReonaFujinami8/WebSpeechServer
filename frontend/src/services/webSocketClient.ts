export class WebSocketClient {
    private webSocket: WebSocket | null = null;
    private onMessage: (message: string) => void;
    private onOpen: () => void;
    private onClose: () => void;

    constructor(
        onMessage: (message: string) => void,
        onOpen: () => void,
        onClose: () => void
    ) {
        this.onMessage = onMessage;
        this.onOpen = onOpen;
        this.onClose = onClose;
    }

    public connect(url: string) {
        this.webSocket = new WebSocket(url);

        this.webSocket.addEventListener("open", () => {
            this.onOpen();
            console.log(`クライアント：${url}と接続`);
        });

        this.webSocket.addEventListener("error", (e) => {
            console.log(`エラー：${e}`);
        });

        this.webSocket.addEventListener("close", () => {
            this.onClose();
            console.log("サーバーとの接続を終了");
        })

        this.webSocket.addEventListener("message", (e) => {
            this.recv(e.data);
        });
    }

    public disconnect() {
        this.webSocket?.close();
    }

    public send(message: string) {
        if (this.webSocket?.readyState === WebSocket.OPEN) {
            this.webSocket?.send(JSON.stringify(message));
        }
    }

    private recv(message: string) {
        console.log(`受信したメッセージ：${message}`);
        this.onMessage(message);
    }
}