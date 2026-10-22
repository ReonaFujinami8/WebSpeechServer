/**
 * 音声認識結果全体を入れる型
 */
export interface RecognitionResult{
    alternatives: SpeechRecognitionAlternative[];
    isFinal: boolean;
}