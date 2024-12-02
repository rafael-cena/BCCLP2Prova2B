import Login from "./Login";
import Cadastro from "./Cadastro";
import { useState } from "react";

export default function TelaLogin () {
    const [form, setForm] = useState(true);

    if (form)
        return <Login setForm={setForm} />
    else 
        return <Cadastro setForm={setForm} />
}