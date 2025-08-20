console.log("Script modalEdit.js carregado!");
document.addEventListener('DOMContentLoaded', function() {
    const modalEditar = document.getElementById('modalEditarItem');
    const fecharModalEditar = document.querySelector('.fechar-modal-editar');
    const botaoAdicionarEditar = document.querySelector('.modal-btn-confirm');
    const ingredientesPorItem = {
        // Extras (IDs 300-303)
        300: [ // Batata Frita
            { nome: 'Sal', quantidade: 1, preco: 0 },
            { nome: 'Ketchup', quantidade: 1, preco: 0 }
        ],
        301: [ // Batata Cheese
            { nome: 'Queijo Cheddar', quantidade: 1, preco: 3.00 },
            { nome: 'Bacon', quantidade: 1, preco: 3.00 },
            { nome: 'Sal', quantidade: 1, preco: 0 },
            { nome: 'Ketchup', quantidade: 1, preco: 0 }
        ],
        302: [ // Onion Rings
            { nome: 'Anéis de Cebola', quantidade: 1, preco: 15.90 },
            { nome: 'Molho de Queijos', quantidade: 1, preco: 0 },
            { nome: 'Ketchup', quantidade: 1, preco: 0 }
        ],
        303: [ // Nuggets
            // Sem ingredientes editáveis por padrão, pode adicionar se necessário
        ],
        304: [ // Batata Chips
            { nome: 'Sal', quantidade: 1, preco: 0 },
            { nome: 'Ketchup', quantidade: 1, preco: 0 }
        ],
        305: [ // Chips de Batata Doce
            { nome: 'Sal', quantidade: 1, preco: 0 },
            { nome: 'Ketchup', quantidade: 1, preco: 0 }
        ],
        306: [ // Nuggets 5un
            { nome: 'Ketchup', quantidade: 1, preco: 0 }
        ],
        307: [ // Nuggets 10un
            { nome: 'Ketchup', quantidade: 2, preco: 0 }
        ],
        308: [ // Nuggets 20un
            { nome: 'Ketchup', quantidade: 4, preco: 0 }
        ],
        // Sobremesas
        1: [ { nome: 'Calda de Chocolate', quantidade: 0, preco: 2.00 }, { nome: 'Granulado', quantidade: 0, preco: 1.00 } ],
        2: [ { nome: 'Calda de Caramelo', quantidade: 0, preco: 2.00 }, { nome: 'Granulado', quantidade: 0, preco: 1.00 } ],
        3: [ { nome: 'Calda de Chocolate', quantidade: 0, preco: 2.00 }, { nome: 'Granulado', quantidade: 0, preco: 1.00 } ],
        4: [ { nome: 'Calda de Morango', quantidade: 0, preco: 2.00 }, { nome: 'Chantilly', quantidade: 0, preco: 1.50 } ],
        5: [ { nome: 'Pipoca caramelizada extra', quantidade: 0, preco: 2.00 }, { nome: 'Chantilly', quantidade: 0, preco: 1.50 } ],
        6: [ { nome: 'Calda de Chocolate', quantidade: 0, preco: 2.00 }, { nome: 'Chantilly', quantidade: 0, preco: 1.50 } ],
        7: [ { nome: 'Bola de Sorvete', quantidade: 0, preco: 3.00 }, { nome: 'Calda de Chocolate', quantidade: 0, preco: 2.00 } ],
        8: [ { nome: 'Calda de Chocolate', quantidade: 0, preco: 2.00 }, { nome: 'Morango', quantidade: 0, preco: 2.00 }, { nome: 'Chantilly', quantidade: 0, preco: 1.50 } ],
        9: [ { nome: 'Bola de Sorvete', quantidade: 0, preco: 3.00 }, { nome: 'Calda de Chocolate', quantidade: 0, preco: 2.00 } ],
        // Lanches (exemplo do Burguer 404, ID 10)
        10: [
            { nome: 'Queijo cheddar', quantidade: 2, preco: 1.00 },
            { nome: 'Hambúrguer de costela', quantidade: 2, preco: 5.00 },
            { nome: 'Alface', quantidade: 1, preco: 0.30 },
            { nome: 'Cebola', quantidade: 1, preco: 0.20 }
        ],
        // Lanches em promoção
        20: [
            { nome: 'Hambúrguer de costela', quantidade: 1, preco: 5.00 },
            { nome: 'Queijo coalho', quantidade: 1, preco: 1.50 },
            { nome: 'Molho de pimenta', quantidade: 1, preco: 0.50 }
        ],
        21: [
            { nome: 'Hambúrguer de fraldinha', quantidade: 1, preco: 5.50 },
            { nome: 'Queijo', quantidade: 1, preco: 1.00 },
            { nome: 'Alface', quantidade: 1, preco: 0.30 },
            { nome: 'Tomate', quantidade: 1, preco: 0.40 }
        ],
        // Bebidas em promoção
        30: [
            { nome: 'Gelo', quantidade: 1, preco: 0.00 },
            { nome: 'Limão', quantidade: 0, preco: 0.50 }
        ],
        31: [
            { nome: 'Gelo', quantidade: 1, preco: 0.00 },
            { nome: 'Sem açúcar', quantidade: 0, preco: 0.00 }
        ],
        // ... mantenha os outros lanches conforme necessário ...
        11: [ // Full Stack
            { nome: 'Molho de alho', quantidade: 1, preco: 1.50 },
            { nome: 'Hambúrguer de costela', quantidade: 1, preco: 5.00 },
            { nome: 'alface', quantidade: 1, preco: 0.50 },
            { nome: 'tomate', quantidade: 2, preco: 0.50 },
        ],
        12: [ // Looping Frango
            { nome: 'Hambúrguer de frango', quantidade: 3, preco: 7.50 },
            { nome: 'alface', quantidade: 1, preco: 0.50 },
            { nome: 'Molho de alho', quantidade: 1, preco: 0.70 },
            { nome: 'Ketchup', quantidade: 2, preco: 0 }
        ],
        13: [ // Hello Word
            { nome: 'Hambúrguer de fraldinha', quantidade: 1, preco: 5.50 },
            { nome: 'alface', quantidade: 1, preco: 0.50 },
            { nome: 'Queijo', quantidade: 1, preco: 1.00 },
            { nome: 'Picles', quantidade: 1, preco: 0.40 },
            { nome: 'Cebola roxa', quantidade: 1, preco: 0.30 }
        ],
        14: [ // VS Veggie
            { nome: 'Hambúrguer de grão-de-bico', quantidade: 1, preco: 4.00 },
            { nome: 'Abobrinha', quantidade: 1, preco: 0.50 },
            { nome: 'Berinjela', quantidade: 1, preco: 0.50 },
            { nome: 'Molho de iogurte', quantidade: 1, preco: 0.70 }
        ],
        15: [ // Backend
            { nome: 'Hambúrguer de frango', quantidade: 1, preco: 5.00 },
            { nome: 'Molho Barbecue', quantidade: 1, preco: 0.50 },
            { nome: 'Alface', quantidade: 1, preco: 0.30 }
        ],
        16: [ // Frontend
            { nome: 'Hambúrguer de costela', quantidade: 2, preco: 10.00 },
            { nome: 'Queijo cheddar', quantidade: 2, preco: 2.00 },
            { nome: 'Bacon', quantidade: 1, preco: 2.00 },
            { nome: 'Molho barbecue', quantidade: 1, preco: 0.70 }
        ],
        17: [ // DevOps Bacon
            { nome: 'Hambúrguer de costela', quantidade: 1, preco: 5.00 },
            { nome: 'Queijo', quantidade: 1, preco: 1.00 },
            { nome: 'Bacon', quantidade: 1, preco: 2.00 },
            { nome: 'Alface', quantidade: 1, preco: 0.30 },
            { nome: 'Tomate', quantidade: 2, preco: 0.50 },
            { nome: 'Cebola', quantidade: 1, preco: 0.50 }
        ],
        18: [ // Byte Burguer
            { nome: 'Hambúrguer de costela', quantidade: 1, preco: 5.00 },
            { nome: 'Molho de pimenta', quantidade: 1, preco: 0.50 },
            { nome: 'Alface', quantidade: 1, preco: 0.30 },
            { nome: 'Tomate', quantidade: 1, preco: 0.40 }
        ],
        19: [ // Index Burguer
            { nome: 'Pão de hambúrguer tradicional', quantidade: 1, preco: 0.50 },
            { nome: 'Hambúrguer de fraldinha', quantidade: 1, preco: 5.50 },
            { nome: 'Queijo', quantidade: 1, preco: 1.00 },
            { nome: 'Alface', quantidade: 1, preco: 0.30 },
            { nome: 'Tomate', quantidade: 1, preco: 0.40 }
        ],

        // Bebidas (IDs 200-209)
        200: [ { nome: 'Gelo', quantidade: 1, preco: 0 },  { nome: 'Limão', quantidade: 1, preco: 0.25 }],
        201: [  { nome: 'Gelo', quantidade: 1, preco: 0 },  { nome: 'Limão', quantidade: 1, preco: 0.25 } ],
        202: [  { nome: 'Gelo', quantidade: 1, preco: 0 },  { nome: 'Limão', quantidade: 1, preco: 0.25 } ],
        203: [  { nome: 'Gelo', quantidade: 1, preco: 0 },  { nome: 'Limão', quantidade: 1, preco: 0.25 } ],
        204: [  { nome: 'Gelo', quantidade: 1, preco: 0 },  { nome: 'Limão', quantidade: 1, preco: 0.25 } ],
        205: [  { nome: 'Gelo', quantidade: 1, preco: 0 },  { nome: 'Limão', quantidade: 1, preco: 0.25 } ],
        206: [  { nome: 'Gelo', quantidade: 1, preco: 0 }],
        207: [  { nome: 'Gelo', quantidade: 1, preco: 0 }],
        208: [  { nome: 'Gelo', quantidade: 1, preco: 0 },  { nome: 'Limão', quantidade: 1, preco: 0.25 } ],
        209: [ { nome: 'Gelo', quantidade: 1, preco: 0 },  { nome: 'Limão', quantidade: 1, preco: 0.25 } ],

        // Combos (IDs 310-318) - Geralmente combos não têm ingredientes individuais para adicionar/remover, mas mantive a estrutura.
        310: [ ],
        311: [ ],
        312: [ ],
        313: [ ],
        314: [ ],
        315: [ ],
        316: [ ],
        317: [ ],
        318: [ ],

        // Molhos (IDs 101-108)
        101: [ ],
        102: [ ],
        103: [ ],
        104: [ ],
        105: [ ],
        106: [ ],
        107: [ ],
        108: [ ],
    };

    let currentItemId = null;
    let currentItemBasePrice = 0;
    let editedItem = null; // Variável para armazenar o item editado temporariamente

    window.abrirModalEditar = function(elemento) {
        currentItemId = parseInt(elemento.getAttribute('data-id'));
        const titulo = elemento.querySelector('.pedido-titulo').textContent;
        const imagem = elemento.querySelector('.pedido-imagem').src;
        const precoText = elemento.querySelector('.pedido-preco').textContent;
        currentItemBasePrice = parseFloat(precoText.replace('R$', '').replace(',', '.').trim());
        const descricao = elemento.getAttribute('data-descricao');

        // Cria uma cópia profunda dos ingredientes para edição
        const ingredientesIniciais = ingredientesPorItem[currentItemId] ? JSON.parse(JSON.stringify(ingredientesPorItem[currentItemId])) : [];

        editedItem = {
            id: currentItemId,
            nome: titulo,
            preco: currentItemBasePrice,
            imagem: imagem,
            quantidade: 1,
            ingredientes: ingredientesIniciais // Usa a cópia
        };

        document.querySelector('.modal-editar-titulo').textContent = titulo;
        document.querySelector('.modal-editar-imagem').src = imagem;
        document.querySelector('.modal-editar-preco').textContent = `R$ ${currentItemBasePrice.toFixed(2).replace('.', ',')}`;
        document.querySelector('.modal-editar-descricao').textContent = descricao;

        const lista = document.querySelector('.modal-editar-ingredientes');
        lista.innerHTML = ''; // Limpa a lista antes de preencher

        if (editedItem.ingredientes && editedItem.ingredientes.length > 0) {
            editedItem.ingredientes.forEach(ing => {
                const divIngrediente = document.createElement('div');
                divIngrediente.className = 'modal-editar-ingrediente';
                divIngrediente.innerHTML = `
                    <span class="modal-editar-ingrediente-nome">${ing.nome}</span>
                    <button class="botao-remover-editar">-</button>
                    <span class="modal-editar-ingrediente-quantidade">${ing.quantidade}x</span>
                    <button class="botao-adicionar-editar">+</button>
                `;
                lista.appendChild(divIngrediente);
            });
        } else {
            lista.innerHTML = '<p>Nenhum ingrediente disponível para edição.</p>';
        }
        modalEditar.style.display = 'flex';
    };

    fecharModalEditar.addEventListener('click', function() {
        modalEditar.style.display = 'none';
        editedItem = null; // Descartar alterações se o modal for fechado
    });

    window.addEventListener('click', function(event) {
        if (event.target === modalEditar) {
            modalEditar.style.display = 'none';
            editedItem = null; // Descartar alterações se o modal for fechado
        }
    });

    document.querySelector('.modal-editar-ingredientes').addEventListener('click', function(e) {
        const target = e.target;
        const ingredienteDiv = target.closest('.modal-editar-ingrediente');
        if (!ingredienteDiv) return;

        const quantidadeSpan = ingredienteDiv.querySelector('.modal-editar-ingrediente-quantidade');
        const nomeIngrediente = ingredienteDiv.querySelector('.modal-editar-ingrediente-nome').textContent;
        // Encontra o ingrediente no objeto editedItem.ingredientes
        const ingrediente = editedItem.ingredientes.find(ing => ing.nome === nomeIngrediente);

        if (!ingrediente) return; // Garante que o ingrediente foi encontrado

        let quantidadeAtual = ingrediente.quantidade;

        if (target.classList.contains('botao-adicionar-editar')) {
            quantidadeAtual++;
            editedItem.preco += ingrediente.preco; // Adiciona o custo do ingrediente extra
        } else if (target.classList.contains('botao-remover-editar')) {
            if (quantidadeAtual > 0) {
                quantidadeAtual--;
                editedItem.preco -= ingrediente.preco; // Remove o custo do ingrediente
            }
        }

        ingrediente.quantidade = quantidadeAtual; // Atualiza a quantidade no objeto editado
        quantidadeSpan.textContent = `${quantidadeAtual}x`;
        document.querySelector('.modal-editar-preco').textContent = `R$ ${editedItem.preco.toFixed(2).replace('.', ',')}`;

    });

    botaoAdicionarEditar.addEventListener('click', function() {
        if (editedItem) {
            // Chama a função global adicionarAoCarrinho do modal.js
            // Passa todos os dados do item editado, incluindo os ingredientes e o preço atualizado
            window.adicionarAoCarrinho(
                editedItem.id,
                editedItem.nome,
                editedItem.preco,
                editedItem.imagem,
                editedItem.ingredientes // Passa os ingredientes para o carrinho
            );

            modalEditar.style.display = 'none';
            editedItem = null; // Limpar o item editado após confirmação
        }
    });
});