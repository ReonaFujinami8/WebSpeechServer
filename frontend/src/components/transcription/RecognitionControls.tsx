import type { RecognitionControlsProps } from "../../types/recognitionControlsProps";
import { DEFAULT_WEB_SOCKET_SERVER_URL } from "../../utils/constant";

export function RecognitionControls(
    {
        isListening,
        lang,
        onLangChange,
        webSocketURL,
        onWebSocketURLChange,
        webSocketServerConnectButtonLabel,
        onStart,
        onStop,
        onConnect,
    }: RecognitionControlsProps) {
    return (
        <div className="recognition-controls">
            <div className="control-actions">
                <button
                    className="button button-primary"
                    onClick={onStart}
                    disabled={isListening}
                >
                    開始
                </button>
                <button
                    className="button button-danger"
                    onClick={onStop}
                    disabled={!isListening}
                >
                    終了
                </button>
            </div>

            <div className="connection-settings">
                <div className="form-field language-field">
                    <label htmlFor="recognition-languages">認識言語</label>
                    <select
                        id="recognition-languages"
                        className="form-control"
                        value={lang}
                        onChange={(e) => onLangChange(e.target.value)}
                    >
                        <option value="ja-JP">日本語(ja-JP)</option>
                        <option value="en-US">英語(en-US)</option>
                    </select>
                </div>

                <div className="form-field url-field">
                    <label htmlFor="websocket-url">WebSocket URL</label>
                    <input
                        id="websocket-url"
                        className="form-control"
                        type="text"
                        value={webSocketURL}
                        onChange={(e) => onWebSocketURLChange(e.target.value)}
                        placeholder={DEFAULT_WEB_SOCKET_SERVER_URL}
                    />
                </div>

                <button
                    className="button button-connect"
                    onClick={onConnect}
                >
                    {webSocketServerConnectButtonLabel}
                </button>
            </div>
        </div>
    )
}