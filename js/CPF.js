document.addEventListener("DOMContentLoaded", () => {
    const cpfInput = document.getElementById("cpfInput");
    const proceedButton = document.getElementById("proceedButton");

    const erroMsg = document.createElement("p");
    erroMsg.id = "cpfError";
    erroMsg.style.color = "red";
    erroMsg.style.marginTop = "10px";
    cpfInput.parentNode.appendChild(erroMsg);

    cpfInput.addEventListener("input", () => {
        let cpf = cpfInput.value.replace(/\D/g, "");

        if (cpf.length > 11) {
            cpf = cpf.slice(0, 11);
        }

        let cpfFormatado = cpf;
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2");
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2");
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        cpfInput.value = cpfFormatado;

        if (cpf.length === 11) {
            if (validarCPF(cpf)) {
                proceedButton.style.display = "block";
                erroMsg.textContent = "";
            } else {
                proceedButton.style.display = "none";
                erroMsg.textContent = "CPF inválido ou inexistente.";
            }
        } else {
            proceedButton.style.display = "none";
            erroMsg.textContent = "";
        }
    });

    function validarCPF(cpf) {
        if (/^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;

        return resto === parseInt(cpf.charAt(10));
    }

    // TECLADO VIRTUAL
    document.querySelectorAll('.tecla').forEach(botao => {
        botao.addEventListener('click', () => {
            const valor = botao.textContent;
            let cpf = cpfInput.value.replace(/\D/g, "");

            if (valor === "←") {
                cpf = cpf.slice(0, -1);
            } else if (valor === "Limpar") {
                cpf = "";
            } else if (cpf.length < 11 && !isNaN(valor)) {
                cpf += valor;
            }

            let cpfFormatado = cpf;
            cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2");
            cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2");
            cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            cpfInput.value = cpfFormatado;

            cpfInput.dispatchEvent(new Event("input"));
        });
    });
});
