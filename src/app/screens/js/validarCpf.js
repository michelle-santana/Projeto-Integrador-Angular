// Variaveis
let inputCpf = document.getElementById("input-cpf");

// Função que recebe o evento de clique no teclado e só permite numeros no input CPF
inputCpf.onkeypress = (evt) => {
    let evento = evt || window.event;
    let key = evento.keyCode || evento.which;
    key = String.fromCharCode(key);
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9]+$/;
    let tamanho = inputCpf.value.length;
    if (!regex.test(key) || tamanho == 14) {
        evento.returnValue = false;
        if (evento.preventDefault) evento.preventDefault();
    }
    if (tamanho == 3 || tamanho == 7) {
        inputCpf.value += ".";
    }
    if (tamanho == 11) {
        inputCpf.value += "-";
    }
}

// Função que mostra pro usuario se o cpf digitado é valido
inputCpf.onkeyup = () => {
    if(inputCpf.value.length == 14){
        if(!cpfValido()){
            inputCpf.setAttribute("class", "form-control is-invalid")
        }else{
            inputCpf.setAttribute("class", "form-control is-valid")
        }
    }else{
        inputCpf.setAttribute("class", "form-control is-invalid")
    }
}

// Função que verifica se o cpf digitado é válido
const cpfValido = () => {
    let cpf = inputCpf.value.replace(/\.|-/g, '');
    let soma;
    let resto;
    soma = 0;
    if (cpf == "00000000000") return false;

    for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (var i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
}

// Impede a ação de colar no input CPF
inputCpf.onpaste = () => {
    return false;
}