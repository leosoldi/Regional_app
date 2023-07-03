import styled from "styled-components";
import { MapContainer as MapContainerLeaflet } from "react-leaflet";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  #lat_lgn {
    justify-content: center;
  }
    #selectmap {
    margin-top: 10px;
    margin-bottom: 10px;
    color: #0061a4;
    font-weight: bold;
  }
`;

export const Form = styled.form`
  width: 40vw;
  background-color: ${(props) => props.theme.white};
  padding: 50px;
  margin-top: 40px;
  border-radius: 8px;
  
  @media (max-width: 1024px) {
    width: 70vw;
  }
`;

export const FormTitle = styled.h2`
  color: ${(props) => props.theme.primary};
  font-size: 40px;

  padding-bottom: 30px;
`;

export const MapContainer = styled(MapContainerLeaflet)`
  height: 50vh;

`;

export const Section = styled.p`
  color: ${(props) => props.theme.primary};
  font-size: 20px;
  padding-bottom: 30px;
  padding-top: 30px;
  font-weight: 700;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
`;

export const CategoryBox = styled.div<{ isActive: boolean }>`
  background-color: ${(props) =>
        props.isActive ? props.theme.white : props.theme.background};

  border: ${(props) =>
        props.isActive ? `2px solid ${props.theme.background}` : "none"};

  border-radius: 8px;
  width: 160px;
  height: 160px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 10px;

  &:hover {
    opacity: 0.3;
    cursor: pointer;
  }
`;

export const CategoryImage = styled.img`
  width: 40px;
  height: 40px;
`;

export const ButtonContainer = styled.div`
  text-align: center;
  padding-top: 20px;
  
`;

export const LocationContent = styled.div`
  display: flex;
  gap: 10px;
  
`

export const Button = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
  width: 150px;
  height: 50px;
  border: none;
  border-radius: 5px;
  margin-bottom: 50px;

  &:hover {
    background-color: ${(props) => props.theme.primary}99;
  }
`;

export const AiFillContacts = styled.div`
    font-size: 35px;

`

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