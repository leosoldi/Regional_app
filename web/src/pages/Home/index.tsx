import { Container, Title, Button, Image, LeftContainer, RightContainer, SubTitle, ButtonBox, Footer } from './styles';
import { Link } from 'react-router-dom';
import { MdOutlineNotStarted } from 'react-icons/md';
export default function  Home() {

        return <Container>

                    <LeftContainer>
                <Title>Bem-vindo ao cadastro Regional de Serviços e Comércios!!!</Title>
                        <SubTitle>Destaque o seu negócio e supere a concorrência.</SubTitle>
                        <Link to='/new'>
                            <Button>
                        <ButtonBox> <MdOutlineNotStarted /> </ButtonBox>Cadastre agora
                            </Button>
                        </Link>
                    </LeftContainer>

                    <RightContainer>
                        <Image />
                    </RightContainer>
                <Footer>
                <span>©2023. Todos os direitos reservados | Desenvolvido por <a href="#">Leo Soldi</a></span>
                </Footer>
                </Container>;
}
