function carregar() {
    const container = document.querySelector(".container");

    fetch("http://127.0.0.1:4000/api/alunos")
        .then((res) => res.json())
        .then((dados) => {
            let saida = ""
            dados.map((rs) => {
                saida += `
                <div class="card col-3">
                    <img src="./img/images.png" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title"> NOME: ${rs.nomeAluno}</h5>
                <p class="card-text"> CPF: ${rs.cpf}</p>
                <p class="card-text"> IDADE: ${rs.idade}</p>
                <p class="card-text"> TELEFONE: ${rs.telefone}</p>
                <a href="#" class="btn btn-primary" id="atualizar"">Atualizar</a>
                <a href="#" class="btn btn-danger" id="deletar" onclick="deleteUser()">Deletar</a>
                </div>
                </div>
            `
            })
            container.innerHTML = saida;
        })
}

document.body.onload = () => {carregar()}

//Fazer referencia ao botao cadastrar que está na página "index.html"
const btnCadastrar = document.querySelector("#btnCadastrar");
btnCadastrar.onclick = () => {
    if(confirm("Você deseja cadastrar este cliente") == 1){
        fetch("http://127.0.0.1:4000/api/create", {
            method:"POST",
            headers: {
                "accept":"application/json",
                "content-type":"application/json"
            },
            body:JSON.stringify({
                nomeAluno:document.querySelector("#txtNome").value,
                cpf:document.querySelector("#txtCpf").value,
                idade:document.querySelector("#txtIdade").value,
                telefone:document.querySelector("#txtTelefone").value
            })
        })
        .then((res) => res.json())
        .then((dados) => {
            alert(dados);
            document.location.reload();
        })
        .catch((erro) => {  
            console.log(erro)
        })
    }
}

