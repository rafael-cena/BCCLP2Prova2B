import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { alterarUsuario, consultarUsuario, gravarUsuario, serviceExcluirUsuario, verificarSenha } from "../servicos/servicoUsuarios";

export const getUsuarios = createAsyncThunk('getUsuarios', async () => {

    try {
        const resultado = await consultarUsuario();
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "listaUsuarios": resultado
            }
        }
        else {
            return {
                "status": false,
                "listaUsuarios": []
            }
        }
    }
    catch (e) {
        return {
            "status": false,
            "listaUsuarios": []
        }
    }
});

export const deleteUsuario = createAsyncThunk('deleteUsuario', async (usuario) => {
    try {
        const resultado = await serviceExcluirUsuario(usuario);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "id": usuario.id
        }
    }
    catch (e) {
        return {
            "status": false,
            "mensagem": "Erro: " + e.message
        }
    }
})

export const updateUsuario = createAsyncThunk('updateUsuario', async (usuario) => {
    try {
        const resultado = await alterarUsuario(usuario);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "usuario": usuario
        }
    }
    catch (e) {
        return {
            "status": false,
            "mensagem": "Erro: " + e.message
        }
    }
})

export const postUsuario = createAsyncThunk('postUsuario', async (usuario) => {
    try {
        const resultado = await gravarUsuario(usuario);
        if (resultado.status) {
            usuario.id = resultado.id;
            return {
                "status": true,
                "usuario": usuario,
                "mensagem": "Usuário incluído com sucesso!"
            }
        }
        else
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
            }

    }
    catch (e) {
        return {
            "status": false,
            "mensagem": "Erro: " + e.message
        }
    }
});

export const postPassword = createAsyncThunk('postPassword', async (usuario) => {
    try {
        const resultado = await verificarSenha(usuario);
        return {
            "status": resultado.status,
            "senhaCorreta": resultado.senhaCorreta,
            "mensagem": "Senha verificada com sucesso!"
        }
    }
    catch (e) {
        return {
            "status": false,
            "mensagem": "Erro: "+e.message
        }
    }
})

const usuarioReducer = createSlice({
    name: 'usuario',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaUsuarios: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsuarios.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Processando requisição"
        })
            .addCase(getUsuarios.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = "Requisicao concluida com sucesso";
                    state.listaUsuarios = action.payload?.listaUsuarios;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = "Erro ao processar a requisicao";
                    state.listaUsuarios = action.payload?.listaUsuarios
                }
            })
            .addCase(getUsuarios.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = "Erro ao processar a requisicao (rejeitada)";
                state.listaUsuarios = action.payload?.listaUsuarios;
            })
            .addCase(deleteUsuario.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(deleteUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaUsuarios = state.listaUsuarios.filter((item) => item.id !== action.payload.id);
                }
                else {
                    state.estado = ESTADO.ERRO;
                }
                state.mensagem = action.payload?.mensagem;
            })
            .addCase(deleteUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload?.mensagem;
            })
            .addCase(updateUsuario.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(updateUsuario.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaUsuarios.map((item) => item.id === action.payload.usuario.id ? action.payload.usuario : item);
                }
                else {
                    state.estado = ESTADO.ERRO;
                }
            })
            .addCase(updateUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload?.mensagem;
            })
            .addCase(postUsuario.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(postUsuario.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaUsuarios.push(action.payload?.usuario);
                }
                else {
                    state.estado = ESTADO.ERRO;
                }
            })
            .addCase(postUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload?.mensagem;
            })
            .addCase(postPassword.pending, (state, action) => {
                state.estado=ESTADO.PENDENTE;
                state.mensagem="Processando a requisicao";
            })
            .addCase(postPassword.fulfilled, (state, action) => {
                state.mensagem=action.payload.mensagem;
                if (action.payload.senhaCorreta) {
                    state.estado = ESTADO.OCIOSO;
                }
                else {
                    state.estado = ESTADO.ERRO;
                }
            })
            .addCase(postPassword.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload?.mensagem;
            })
    }
});

export default usuarioReducer.reducer;