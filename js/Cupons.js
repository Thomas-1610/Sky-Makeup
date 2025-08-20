document.addEventListener("DOMContentLoaded", () => {
    const cupomInput = document.getElementById("cupomInput");
    const proceedButton = document.getElementById("proceedButton");

    const erroMsg = document.createElement("p");
    erroMsg.id = "cupomError";
    erroMsg.style.color = "red";
    erroMsg.style.marginTop = "10px";
    cupomInput.parentNode.appendChild(erroMsg);

    // Valor fixo do pedido (altere se for dinâmico)
    const valorOriginal = 100.00;

    cupomInput.addEventListener("input", () => {
        cupomInput.value = cupomInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
        validarCupom();
    });

    function validarCupom() {
        const valor = cupomInput.value;
        const letras = valor.replace(/[^A-Z]/g, "").length;
        const numeros = valor.replace(/[^0-9]/g, "").length;

        if (valor.length === 8 && letras === 4 && numeros === 4) {
            proceedButton.style.display = "inline-block";
            erroMsg.textContent = "";
        } else {
            proceedButton.style.display = "none";
            erroMsg.textContent = "O cupom deve conter 4 letras e 4 números.";
        }
    }

    document.querySelectorAll('.tecla').forEach(botao => {
        botao.addEventListener('click', () => {
            const valor = botao.textContent.toUpperCase();
            let texto = cupomInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "");

            if (botao.classList.contains("apagar")) {
                texto = texto.slice(0, -1);
            } else if (botao.classList.contains("limpar")) {
                texto = "";
            } else if (texto.length < 8) {
                texto += valor;
            }

            cupomInput.value = texto;
            cupomInput.dispatchEvent(new Event("input"));
        });
    });

    proceedButton.addEventListener("click", () => {
        const valorCupom = cupomInput.value;
        const letras = valorCupom.replace(/[^A-Z]/g, "").length;
        const numeros = valorCupom.replace(/[^0-9]/g, "").length;

        if (valorCupom.length === 8 && letras === 4 && numeros === 4) {
            const desconto = valorOriginal * 0.10;
            const valorComDesconto = (valorOriginal - desconto).toFixed(2);

            sessionStorage.setItem("cupomUsado", valorCupom);
            sessionStorage.setItem("valorComDesconto", valorComDesconto);
            sessionStorage.setItem("valorOriginal", valorOriginal.toFixed(2));
        }
    });
});