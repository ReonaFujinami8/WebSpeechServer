from fastapi import WebSocket, WebSocketDisconnect

class ConnectionManager:
    def __init__(self):
        self.active_external_connections: list[WebSocket] = []
        self.internal_connection: WebSocket | None = None

    async def register_internal_client(self, webSocket: WebSocket):
        self.internal_connection = webSocket

    async def send_internal_client(self, message):
        if self.internal_connection is None:
            print("接続先の音声認識クライアントを認識できません。")
            return

        await self.internal_connection.send_text(message)

    async def register_external_client(self, webSocket: WebSocket):
        await webSocket.accept()
        self.active_external_connections.append(webSocket)

    def unregister_external_client(self, webSocket:WebSocket):
        self.active_external_connections.remove(webSocket)

    async def broadcast_external_json(self, message):
        disconnected = []

        for connection in list(self.active_external_connections):
            try:
                await connection.send_json(message)
            except(WebSocketDisconnect, RuntimeError):
                disconnected.append(connection)

        for connection in disconnected:
            self.unregister_external_client(connection)