document.addEventListener('DOMContentLoaded', () => {
    function gerarCodigoPagamento() {
        const numero = Math.floor(100000 + Math.random() * 900000);
        return `PG-${numero}`;
    }

    const spanCodigo = document.getElementById('codigoPagamento');
    if (spanCodigo) {
        spanCodigo.textContent = gerarCodigoPagamento();
    }
});
