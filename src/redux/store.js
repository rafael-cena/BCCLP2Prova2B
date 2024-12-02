import { configureStore } from '@reduxjs/toolkit';
import usuarioReducer from './usuarioReducer';
import mensagemReducer from './mensagemReducer';

const store = configureStore({
    reducer: {
        'usuarios': usuarioReducer,
        'mensagens': mensagemReducer
    },
});

export default store;