/**
 * WebSpeechAPIを使用する際のオプション
 */
export interface RecognitionOptions{
    continuous: boolean;   // 音声認識を継続するのか
    interimResults:boolean; // 音声認識の中間結果を取得するのか
    lang:string;           // 認識する対象の言語
}