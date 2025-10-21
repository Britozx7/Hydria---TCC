function togglePasswordVisibility(id, buttonElement) {
    const input = document.getElementById(id);
    const icon = buttonElement.querySelector('.password-toggle-icon');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        buttonElement.setAttribute('aria-label', 'Esconder a senha');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        buttonElement.setAttribute('aria-label', 'Mostrar a senha');
    }
}

// Simulação do botão de SAIR DA CONTA
document.querySelector('.logout-account-btn').addEventListener('click', () => {
     alert('Simulação: Você saiu da conta!');
});