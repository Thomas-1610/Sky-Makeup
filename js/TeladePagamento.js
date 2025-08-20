document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos se existirem
    const cartaoDiv = document.querySelector('.cartao');
    const pixDiv = document.querySelector('.pix');
    const dinheiroDiv = document.querySelector('.dinheiro');

    // Agrupa os que existem
    const opcoes = [cartaoDiv, pixDiv, dinheiroDiv].filter(Boolean);

    // Aplica o destaque visual (classe .selected)
    function selecionarOpcao(opcaoSelecionada) {
        opcoes.forEach(opcao => {
            if (opcao === opcaoSelecionada) {
                opcao.classList.add('selected');
            } else {
                opcao.classList.remove('selected');
            }
        });
    }

    // Adiciona evento a cada opção existente
    opcoes.forEach(opcao => {
        opcao.addEventListener('click', () => {
            selecionarOpcao(opcao);
            // O redirecionamento é feito no HTML com onclick
        });
    });
});
