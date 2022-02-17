import { css } from '@emotion/react';


const GlassContainer = css`
  background: rgb(255,255,255);
  background: -moz-linear-gradient(139deg, rgba(255,255,255,0.6276978417266187) 0%, rgba(255,255,255,0.24424460431654678) 50%, rgba(255,255,255,0) 100%);
  background: -webkit-linear-gradient(139deg, rgba(255,255,255,0.6276978417266187) 0%, rgba(255,255,255,0.24424460431654678) 50%, rgba(255,255,255,0) 100%);
  background: linear-gradient(139deg, rgba(255,255,255,0.6276978417266187) 0%, rgba(255,255,255,0.24424460431654678) 50%, rgba(255,255,255,0) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#ffffff",GradientType=1); 
  //background-image: linear-gradient(120deg, rgba(255,255,255,0.2), rgba(255,255,255,1)); 
  
  box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.12);
  -webkit-box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.12);
  -moz-box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.12);
  border-radius: 20px; 
  border: 1px solid rgba(255,255,255,0.2); 
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

export default GlassContainer;

