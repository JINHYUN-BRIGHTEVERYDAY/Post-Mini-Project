import { css } from "@emotion/react";
export const layout =css`
    
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    display: flex;
`;

export const frame = css`
    box-sizing: border-box;
    display: flex;
    border: 3px solid #747474;
    height: 650px;
    width: 1000px;
    padding:30px;
    background-color:black;
    border-radius: 30px;
`;
export const frameContainer= css`
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #cac4c4ff;
    overflow: hidden;

    
`;
/////////////////////////////////////////<<  LOADING  >>////////////////////
export const loadingBox = css`
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    z-index: 99;
    justify-content: center;
    align-items: center;
    background-color: #00000066;
`;
/////////////////////////////////////////<<  Leftsidebar  >>////////////////////
export const sideBarLayout = css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;

    
`;
export const sideBarContainer = css`
    width: 200px;
    height: 100%;
    background-color: white;
    flex-direction: column;
    display: flex;

    & > h1{
        margin: 20px;
        font-size: 20px;
        text-align: center;
        text-shadow: 0 0 20px #00000099;
        cursor: default;
        transition: all 0.3s ease-in-out;
        &:hover {
            transform: scale(110%);
        }
    }


    & > ul{
        padding: 0;
        margin: 0;
            list-style-type: none;
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex-grow: 1;
        
        & > a{
            text-decoration: none;
            color: black;
            
          
        }
    }
    & > div {
        display: flex;
        justify-content: center;
        padding: 20px;

        &>a{
            font-weight: 500;
            color:#222222;
            text-decoration: none;
            text-shadow: 0 0 10px #000000;
        }
    }

`;


export const menuListItem = (isSelected) => css`
    width: 100%;
    height: 35px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 5px 15px;
    font-weight: 500;
    transition: all 0.1s ease-in-out;
    
    /* inset 제거 및 문법 수정 */
    text-shadow: ${isSelected ? "0 0 10px #00000066" : "none"};
    
    /* 공백 제거 */
    &:hover {
        text-shadow: 0 0 10px #00000066;
    }

    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px; /* 아이콘 앞 여백 */
        width: 30px;
        height: 100%;
        font-size: 25px;
    }
`;


export const profileImg = (url) => css`
    border-radius: 50%;
    width: 25px;
    height: 25px;
    overflow: hidden;
    background-image: url(${url});
    background-position: center;
    background-size: cover;
`;