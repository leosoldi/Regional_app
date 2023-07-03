import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("./home-background.svg") no-repeat 700px bottom;
  background-color: ${(props) => props.theme.background};
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  font-size: 54px;
  color: ${(props) => props.theme.primary};
  padding-bottom: 50px;
  text-align: center;

  max-width: 500px;
`;

export const SubTitle = styled.p`
  font-size: 24px;
  padding-bottom: 50px;
  text-align: center;
  max-width: 500px;
`;

export const ButtonBox = styled.div`
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.white};
  height: 50px;
  width: 40px;

  font-size: 30px;

  position: absolute;
  left: 0;
  top: 0;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
  height: 50px;
  border: none;
  border-radius: 5px;

  position: relative;
  padding-left: 50px;

  &:hover {
    filter: opacity(0.9);
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.div`
    width: 100%;
    height: 50px;
    background: #0061a4;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      color: #fff;
      text-decoration: none;
      &:hover {
        cursor: pointer;
        opacity: 0.7;
      }
    }
    
    span {
      color: #fff;
      font-weight: bold;
    }
    

`;


export const Image = styled.img.attrs(() => ({
  src: "https://www.icnex.com.br/wp-content/uploads/2022/05/marketing-digital-encotre.png.webp",
}))`
  width: 50%;
`;

