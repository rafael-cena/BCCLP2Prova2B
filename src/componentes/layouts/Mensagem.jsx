import { Button, Col, Container, Row } from "react-bootstrap";
import apagar from '../../assets/icons/apagar.svg';
import { useDispatch, useSelector } from "react-redux";
import { deleteMensagem } from "../../redux/mensagemReducer";

export default function Mensagem(props) {
    const { estado } = useSelector((state) => state.mensagens);
    const despachante = useDispatch();

    function handleDelete(id) {
        const dataAtual = new Date;
        dataAtual.setHours(dataAtual.getHours() + 3);
        const mensagem = {
            id: id
        }
        despachante(deleteMensagem(mensagem));
    }

    return (
        <Container className="w-75 border p-2">
            <Row>
                <Col md={1}>
                    <img src={props.img} style={{ width: '30px' }} />
                </Col>
                <Col md={6}>
                    <div style={{ fontSize: "12px", fontWeight: "bold", fontFamily: "monospace" }}>{props.nickname}</div>
                </Col>
            </Row>
            <Col md={12}>
                <div style={{ fontSize: "14px", fontFamily: "sans-serif" }}>{props.mensagem}</div>
            </Col>
            <Row>
                <Col md={2}>
                    <div style={{ fontSize: "10px", fontFamily: "monospace" }}>{props.data}</div>
                </Col>
                <Col md={2}>
                    <Button variant="light" onClick={() => handleDelete(props.id)}>
                        <img src={apagar} style={{ width: '20px' }} />
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}