import { useDispatch, useSelector } from "react-redux";
import Mensagem from "../../layouts/Mensagem";
import { useContext, useEffect, useState } from "react";
import { getMensagens, postMensagem } from "../../../redux/mensagemReducer";
import ESTADO from "../../../redux/estados";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import Pagina from "../../layouts/Pagina";
import { ContextoUsuario } from "../../../App";

export default function Feed() {
    const { estado, mensagem, listaMensagens } = useSelector((state) => state.mensagens);
    const despachante = useDispatch();

    const {usuario} = useContext(ContextoUsuario);

    const [novaMensagem, setNovaMensagem] = useState({
        usuario: usuario.nickname,
        lida: false,
        mensagem: ""
    });

    useEffect(() => {
        despachante(getMensagens());
    }, []);

    function handleSubmit() {
        despachante(postMensagem(novaMensagem));
        console.log(novaMensagem);
        if (estado === ESTADO.OCIOSO) {
            alert(mensagem)
        }
        else {
            alert(mensagem);
        }
    }

    function manipularMudanca(evento) {
        setNovaMensagem({ ...novaMensagem, mensagem: evento.target.value });
        console.log(novaMensagem.mensagem);
    }

    if (estado === ESTADO.PENDENTE) {
        return <Spinner animation="border" role="status" />
    }
    else if (estado === ESTADO.ERRO) {
        return <Alert variant="warning">{mensagem}</Alert>
    }
    else {
        return (
            <Pagina>
                <Container className="w-75 border p-2">
                    <Form onSubmit={() => handleSubmit()}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                id="mensagem"
                                name="mensagem"
                                required
                                onChange={manipularMudanca}
                                placeholder="Escreva uma nova mensagem..." />
                        </Form.Group>
                        <Button variant="light" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </Container>
                <Container>
                    {
                        listaMensagens.map((msg) =>
                            <Mensagem
                                img={msg.usuario.urlAvatar}
                                nickname={msg.usuario.nickname}
                                mensagem={msg.mensagem}
                                data={msg.dataHora}
                                id={msg.id}
                            />)
                    }
                </Container>
            </Pagina>
        )
    }
}