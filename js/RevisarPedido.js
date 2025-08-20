function renderizarLanchesRevisao() {
    const carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
    const grid = document.querySelector('.opcao-grid');
    if (!grid) return;

    grid.innerHTML = '';

    let total = 0;

    carrinhoItens.forEach((item, idx) => {
        total += (item.preco || 0) * (item.quantidade || 1);

        const div = document.createElement('div');
        div.className = `C${idx + 1}`;
        div.style.cursor = 'pointer';

        div.innerHTML = `
            <div style="display: flex; align-items: center; width: 100%; height: 100%;">
                <div class="c1">
                    <img class="opcao-imagem" src="${item.imagem}" alt="${item.nome}">
                    <h3 class="opcao-titulo">${item.nome} <span style="font-weight:normal;">x${item.quantidade}</span></h3>
                    <p class="opcao-descricao" style="font-size:1.7vh; color:#555; text-align:center;">${item.descricao || ''}</p>
                    <span class="opcao-preco" style="font-size:2vh; color:#4CAF50; font-weight:500;">R$ ${(item.preco || 0).toFixed(2)}</span>
                </div>
                <button class="btn-excluir-revisao">Excluir</button>
            </div>
        `;

        div.querySelector('.btn-excluir-revisao').onclick = function (e) {
            e.stopPropagation();
            removerItemRevisao(item.id);
        };

        grid.appendChild(div);
    });

    // Total real calculado
    const totalSpan = document.getElementById('totalRevisaoPreco');
    const totalRiscadoSpan = document.getElementById('precoRiscado');
    const cupomInfo = document.getElementById('infoCupom');

    const cupom = sessionStorage.getItem('cupomUsado');

    if (cupom) {
        const desconto = total * 0.10;
        const valorComDesconto = total - desconto;

        totalRiscadoSpan.style.display = 'inline';
        totalRiscadoSpan.textContent = `R$ ${total.toFixed(2)}`;
        totalSpan.textContent = `R$ ${valorComDesconto.toFixed(2)}`;

        if (cupomInfo) {
            cupomInfo.textContent = `Cupom "${cupom}" aplicado: 10% de desconto`;
        }

        // Atualiza sessionStorage com base no valor real
        sessionStorage.setItem("valorOriginal", total.toFixed(2));
        sessionStorage.setItem("valorComDesconto", valorComDesconto.toFixed(2));
    } else {
        // Sem cupom
        totalRiscadoSpan.style.display = 'none';
        totalSpan.textContent = `R$ ${total.toFixed(2)}`;
        if (cupomInfo) {
            cupomInfo.textContent = '';
        }
    }
}

function removerItemRevisao(id) {
    let carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
    carrinhoItens = carrinhoItens.filter(item => item.id !== id);
    localStorage.setItem('carrinhoItens', JSON.stringify(carrinhoItens));
    renderizarLanchesRevisao();

    if (carrinhoItens.length === 0) {
        window.location.href = '/Home/Menu';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    renderizarLanchesRevisao();
});

window.renderizarLanchesRevisao = renderizarLanchesRevisao;