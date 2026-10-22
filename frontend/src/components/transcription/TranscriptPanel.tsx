import type { RecognitionResultProps } from "../../types/recognitionResultProps";
import { DEFAULT_RECOGNITION_TEXT } from "../../utils/constant";

export function TranscriptPanel({recognitionResult}:RecognitionResultProps) {
    return (
        <section className="transcript-panel">
            <h3>認識結果</h3>
            <div className="transcript-output">
                <p className={recognitionResult === DEFAULT_RECOGNITION_TEXT ? "transcript-placeholder" : "transcript-text"}>
                    {recognitionResult || DEFAULT_RECOGNITION_TEXT}
                </p>
            </div>
        </section>
    )
}