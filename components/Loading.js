
import styled from '@emotion/styled';
import { Circle } from 'better-react-spinkit';
import Image from 'next/image'
function Loading() {
  return (
    <Container>
        <Container2>
            <Image
            src="/dept-logo.png"
            alt="Loading..."
            height={230}
            width={230}
            />
            <Container3><Circle size={70} color={'white'} /></Container3>
            
            
        </Container2>
      
    </Container>
  )
}

export default Loading
const Container = styled.div`

height: 100vh;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
//background-image: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%); 
background-image: url('/bg1.jpg');
`;
const Container2 = styled.div`

height: 100vh;
width: 100%;
display: flex;
padding: 100px;
flex-direction: column;
align-items: center;
//background-image: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%); 
background-image: url('/bg1.jpg');
`;

const Container3 = styled.div`
padding: 50px;
`;