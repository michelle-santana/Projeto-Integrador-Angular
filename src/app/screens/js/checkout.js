// Variaveis
let inputCep = document.getElementById("cep");
let cepValido = document.getElementById("cep-valido");
let inputCartao = document.getElementById("numero-cartao");
let inputCvv = document.getElementById("cod-cartao");
let inputEndereco = document.getElementById("endereco");
let inputBairro = document.getElementById("bairro");
let inputCidade = document.getElementById("cidade");
let inputValidade = document.getElementById("data-validade");
let inputNumeroRes = document.getElementById("numero-res");
let inputTitular = document.getElementById("nome-titular");
let selectEstado = document.getElementById("sel-estado");
let btnFinalizar = document.getElementById("btn-finalizar");
let divInserirModal = document.getElementById("inserir-modal");
let selectEnvio = document.getElementById("sel-forma-envio");
let data = new Date();

// Pegando a data do sistema e colocando como data minima do input data-validade
inputValidade.min = data.getFullYear() + "-";
inputValidade.min +=  data.getMonth() > 8 ? (data.getMonth() + 1) : "0" + (data.getMonth()+1);

// Usando API do IBGE para preencher o select com todos os estados
const estados = () =>{
    let text = "";
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then((resposta) => {
        return resposta.json();
    }).then((valor) => {
        valor.forEach(estado => {
            text += "<option value='" + estado.sigla +"'>" + estado.sigla +"</option>"
        });
        selectEstado.insertAdjacentHTML("beforeend", text);
    })
}

// Função para verificar se os campos de dados de pagamentos foram preenchidos corretamente
const cartaoValido = () => {
    if(inputCartao.value[0] != "0" && inputCartao.value.length == 19 &&
    inputValidade.value != "" && inputCvv.value != "" && inputCvv.value.length == 3 &&
    inputTitular.value != "" && inputTitular.value.length > 12){
        return true;
    }else{
        return false;
    }
}

// Função que acessa o evento de clique do teclado para permitir somente numeros no CEP
inputCep.onkeypress = (evt) => {
    let evento = evt || window.event;
    let key = evento.keyCode || evento.which;
    key = String.fromCharCode(key);
    //let regex = /^[0-9.,]+$/;
    let regex = /^[0-9]+$/;
    if (!regex.test(key) || inputCep.value.length == 9) {
        evento.returnValue = false;
        if (evento.preventDefault) evento.preventDefault();
    }
    if (inputCep.value.length == 5) {
        inputCep.value += "-";
    }
}

// Função que acessa o evento de soltar o botao no teclado para acessar a API viacep e receber os dados de endereco
inputCep.onkeyup = () => {
    if(inputCep.value.length == 9){
        fetch('https://viacep.com.br/ws/'+inputCep.value.replace(/\-/g, '')+'/json/').then((resposta) =>{
            return resposta.json();
        }).then((valor) => {
            if(valor.erro){
                inputCep.classList.add("is-invalid");
                cepValido.value = false;
            }else{
                inputBairro.value = valor.bairro;
                inputEndereco.value = valor.logradouro;
                inputCidade.value = valor.localidade;
                selectEstado.value = valor.uf;
                cepValido.value = true;
                inputCep.classList.add("is-valid");
            }
        })
    }else{
        cepValido.value = false;
        inputBairro.value = "";
        inputEndereco.value = "";
        inputCidade.value = "";
        selectEstado.value = "";
        inputCep.classList.remove("is-invalid");
        inputCep.classList.remove("is-valid");
    }
}



// Função que acessa o evento do teclado para permitir somente numeros no Cartao
inputCartao.onkeypress = (evt) => {
    let evento = evt || window.event;
    let key = evento.keyCode || evento.which;
    let tamanho = inputCartao.value.length;
    key = String.fromCharCode(key);
    //let regex = /^[0-9.,]+$/;
    let regex = /^[0-9]+$/;
    if (!regex.test(key) || tamanho == 19) {
        evento.returnValue = false;
        if (evento.preventDefault) evento.preventDefault();
    }
    if(tamanho == 4 || tamanho == 9 || tamanho == 14){
        inputCartao.value += " ";
    }
}

// Função que acessa o evento do teclado para permitir somente numeros no CVV
inputCvv.onkeypress = (evt) => {
    let evento = evt || window.event;
    let key = evento.keyCode || evento.which;
    let tamanho = inputCvv.value.length;
    key = String.fromCharCode(key);
    //let regex = /^[0-9.,]+$/;
    let regex = /^[0-9]+$/;
    if (!regex.test(key) || tamanho == 3) {
        evento.returnValue = false;
        if (evento.preventDefault) evento.preventDefault();
    }
}

// Função que acessa o evento do teclado para permitir somente letras e espaço(" ") no nome do titular
inputTitular.onkeypress = (evt) => {
    let evento = evt || window.event;
    let key = evento.keyCode || evento.which;
    key = String.fromCharCode(key);
    //let regex = /^[0-9.,]+$/;
    let regex = /^[a-z ]+$/;
    if (!regex.test(key) || inputTitular.value.length == 25) {
        evento.returnValue = false;
        if (evento.preventDefault) evento.preventDefault();
    }
}

// Função que pega clique no botao FINALIZAR COMPRA
// Função verifica se os dados de entrega foram preenchidos corretamente
// Função chama a função cartaoValido e cpfValido
btnFinalizar.onclick = () =>{
    if(cepValido.value && inputNumeroRes.value > 0 && selectEnvio.value != "" &&
        cartaoValido() && cpfValido()){
            divInserirModal.innerHTML = inserirModalCompra(true);
            $('#modal-finalizar').modal('show');
    }else{
        divInserirModal.innerHTML = inserirModalCompra(false);
        $('#modal-finalizar').modal('show');
    }
}

// chama a função que preenche o select estados
estados();