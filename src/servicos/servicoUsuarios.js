const urlBase = "https://backend-bcc-2-b.vercel.app/usuario";

export async function gravarUsuario(usuario) {
    const resposta = await fetch(urlBase, {
        'method': "POST",
        'headers': {
            "Content-Type": "application/json"
        },
        'body': JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarUsuario(usuario) {
    const resposta = await fetch(urlBase, {
        'method': "PUT",
        'headers': {
            "Content-Type": "application/json"
        },
        'body': JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function serviceExcluirUsuario(usuario) {
    const resposta = await fetch(urlBase, {
        'method': "DELETE",
        'headers': {
            "Content-Type": "application/json"
        },
        'body': JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarUsuario() {
    const resposta = await fetch(urlBase, {
        'method': "GET",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function verificarSenha(usuario) {
    const resposta = await fetch(urlBase + "/verificarSenha", {
        'method': "POST",
        'headers': {
            "Content-Type": "application/json"
        },
        'body': JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}