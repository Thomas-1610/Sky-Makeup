document.addEventListener("DOMContentLoaded", () => {
    const senhaInput = document.getElementById("senhaInput");
    const proceedButton = document.getElementById("proceedButton");

    senhaInput.addEventListener("input", () => {
        const senha = senhaInput.value;
        if (senha.length === 4) {
            proceedButton.style.display = "inline-block";
        } else {
            proceedButton.style.display = "none";
        }
    });

    proceedButton.addEventListener("click", () => {
        let tentativas = parseInt(localStorage.getItem("tentativasSenha") || "0");

        // Aumenta o número de tentativas
        tentativas++;
        localStorage.setItem("tentativasSenha", tentativas);

        // Adiciona delay de 4 segundos antes de redirecionar
        proceedButton.disabled = true;
        proceedButton.textContent = "Processando...";

        setTimeout(() => {
            if (tentativas === 1) {
                window.location.href = "/Home/Negado";
            } else {
                localStorage.removeItem("tentativasSenha"); // reseta
                window.location.href = "/Home/Concluido";
            }
        }, 4000);
    });
});
