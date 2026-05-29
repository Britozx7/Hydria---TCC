// Validação e máscaras compatíveis com o HTML atual da página de pagamento
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cc-form');
    const cardNumberInput = document.getElementById('card-num');
    const cardOwnerInput = document.getElementById('card-owner');
    const expiryInput = document.getElementById('expiry');
    const cvvInput = document.getElementById('cvv');
    const submitButton = form ? form.querySelector('button[type="submit"]') : null;

    if (!form) return;

    // Máscaras
    cardNumberInput && cardNumberInput.addEventListener('input', function(e) {
        let v = e.target.value.replace(/\D/g, '').substring(0,16);
        let out = '';
        for (let i = 0; i < v.length; i++) {
            if (i > 0 && i % 4 === 0) out += ' ';
            out += v[i];
        }
        e.target.value = out;
    });

    expiryInput && expiryInput.addEventListener('input', function(e) {
        let v = e.target.value.replace(/\D/g, '').substring(0,4);
        if (v.length > 2) v = v.substring(0,2) + '/' + v.substring(2);
        e.target.value = v;
    });

    cvvInput && cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0,4);
    });

    cardOwnerInput && cardOwnerInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').toUpperCase();
    });

    // Submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let errors = [];

        const cardNumber = cardNumberInput ? cardNumberInput.value.replace(/\s/g, '') : '';
        if (!/^[0-9]{16}$/.test(cardNumber) || !validarNumeroCarta(cardNumber)) {
            errors.push('Número do cartão inválido');
        }

        const owner = cardOwnerInput ? cardOwnerInput.value.trim() : '';
        if (owner.length < 3) errors.push('Nome do titular inválido');

        const expiry = expiryInput ? expiryInput.value.trim() : '';
        if (!validarValidade(expiry)) errors.push('Validade inválida ou expirada');

        const cvv = cvvInput ? cvvInput.value.trim() : '';
        if (!/^[0-9]{3,4}$/.test(cvv)) errors.push('CVC/CVV inválido');

        if (errors.length) {
            alert('Verifique os seguintes campos:\n\n' + errors.join('\n'));
            return false;
        }

        // Simula processamento e redireciona para agradecimento
        if (submitButton) {
            const original = submitButton.textContent;
            submitButton.disabled = true;
            let t = 3;
            submitButton.textContent = 'Processando... ' + t;
            const timer = setInterval(function() {
                t -= 1;
                if (t > 0) {
                    submitButton.textContent = 'Processando... ' + t;
                    return;
                }
                clearInterval(timer);
                submitButton.textContent = original;
                window.location.href = '/agradecimento-doacao';
            }, 1000);
        } else {
            window.location.href = '/agradecimento-doacao';
        }
    });
});

/**
 * Valida número do cartão usando o algoritmo de Luhn
 * @param {string} numero - Número do cartão sem espaços
 * @returns {boolean}
 */
function validarNumeroCarta(numero) {
    // Verifica se contém apenas dígitos e tem 16 caracteres
    if (!/^\d{16}$/.test(numero)) {
        return false;
    }

    // Aplica algoritmo de Luhn
    let sum = 0;
    let isEven = false;

    // Percorre de trás para frente
    for (let i = numero.length - 1; i >= 0; i--) {
        let digit = parseInt(numero.charAt(i), 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}

/**
 * Valida data de validade do cartão
 * @param {string} expiry - Validade no formato MM/AA
 * @returns {boolean}
 */
function validarValidade(expiry) {
    // Verifica formato MM/AA
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        return false;
    }

    const parts = expiry.split('/');
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);

    // Valida mês entre 01 e 12
    if (month < 1 || month > 12) {
        return false;
    }

    // Obtém data atual
    const now = new Date();
    const currentYear = now.getFullYear() % 100; // Últimos 2 dígitos do ano atual
    const currentMonth = now.getMonth() + 1;

    // Assume que AA significa 20XX
    const fullYear = 2000 + year;
    const currentFullYear = 2000 + currentYear;

    // Verifica se expirou
    if (fullYear < currentFullYear) {
        return false;
    }

    if (fullYear === currentFullYear && month < currentMonth) {
        return false;
    }

    return true;
}

