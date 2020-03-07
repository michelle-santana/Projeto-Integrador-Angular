const inserirModalCompra = (condicao) => {
    if(condicao){
        return `<div class="modal-header">
                    <h5 class="modal-title">Compra realizada com sucesso!</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Compra realizada com sucesso, agradecemos sua compra.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>`
    }
    return `<div class="modal-header">
                    <h5 class="modal-title">Não foi possivel finalizar a compra!</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Compra não finalizada, verifique os dados e os preencha corretamente para prosseguir.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>`
    
}