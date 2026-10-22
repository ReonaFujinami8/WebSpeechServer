import { useEffect, useState } from "react";
import { RecognitionStatus } from "../components/status/RecognitionStatus"
import { RecognitionControls } from "../components/transcription/RecognitionControls"
import { TranscriptPanel } from "../components/transcription/TranscriptPanel";
import { CONNECT_WEB_SOCKET_SERVER, JAPANESE, DEFAULT_RECOGNITION_TEXT, DEFAULT_WEB_SOCKET_SERVER_URL, UNCONNECT_WEB_SOCKET_SERVER as DISCONNECT_WEB_SOCKET_SERVER, START_RECOGNITION, STOP_RECOGNITION } from "../utils/constant";
import { useWebsocket } from "../hooks/useWebsocket";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import type { RecognitionOptions } from "../types/recognitionOption";

export function TranscriptionPage() {
    const [isListening, setIsListening] = useState(false);
    const [lang, setLang] = useState(JAPANESE);
    const [webSocketURL, setWebSocketURL] = useState(DEFAULT_WEB_SOCKET_SERVER_URL)

    const [recognitionResultText, setRecognitionResultText] = useState(DEFAULT_RECOGNITION_TEXT);

    const { isConnected, recvMessage, webSocketConnect, webSocketDisconnect, webSocketSend } = useWebsocket();
    const { recognitionResult, startRecognition, stopRecognition } = useSpeechRecognition();

    const webSocketConnectButtonLabel = isConnected ? DISCONNECT_WEB_SOCKET_SERVER : CONNECT_WEB_SOCKET_SERVER;

    const startTranscription = () => {
        console.log("Start Button Pushed");
        const options: RecognitionOptions = {
            continuous: true,
            interimResults: true,
            lang: lang
        }

        startRecognition(options);
        setIsListening(true);
    }

    const stopTranscription = () => {
        console.log("Stop Button Pushed");
        stopRecognition();
        setRecognitionResultText(DEFAULT_RECOGNITION_TEXT);
        setIsListening(false);
    }

    const webSocketServerConnect = () => {
        console.log("server connected");

        if (webSocketConnectButtonLabel === CONNECT_WEB_SOCKET_SERVER) {
            webSocketConnect(webSocketURL);
        }
        else {
            webSocketDisconnect();
        }
    }

    useEffect(() => {
        if (recvMessage === START_RECOGNITION) {
            startTranscription();
        }
        else if (recvMessage === STOP_RECOGNITION) {
            stopTranscription();
        }
    }, [recvMessage]);

    useEffect(() => {
        if (recognitionResult) {
            console.log(recognitionResult);
            const alternatives = recognitionResult.alternatives;

            setRecognitionResultText(alternatives[0].transcript);
            webSocketSend(recognitionResult);
        }
    }, [recognitionResult])

    return (
        <section className="transcription-page">
            <h2>音声認識</h2>
            <RecognitionStatus />
            <TranscriptPanel
                recognitionResult={recognitionResultText}
            />
            <RecognitionControls
                isListening={isListening}
                lang={lang}
                onLangChange={setLang}
                webSocketURL={webSocketURL}
                onWebSocketURLChange={setWebSocketURL}
                webSocketServerConnectButtonLabel={webSocketConnectButtonLabel}
                onStart={startTranscription}
                onStop={stopTranscription}
                onConnect={webSocketServerConnect}
            />
        </section>
    )
}