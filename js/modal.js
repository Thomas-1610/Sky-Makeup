// modal.js - Controle do modal do carrinho (versão corrigida)

// Variáveis globais
let carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];

// Função para salvar o carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinhoItens', JSON.stringify(carrinhoItens));
}

// Função para abrir o modal do carrinho
function abrirModalCarrinho() {
    const modal = document.getElementById('modalCarrinho');
    if (modal) {
        modal.classList.add('active');
        atualizarCarrinho();
        document.body.style.overflow = 'hidden';
    }
}

// Função para fechar o modal do carrinho
function fecharModalCarrinho() {
    const modal = document.getElementById('modalCarrinho');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ✅ Atualiza o botão "Continuar"
function atualizarBotaoFinalizar() {
    const botao = document.getElementById("prosseguir");
    if (!botao) return;

    if (carrinhoItens.length > 0) {
        botao.classList.remove("disabled");
        // CORREÇÃO AQUI: Define o href para "Cupons" quando habilitado
        botao.setAttribute("href", "/Home/Cupons"); 
    } else {
        botao.classList.add("disabled");
        // Define o href como '#' quando desabilitado para evitar navegação
        botao.setAttribute("href", "#"); 
    }
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const carrinhoContainer = document.querySelector('.modal-content .modal-grid');
    const totalElement = document.querySelector('.barra-inferior .preco span');
    let total = 0; // Inicializa o total aqui

    if (!carrinhoItens || carrinhoItens.length === 0) {
        if (carrinhoContainer) {
            carrinhoContainer.innerHTML = `
                <div class="carrinho-vazio">
                    <p class="carrinho-vazio-texto">Seu carrinho está vazio</p>
                </div>
            `;
        }
        if (totalElement) totalElement.textContent = 'R$ 0,00';
        atualizarBotaoFinalizar();
        return;
    }

    let htmlItens = '';

    carrinhoItens.forEach(item => {
        total += item.preco * item.quantidade;
        htmlItens += `
            <div class="item-carrinho" data-id="${item.id}">
                <div class="info-item">
                    <img class="img-carrinho" src="${item.imagem}" alt="${item.nome}">
                    <div class="detalhes-item-carrinho">
                        <h3 class="carrinho-titulo-lanche">${item.nome}</h3>
                        <p class="preco-item">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                <div class="controles-item">
                    <button class="botao-remove" onclick="removerItemCarrinho(${item.id})"><h2 class="dell">-</h2></button>
                    <span class="quantidade-item"><h2 class="TituloCarrinho">${item.quantidade}x</h2></span>
                    <button class="botao-adiciona" onclick="adicionarItemCarrinho(${item.id})"><h2 class="add">+</h2></button>
                    <button class="btn-remover-carrinho" onclick="removerTodoItem(${item.id})">
                        <h2 class="X">x</h2>
                    </button>
                </div>
            </div>
        `;
    });

    if (carrinhoContainer) carrinhoContainer.innerHTML = htmlItens;
    if (totalElement) totalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

    salvarCarrinho();
    atualizarBotaoFinalizar();
}

// Adicionar item ao carrinho
function adicionarAoCarrinho(id, nome, preco, imagem, ingredientes = []) { // Adicionado ingredientes
    carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
    const itemExistente = carrinhoItens.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
        // Se for um item que pode ter ingredientes customizados,
        // você pode precisar de uma lógica mais sofisticada para agrupar ou duplicar.
        // Por enquanto, apenas atualiza a quantidade.
    } else {
        carrinhoItens.push({ id, nome, preco, imagem, quantidade: 1, ingredientes });
    }

    salvarCarrinho();
    atualizarCarrinho();
}

// Adicionar quantidade
function adicionarItemCarrinho(id) {
    carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
    const item = carrinhoItens.find(item => item.id === id);
    if (item) {
        item.quantidade += 1;
        salvarCarrinho();
        atualizarCarrinho();
    }
}

// Remover quantidade
function removerItemCarrinho(id) {
    carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
    const itemIndex = carrinhoItens.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        if (carrinhoItens[itemIndex].quantidade > 1) {
            carrinhoItens[itemIndex].quantidade -= 1;
        } else {
            carrinhoItens.splice(itemIndex, 1);
        }
        salvarCarrinho();
        atualizarCarrinho();
    }
}

    document.getElementById('cancelar').addEventListener('click', function(event) {
    event.preventDefault();
    fecharModalCarrinho(); // fecha o modal do carrinho
    });


// Remover item completo
function removerTodoItem(id) {
    carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
    carrinhoItens = carrinhoItens.filter(item => item.id !== id);
    salvarCarrinho();
    atualizarCarrinho();
}

// Limpar carrinho
function limparCarrinho() {
    carrinhoItens = [];
    atualizarCarrinho();
    localStorage.removeItem('carrinhoItens');
}

// DOM carregado
document.addEventListener('DOMContentLoaded', function () {
    // IMPORTANTE: Se você não quer que o carrinho seja limpo a cada recarga, remova esta linha:
    // localStorage.removeItem('carrinhoItens'); 
    // carrinhoItens = []; // e esta também

    const fecharBtn = document.querySelector('.fechar-modal');
    if (fecharBtn) {
        fecharBtn.addEventListener('click', fecharModalCarrinho);
    }

    const modal = document.getElementById('modalCarrinho');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                fecharModalCarrinho();
            }
        });
    }

    // Não é necessário adicionar listeners aqui, pois o modalEdit.js já chama abrirModalEditar
    // document.querySelectorAll('.pedido-item').forEach(item => {
    //     item.addEventListener('click', function () {
    //         const id = parseInt(this.getAttribute('data-id'));
    //         abrirModalEditar(this);
    //     });
    // });

    // Adiciona um listener para o botão "Continuar" para evitar navegação quando desabilitado
  


    atualizarCarrinho(); // Garante que o estado do carrinho e botão sejam carregados ao iniciar
    atualizarBotaoFinalizar();
});

// Atualizar carrinho externamente
window.addEventListener('atualizarCarrinho', function () {
    carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
    atualizarCarrinho();
});

// Expor para escopo global (já feito)
// window.abrirModalCarrinho = abrirModalCarrinho;
// window.fecharModalCarrinho = fecharModalCarrinho;
// window.adicionarAoCarrinho = adicionarAoCarrinho;
// window.adicionarItemCarrinho = adicionarItemCarrinho;
// window.removerItemCarrinho = removerItemCarrinho;
// window.removerTodoItem = removerTodoItem;
// window.limparCarrinho = limparCarrinho;