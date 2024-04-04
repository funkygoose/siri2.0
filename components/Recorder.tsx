'use client'
import Image from "next/image"
import activeAssistantIcon from "@/img/active.gif"
import notActiveAssistantIcon from "@/img/noactive.gif"
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

export const mimeType = "audio/webm"
function Recorder({ uploadAudio }: { uploadAudio: (blob: Blob) => void }) {
    const MediaRecorder = useRef<MediaRecorder | null>(null);
    const { pending } = useFormState();
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(false);
    const [recordingStatus, setRecordingStatus] = useState(false);

    useEffect(() => {
        getMicrophonePermission();
    }, []);
    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err: any) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder Api is not supported in your browser")
        }
    }

    const startRecording = async () => {
        if (stream === null || pending) return;

        setRecordingStatus("recording");

        //create a new media recorder instance using the stream
        const media = new MediaRecorder(stream, { mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current = media;

        let localAudioChunks: Blob[] = [];
        MediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;

            localAudioChunks.push(event.data);
        };

        setAudioChunks(localAudioChunks)
    }

    return (
        <div className="flex items-center justify-center text-white">

            {!permission && (
                <button onClick={getMicrophonePermission}>Get Microphone</button>
            )}

            {pending && (

                <Image src={activeAssistantIcon}
                    width={350}
                    height={350}
                    priority
                    alt="Recording"
                    className="grayscale"
                />
            )}
        </div>
    );
}

export default Recorder;