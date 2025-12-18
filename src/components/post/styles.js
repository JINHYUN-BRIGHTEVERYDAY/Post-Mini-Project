import { css } from "@emotion/react";


export const modalLayout = css`
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 500px;

    & > header {
        box-sizing: border-box;
        padding: 10px 20px;
        height: 50px;

        & > h2 {
            margin: 0;
            column: #222222;
            cursor: default;
        }
    }

    & > main {
        box-sizing: border-box;
        padding: 10px 20px;
        flex-grow: 1;
    }

    & > footer {
        display: flex;
        justify-content: flex-end;
        box-sizing: border-box;
        padding: 10px 20px;
        height: 50px;

        & > button {
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            border: none;
            background-color: transparent;
            cursor: pointer;
            font-size: 16px;
        }
    }
`;

export const postButton = css`
    text-shadow: 0 0 15px #000000aa;
`;

export const profileContainer = css`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 10px;
    cursor: default;
`;

export const profileImg = (url) => css`
margin-right: 10px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-image: url(${url});
    background-color: center;
    background-size: cover;
`;

export const contentInputBox = css`
    margin: 10px 0;

    & > textarea {
        box-sizing: border-box;
        outline: none;
        border: 1px solid #cccccc;
        border-radius: 4px;
        padding: 5px 10px;
        width: 100%;
        height: 80px;
        resize: none;
        font-size: 15px;
        color: #222222;
        cursor: pointer;
    }

`;


export const uploadBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border: 1px dashed #cccccc;
    border-radius: 4px;
    cursor: pointer;
    color: #222222;

    & > button {
        margin: 10px 0 0;
        border: none;
        border-radius: 10px;
        padding: 5px 10px;
        cursor: pointer;
    }
`;


export const imageListBox = css`
    display: flex;
    flex-shrink: 0;
    gap: 5px;
    box-sizing: border-box;
    margin-top: 10px;
    border-radius: 4px;
    padding: 5px;
    width: 100%;
    height: 90px;
    background-color: #fafafa;
    overflow-x: auto; // 넘어서면 자동으로 스크롤 발생
    overflow-y: hidden;


    /* &::-webkit-scrollbar {
        display: none;
    }

    &::-webkit-scrollbar-thumb {
        width: 3px;
    } */


`;


export const preview = (url) => css`
    flex-shrink: 0;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    width: 70px;
    height: 70px;
    background-image: url(${url});
    background-position: center;
    background-size: cover;

    &:not(:hover) > div {
        opacity: 0;
    }

    & > div {
        transform: translate(-50%, -50%);
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-radius: 50%;
        color: #ffffff;
        font-size: 20px;
        background-color: #ff6363;
        cursor: pointer;
    }
`;