import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { alterarMensagem, consultarMensagem, gravarMensagem, serviceExcluirMensagem } from "../servicos/servicoMensagens";

export const getMensagens = createAsyncThunk('getMensagens', async () => {

    try {
        const resultado = await consultarMensagem();
        if (Array.isArray(resultado.listaMensagens)) {
            return {
                "status": true,
                "listaMensagens": resultado.listaMensagens
            }
        }
        else {
            return {
                "status": false,
                "listaMensagens": []
            }
        }
    }
    catch (e) {
        return {
            "status": false,
            "listaMensagens": []
        }
    }
});

export const deleteMensagem = createAsyncThunk('deleteMensagem', async (mensagem) => {
    try {
        const resultado = await serviceExcluirMensagem(mensagem);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "id": mensagem.id
        }
    }
    catch (e) {
        return {
            "status": false,
            "mensagem": "Erro: " + e.message
        }
    }
})

export const updateMensagem = createAsyncThunk('updateMensagem', async (mensagem) => {
    try {
        const resultado = await alterarMensagem (mensagem);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "mensagemAlt": mensagem
        }
    }
    catch (e) {
        return {
            "status": false,
            "mensagem": "Erro: " + e.message
        }
    }
})

export const postMensagem = createAsyncThunk('postMensagem', async (mensagem) => {
    try {
        const resultado = await gravarMensagem(mensagem);
        if (resultado.status) {
            mensagem.id = resultado.id;
            return {
                "status": true,
                "mensagemNew": mensagem,
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


const mensagemReducer = createSlice({
    name: 'mensagem',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaMensagens: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMensagens.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Processando requisição"
        })
            .addCase(getMensagens.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = "Requisicao concluida com sucesso";
                    state.listaMensagens = action.payload?.listaMensagens;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = "Erro ao processar a requisicao";
                    state.listaMensagens = action.payload?.listaMensagens
                }
            })
            .addCase(getMensagens.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = "Erro ao processar a requisicao (rejeitada)";
                state.listaMensagens = action.payload?.listaMensagens;
            })
            .addCase(deleteMensagem.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(deleteMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaMensagens = state.listaMensagens.filter((item) => item.id !== action.payload.id);
                }
                else {
                    state.estado = ESTADO.ERRO;
                }
                state.mensagem = action.payload?.mensagem;
            })
            .addCase(deleteMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload?.mensagem;
            })
            .addCase(updateMensagem.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(updateMensagem.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaMensagens.map((item) => item.id === action.payload.mensagemAlt.id ? action.payload.mensagemAlt : item);
                }
                else {
                    state.estado = ESTADO.ERRO;
                }
            })
            .addCase(updateMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload?.mensagem;
            })
            .addCase(postMensagem.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(postMensagem.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaMensagens.push(action.payload?.mensagemNew);
                }
                else {
                    state.estado = ESTADO.ERRO;
                }
            })
            .addCase(postMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload?.mensagem;
            })
    }
});

export default mensagemReducer.reducer;