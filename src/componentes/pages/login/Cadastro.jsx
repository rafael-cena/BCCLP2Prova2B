import React, { useContext, useState } from "react"
import { ContextoUsuario } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import { postUsuario } from "../../../redux/usuarioReducer";
import ESTADO from "../../../redux/estados";
import { Container, Form, Button } from "react-bootstrap";

export default function Cadastro(props) {
    const { estado, mensagem, listaUsuarios } = useSelector((state) => state.usuarios)
    const { usuario, setUsuario } = useContext(ContextoUsuario);
    const despachante = useDispatch();
    const [user, setUser] = useState({
        nickname: "",
        urlAvatar: "",
        senha: ""
    });

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUser({ ...user, [elemento]: valor });
    }

    function handleSubmit() {
        despachante(postUsuario(user));
        if (estado === ESTADO.OCIOSO) {
            console.log(mensagem);
            setUsuario({
                usuario: user.nickname,
                logado: true
            });
        }
        else {
            alert("Usuário ou senha incorretos");
        }
    }

    return (
        <Container className="w-25 border p-2">
            <Form onSubmit={() => handleSubmit()}>
                <Form.Group className="mb-3">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        type="text"
                        id="nickname"
                        name="nickname"
                        required
                        onChange={manipularMudanca}
                        placeholder="Informe o Nickname" />
                    <Form.Text className="text-muted">
                        Nunca compartilhe suas credenciais de acesso!
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Url Avatar</Form.Label>
                    <Form.Control
                        type="text"
                        id="urlAvatar"
                        name="urlAvatar"
                        required
                        onChange={manipularMudanca}
                        placeholder="Informe a url do avatar" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        id="senha"
                        name="senha"
                        required
                        onChange={manipularMudanca}
                        placeholder="Senha" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Cadastrar
                </Button> <Button variant="primary" onClick={() => props.setForm(true)}>
                    Fazer Login
                </Button>
            </Form>
        </Container>
    );
}