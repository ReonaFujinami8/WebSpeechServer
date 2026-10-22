import { useRef, useState } from "react";
import type { RecognitionOptions } from "../types/recognitionOption";
import type { RecognitionResult } from "../types/recognitionResult";
import type { RecognitionAlternative } from "../types/recognitionAlternative";

export const useSpeechRecognition = () => {
    const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const shouldContinueRef = useRef(false);

    const startRecognition = (options: RecognitionOptions) => {
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

        if(!SpeechRecognitionAPI){
            console.log("このブラウザは対応していません。");
            return;
        }

        shouldContinueRef.current = true;

        const recognition = new SpeechRecognitionAPI();

        recognition.lang = options.lang;
        recognition.continuous = options.continuous;
        recognition.interimResults = options.interimResults;

        recognition.onresult = (e: SpeechRecognitionEvent) => {
            const latestResult = e.results[e.results.length - 1];

            const alternatives: RecognitionAlternative[] = [];

            for(let i = 0; i< latestResult.length;i++){
                const alternative = latestResult[i];

                alternatives.push({
                    transcript: alternative.transcript,
                    confidence: alternative.confidence
                })
            }
            
            setRecognitionResult({
                alternatives,
                isFinal: latestResult.isFinal
            });
        };

        recognition.onerror = (e) => {
            console.log(`音声認識エラー:${e.error}`);

            if(e.error === "not-allowed" || e.error === "service-not-allowed"){
                shouldContinueRef.current = false;
            }
        };

        recognition.onend = () => {
            if(shouldContinueRef.current){
                window.setTimeout(() => {
                    if(shouldContinueRef.current && recognitionRef.current === recognition){
                        try{
                            recognition.start();
                        }
                        catch(error){
                            console.error("音声認識の再開に失敗:", error);
                        }
                    }
                })
            }
        };

        recognitionRef.current = recognition;
        recognition.start();
    }

    const stopRecognition = () => {
        shouldContinueRef.current = false;
        recognitionRef.current?.stop();
    }

    return {
        recognitionResult,
        startRecognition,
        stopRecognition
    }
}