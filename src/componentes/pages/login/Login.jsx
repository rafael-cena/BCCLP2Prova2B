import React, { useContext, useState } from "react"
import { Button, Container, Form } from "react-bootstrap";
import { ContextoUsuario } from "../../../App.js";
import usuarioReducer, { postPassword } from "../../../redux/usuarioReducer.js";
import { useDispatch, useSelector } from "react-redux";
import ESTADO from "../../../redux/estados.js";


export default function Login(props) {
    const { estado, mensagem } = useSelector((state) => state.usuarios);
    const despachante = useDispatch();
    const { setUsuario, usuario } = useContext(ContextoUsuario);
    const [login, setLogin] = useState({
        nickname: "",
        senha: ""
    });

    function handleSubmit() {
        despachante(postPassword(login));
        if (estado === ESTADO.OCIOSO) {
            setUsuario({
                usuario: login.nickname,
                logado: true
            });
            console.log(usuario);
        }
        else {
            alert("Usuario ou senha incorretos");
        }
    }

    function handleLogin(event) {
        const value = event.target.value;
        setLogin({ ...login, 'nickname': value });
    }

    function handlePassword(event) {
        const value = event.target.value;
        setLogin({ ...login, 'senha': value });
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
                        onChange={(event) => handleLogin(event)}
                        placeholder="Informe o Nickname" />
                    <Form.Text className="text-muted">
                        Nunca compartilhe suas credenciais de acesso!
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        id="senha"
                        name="senha"
                        required
                        onChange={(event) => handlePassword(event)}
                        placeholder="Senha" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button> <Button variant="primary" onClick={() => props.setForm(false)}>
                    Cadastre-se
                </Button>
            </Form>
        </Container>
    );
}