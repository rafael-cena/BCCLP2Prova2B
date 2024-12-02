import { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Container, Navbar } from 'react-bootstrap';
import { ContextoUsuario } from '../../App.js';
import { Link } from 'react-router-dom';

function Menu() {
    const { usuario, setUsuario } = useContext(ContextoUsuario);

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#" as={Link} to="/">Menu</Navbar.Brand>
                <Navbar.Brand href="#" as={Link} to="/feed">Mensagens</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Brand href="#home">@{usuario.nickname}</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Nav.Link href="/" onClick={
                            () => {
                                setUsuario({
                                    usuario: "",
                                    logado: false
                                });
                            }
                        }>Sair</Nav.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;