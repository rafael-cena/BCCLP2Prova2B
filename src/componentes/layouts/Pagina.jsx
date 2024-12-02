import { Container } from "react-bootstrap";
import Menu from "./Menu.jsx";

export default function Pagina(props) {
    return (
        <>
            <Container>
                <Menu />
                {props.children}
            </Container>
        </>

    );
}