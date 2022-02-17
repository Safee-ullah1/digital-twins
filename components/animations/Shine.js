import { keyframes, css } from "@emotion/react";

const slide = keyframes`
0% {transform:translateX(-100%);}
	100% {transform:translateX(400%);}
`;

const Shine = css`
  position: relative;
  overflow: hidden;
  &::after {
    content:'';
    top:0;
    left:-50%;
	  width:50%;
    overflow: hidden;
    height: 100%;
	  position: absolute;
	  z-index:100;
    background-image: linear-gradient(270deg, rgb(180, 180, 180, 0.2) 0%, 
      rgb(245, 245, 245, 0.8) 30%,
      rgb(245, 245, 245, 0.8) 70%,
      rgb(180, 180, 180, 0.2) 100%);
  }
  &:hover {  
    ::after {
      animation: ${slide} 400ms ease-out ;
    }
  }
`;

export default Shine;

