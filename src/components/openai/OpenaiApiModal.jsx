/** @jsxImportSource @emotion/react */
import  * as s  from "./styles";

import OpenAI from "openai";
import { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { sendTextOpenai } from "../../apis/openai/openaiApi";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-Highlight";
import 'highlight.js/styles/github-dark.css';
import {PulseLoader} from "react-spinners";
import { RiChatUploadLine } from "react-icons/ri";
import { MdUpload } from "react-icons/md";


function TypingEffect({text, speed = 50}) {
    const [ displayText, setDisplayText ] = useState("");
    const [ disabled, setdisabled ] = useState(true);
    const textIndex = useRef(0);


    useEffect(() => {
        // setDisplayText("");
        // setTyping(true);

        const textArray = Array.from(text);

        const timer = setInterval(() => {
            if (textIndex.current < text.length) {
                setDisplayText(prev => prev + textArray[textIndex.current++]);
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer); // 타이머 없애기
    }, [text]);

    return <div>
        <ReactMarkdown rehypePlugins={rehypeHighlight}>
           {displayText}
        </ReactMarkdown>
    </div>
}



function OpenaiApiModal() {

    const [ chatData, setChatData ] = useState([]);
    const [ inputValue, setInputValue ] = useState("");
    const [ isLoading, setLoading ] = useState(false);
    const [ disabled, setDisabled ] = useState(true);


    const handleOnKeyDown = (e) => {
        if (!e.shiftKey && e.key === "Enter" && !!e.target.value) {
            handleSend();
        } else if (e.key === "Enter" && !e.target.value.trim()) {
            setInputValue("");
        }
    }


    const handleSend = async () => {
        setLoading(true);
        setChatData(prev => [...prev, {
            type: "question",
            content: inputValue,
        }]);
        setInputValue("");
    }


    useEffect(() => {
        setDisabled(!inputValue.trim());
    }, [inputValue]);

    useEffect(() => {
        if (!!chatData.length && chatData[chatData.length - 1].type === "question") {
            sendTextOpenai(chatData[chatData.length - 1].content)
            .then(resp => {
                setChatData(prev => [...prev, {
                    type: "answer",
                    content: resp.output_text
                }]);
            })
        } else {
            setLoading(false);
        }
    }, [chatData]);

    return <div css={s.layout}>
        <div css={s.chatContainer}>
            {
    chatData.map((data, index) => {
            if (data.type === "question") {
                        return <div key={index} css={s.question}>{data.content}</div>;
                    } else if (index === chatData.length - 1) {
                        return <div key={index} css={s.answer}>
                            {
                                !isLoading && !!data.content &&
                                <TypingEffect text={data.content} speed={10} />  
                            }
                        </div>
                    } else {
                        // 바로 이 부분입니다! return이 없어서 이전 데이터들이 안 보였던 거예요.
                        return <div key={index} css={s.answer}>
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                {data.content}
                            </ReactMarkdown>
                        </div>;
                    }
                })
            }
            {
                isLoading && <PulseLoader/>
            } 
        </div>

    
        <div css={s.inputContainer}> 
            <textarea value={inputValue} onKeyDown={(e) => {if(!e.shiftKey && e.key === "Enter"){e.preventDefault(); handleSend();}}} onChange={(e) =>  setInputValue(e.target.value)}/>
            <button onClick={handleSend} disabled={disabled}><MdUpload/></button>
        </div>

        
    </div>
}

export default OpenaiApiModal;