 let inputSenha = document.getElementById('input-senha');
 let inputConfirm = document.getElementById('input-confirme-senha');
 let inputEmail = document.getElementById('input-email');
 let inputNome = document.getElementById('input-nome');
 let inputTelefone = document.getElementById('input-numero');
 let inputSenhasIguais = document.getElementById('senhas-iguais');
 let btnCadastrar = document.getElementById('btn-cadastrar');

inputConfirm.addEventListener("keyup", (e) => {
    if (inputConfirm.value != inputSenha.value) {
        inputSenhasIguais.value = false;
        inputConfirm.setAttribute("class", "form-control is-invalid");
    } else {
        inputConfirm.setAttribute("class", "form-control is-valid");
        inputSenhasIguais.value = true;
    }
})

// Função que acessa o evento do teclado para permitir somente letras e espaço(" ") no nome
inputNome.onkeypress = (evt) => {
    let evento = evt || window.event;
    let key = evento.keyCode || evento.which;
    key = String.fromCharCode(key);
    //let regex = /^[0-9.,]+$/;
    let regex = /^[a-z A-Z]+$/;
    if (!regex.test(key) || inputNome.value.length == 35) {
        evento.returnValue = false;
        if (evento.preventDefault) evento.preventDefault();
    }
}

inputTelefone.onkeypress = (evt) => {
    let evento = evt || window.event;
    let key = evento.keyCode || evento.which;
    key = String.fromCharCode(key);
    //var regex = /^[0-9.,]+$/;
    let regex = /^[0-9]+$/;
    let tamanho = inputTelefone.value.length;
    if (!regex.test(key) || tamanho == 15) {
        evento.returnValue = false;
        if (evento.preventDefault) evento.preventDefault();
    }
    if (tamanho == 0) {
        inputTelefone.value += "(";
    }
    if(tamanho == 3){
        inputTelefone.value += ") ";
    }
    if (tamanho == 9) {
        inputTelefone.value += "-";
    }
    if(inputTelefone.value.length == 14){
        inputTelefone.value = inputTelefone.value.substring(0, 9) + inputTelefone.value[10] + "-" + inputTelefone.value.substring(11);
    }
}

btnCadastrar.onclick = () => {
    if(inputSenhasIguais.value == "true" && inputNome.value.length > 12 && inputEmail.value.length > 18 &&
        cpfValido() && inputTelefone.value.length > 13 && inputSenha >= 8 ){
            console.log("Cadatro realizado com sucesso!");
    }else{
        console.log("Não foi possivel realizar o cadastro!");
    }
}