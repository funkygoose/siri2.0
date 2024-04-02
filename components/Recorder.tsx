/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image"
import activeAssistantIcon from "@/img/active.gif"
import notActiveAssistantIcon from "@/img/noactive.gif"


function Recorder({uploadAudio} : {uploadAudio: (blob:Blob) => void}) {
    return (
        <div className="flex items-center justify-center text-white">
            <Image src={activeAssistantIcon}
            width={350}
            height={350}
            priority
            alt="Recording"
            />
        </div>
    )
}

export default Recorder