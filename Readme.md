# WebSpeechServer

WebSpeechServer は、ブラウザの **Web Speech API** を利用した音声認識アプリケーションです。

フロントエンドに React、バックエンドに FastAPI を採用し、WebSocket を通じて音声認識の制御やデータ通信を行います。

また、他のアプリケーションから WebSocket 経由でメッセージを送信することで、音声認識の開始・停止を外部から制御できます。

Docker Compose に対応しており、簡単なコマンドでアプリケーションを起動・停止できます。

## Features

- **音声認識**: Web Speech API を利用したブラウザ上での音声認識
- **React フロントエンド**: 音声認識の操作や結果の表示
- **FastAPI バックエンド**: WebSocket 通信の管理
- **外部アプリケーション連携**: WebSocket 経由で音声認識を開始・停止
- **Docker Compose 対応**: コマンド一つでアプリケーションを起動・停止

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React |
| Speech Recognition | Web Speech API |
| Backend | Python / FastAPI |
| Communication | WebSocket |
| Containerization | Docker |
| Container Orchestration | Docker Compose |

## Architecture

```text
┌──────────────────────────────┐
│      Other Applications      │
│                              │
│  WebSocket Messages          │
│  - START_RECOGNITION         │
│  - STOP_RECOGNITION          │
└──────────────┬───────────────┘
               │
               │ WebSocket
               ▼
┌──────────────────────────────┐
│         FastAPI Server       │
│                              │
│  - WebSocket Communication  │
│  - Message Handling          │
│  - Recognition Control       │
└──────────────┬───────────────┘
               │
               │ WebSocket
               ▼
┌──────────────────────────────┐
│        React Frontend        │
│                              │
│  - Web Speech API             │
│  - Speech Recognition        │
│  - Recognition Result Display│
└──────────────────────────────┘
```

## Requirements

- Docker
- Docker Compose
- Web Speech API に対応したブラウザ

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd WebSpeechServer
```

`<repository-url>` は、実際のリポジトリ URL に置き換えてください。

### 2. Start the Application

以下のコマンドでアプリケーションを起動します。

```bash
docker compose up -d
```

コンテナがバックグラウンドで起動します。

起動状態を確認するには、次のコマンドを実行してください。

```bash
docker compose ps
```

ログを確認する場合は、次のコマンドを使用します。

```bash
docker compose logs -f
```

### 3. Access the Application

コンテナの起動後、ブラウザからフロントエンドにアクセスしてください。

```text
localhost:5173
```

バックエンドから認識結果を受け取る場合は以下のURLに対して、WebSocket通信で接続してください。
```text
ws://localhost:8000/ws/results/1
```

### 4. Stop the Application

以下のコマンドでアプリケーションを停止します。

```bash
docker compose down
```

## WebSocket Communication

WebSpeechServer は、WebSocket を利用して音声認識を制御します。

外部アプリケーションから FastAPI サーバーに制御メッセージを送信することで、音声認識を開始・停止できます。

### Control Messages

| Message | Description |
|---|---|
| `START_RECOGNITION` | 音声認識を開始する |
| `STOP_RECOGNITION` | 音声認識を停止する |

制御メッセージは、WebSocket 経由で文字列として送信します。

### Start Speech Recognition

音声認識を開始するには、次の文字列を送信します。

```text
START_RECOGNITION
```

### Stop Speech Recognition

音声認識を途中で停止するには、次の文字列を送信します。

```text
STOP_RECOGNITION
```

### Example Workflow

1. Docker Compose でアプリケーションを起動する。
2. React フロントエンドをブラウザで開く。
3. 外部アプリケーションから FastAPI サーバーに WebSocket 接続する。
4. `START_RECOGNITION` を送信して音声認識を開始する。
5. 必要に応じて `STOP_RECOGNITION` を送信して音声認識を停止する。

※ WebSocket の接続先や音声認識結果の送信形式は、実際の実装に従います。

## Integration with Other Applications

WebSpeechServer は、外部アプリケーションから WebSocket 経由で制御できます。

WebSocket クライアントを実装できるアプリケーションであれば、音声認識の開始・停止を連携させることができます。

想定される利用例：

- 別のアプリケーションから音声認識を開始する
- 外部システムから音声認識を停止する
- 既存のアプリケーションに音声認識機能を組み込む
- WebSocket を利用した音声認識システムを構築する

外部アプリケーションから接続する場合は、FastAPI サーバーの WebSocket エンドポイントとポート番号を確認してください。

## Project Structure

プロジェクトの構成例を以下に示します。

```text
WebSpeechServer/
├── frontend/           # React frontend
├── backend/            # FastAPI backend
├── compose.yaml        # Docker Compose configuration
└── README.md
```