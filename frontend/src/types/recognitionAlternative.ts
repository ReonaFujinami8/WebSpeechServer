/**
 * 音声認識で得られた結果を入れる型
 */
export interface RecognitionAlternative{
    transcript: string; // 認識結果
    confidence: number; // 認識に対する確信度
}