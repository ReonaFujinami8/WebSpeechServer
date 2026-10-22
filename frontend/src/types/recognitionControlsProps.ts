export interface RecognitionControlsProps {
    isListening: boolean;
    lang: string;
    onLangChange: (lang: string) => void;
    webSocketURL: string;
    onWebSocketURLChange:(url: string) => void;
    webSocketServerConnectButtonLabel: string;
    onStart: () => void;
    onStop: () => void;
    onConnect: () => void;
}