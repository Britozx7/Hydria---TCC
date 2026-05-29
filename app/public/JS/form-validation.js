// Validações e máscaras globais para formulários (emails e campos de cartão)
document.addEventListener('DOMContentLoaded', function() {
    // --- Email: máscara/normalização + validação ---
    function normalizeEmailValue(v) {
        return v.replace(/\s+/g, '').toLowerCase();
    }

    function validateEmailFormat(v) {
        // Regex simples e prática para email
        const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        return re.test(v);
    }

    document.querySelectorAll('input[type="email"]').forEach(function(input) {
        // Normalizar enquanto digita: remover espaços e forçar lowercase
        input.addEventListener('input', function(e) {
            const pos = input.selectionStart;
            const norm = normalizeEmailValue(input.value);
            if (norm !== input.value) {
                input.value = norm;
                try { input.setSelectionRange(pos - 1, pos - 1); } catch (err) {}
            }
        });

        // Validar no blur e adicionar mensagem de erro simples
        input.addEventListener('blur', function() {
            const parent = input.parentElement || input;
            let msgEl = parent.querySelector('.field-error');
            if (!msgEl) {
                msgEl = document.createElement('div');
                msgEl.className = 'field-error';
                msgEl.style.color = '#b00020';
                msgEl.style.fontSize = '0.9rem';
                msgEl.style.marginTop = '6px';
                parent.appendChild(msgEl);
            }

            if (input.value.trim() === '') {
                msgEl.textContent = input.required ? 'Campo obrigatório' : '';
                return;
            }

            if (!validateEmailFormat(input.value)) {
                msgEl.textContent = 'E-mail inválido';
            } else {
                msgEl.textContent = '';
            }
        });
    });

    // --- Máscaras para campos de cartão presentes nas páginas de pagamento ---
    function maskCardNumber(e) {
        let v = e.target.value.replace(/\D/g, '').substring(0, 16);
        let out = '';
        for (let i = 0; i < v.length; i++) {
            if (i > 0 && i % 4 === 0) out += ' ';
            out += v[i];
        }
        e.target.value = out;
    }

    function maskExpiry(e) {
        let v = e.target.value.replace(/\D/g, '').substring(0,4);
        if (v.length >= 3) {
            v = v.substring(0,2) + '/' + v.substring(2);
        }
        e.target.value = v;
    }

    function maskCVV(e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0,4);
    }

    const cardNum = document.getElementById('card-num') || document.getElementById('card-number') || document.getElementById('card-number-input');
    if (cardNum) cardNum.addEventListener('input', maskCardNumber);
    const expiry = document.getElementById('expiry');
    if (expiry) expiry.addEventListener('input', maskExpiry);
    const cvv = document.getElementById('cvv');
    if (cvv) cvv.addEventListener('input', maskCVV);

    // Prevent form submission if email fields invalid across the document
    document.querySelectorAll('form').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            let invalidEmail = false;
            document.querySelectorAll('input[type="email"]').forEach(function(input) {
                if (input.required || input.value.trim() !== '') {
                    if (!validateEmailFormat(input.value.trim())) {
                        invalidEmail = true;
                        input.dispatchEvent(new Event('blur'));
                    }
                }
            });
            if (invalidEmail) {
                e.preventDefault();
                e.stopPropagation();
                alert('Por favor verifique os campos de e-mail.');
            }
        });
    });
});
