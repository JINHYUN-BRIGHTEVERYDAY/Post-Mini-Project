import OpenAI from "openai";
import { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { sendTextopenai } from "../../apis/openai/openaiApi";

function TypingEffect({text, speed = 50}) {
    const [ displayText, setDisplayText ] = useState("");
    const [ isTyping, setTyping ] = useState(true);
    const textIndex = useRef(0);


    useEffect(() => {
        setDisplayText("");
        setTyping(true);

        const timer = setInterval(() => {
            if (textIndex.current < text.length) {
                setDisplayText(displayText + text[textIndex.current]);
                textIndex.current += 1;
            } else {
                setTyping(false);
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer); // 타이머 없애기
    }, [text]);

    return <div>
        {displayText}
        {isTyping && <span>|</span>}
    </div>
}


function OpenaiApiModal()  {
    
    const [ inputValue, setInputValue ] = useState("");
    const [ response, setResponse ] = useState(null);
    const [ isLoading, setLoading ] = useState(false);


    const handleSend = async () => {
        setLoading(true);
        const response = await sendTextopenai(inputValue);
        setResponse(response);
    };

    useEffect(() => {
        if(isLoading) {
            setLoading(false);
        } 
    }, [response]);

    
    return <div>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button onClick={handleSend}>전송</button>
        {
            !isLoading  && !!response &&
            <TypingEffect text={response.output_text} />
        }
        
    </div>

} 


export default OpenaiApiModal;



// function OpenaiApiModal({ isOpen, onRequestClose, layoutRef }) {

//     return <ReactModal
//         style={{
//                 overlay: {
//                     position: "absolute", 
//                     top: 0,
//                     left: 0,
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     backgroundColor: "#00000000"
//                 },
//                 content: {
//                     position: "static", // 가운데 배치
//                     boxShadow: "0 0 10px 5px #00000033",
//                     padding: "0",
//                 }
//             }}
//             isOpen={isOpen} 
//             onRequestClose={onRequestClose}
//             parentSelector={() => layoutRef.current}
//             appElement = {layoutRef.current}
//             ariaHideApp = {false}>
        
//     </ReactModal>
// }

