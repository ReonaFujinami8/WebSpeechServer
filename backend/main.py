from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from module import ConnectionManager

app = FastAPI()
manager = ConnectionManager()

@app.websocket("/ws/transcript")
async def transcription_endpoint(websocket: WebSocket):
    await websocket.accept()
    await manager.register_internal_client(websocket)

    try:
        while True:
            asr_result = await websocket.receive_json()

            print(asr_result)
            await manager.broadcast_external_json(asr_result)
    except WebSocketDisconnect:
        print("Transcript client disconnected")


@app.websocket("/ws/results/{client_id}")
async def result_endpoint(websocket:WebSocket, client_id:int):
    await manager.register_external_client(websocket)
    print(f"Client {client_id} is connected")

    try:
        while True:
            recv = await websocket.receive_text()
            print(f"受信メッセージ：{recv}")
            await manager.send_internal_client(recv)

    except WebSocketDisconnect:
        print(f"Client {client_id} is disconnected")

    finally:
        manager.unregister_external_client(websocket)