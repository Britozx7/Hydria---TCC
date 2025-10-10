document.addEventListener('DOMContentLoaded', () => {
            const loginTab = document.getElementById('login-tab');
            const signupTab = document.getElementById('signup-tab');
            const loginForm = document.getElementById('login-form');
            const signupForm = document.getElementById('signup-form');

            loginTab.addEventListener('click', () => {
                loginTab.classList.add('active');
                signupTab.classList.remove('active');
                loginForm.classList.add('active');
                signupForm.classList.remove('active');
            });

            signupTab.addEventListener('click', () => {
                signupTab.classList.add('active');
                loginTab.classList.remove('active');
                signupForm.classList.add('active');
                loginForm.classList.remove('active');
            });
        });

        $(document).ready(function() {

            //Tira a mensagem de erro do bloco de ejs
            $('input').on('focus', function() {
                $(this).next('.spanErro').remove()
            })

            $('#name').on('input', function() {
                validateNome();
            })
        
            $('#email').on('input', function() {
                validateEmail();
            })

            $('#email2').on('input', function() {
                validateEmail2();
            })
            
            $('#password').on('input', function() {
                validatePass();
            })

            $('#password2').on('input', function() {
                validatePass2();
            })


            $('#login-form').on('submit', function (e) {
                e.preventDefault(); // Impede envio padrão do formulário
            
                let isValid = true; // Flag para controlar se formulário está válido
            
                // Executa validações do formulário de login
                if (!validateEmail()) isValid = false;
                if (!validatePass()) isValid = false;
            
                // Se todas validações passaram, envia o formulário
                if (isValid) {
                    // Remove o preventDefault para permitir o envio real
                    $(this).off('submit').submit();
                } else {
                    // Mostra mensagem de erro geral se houver problemas
                    alert('Por favor, corrija os erros antes de enviar o formulário.');
                }
            });

            $('#signup-form').on('submit', function (e) {
                e.preventDefault(); // Impede envio padrão do formulário
            
                let isValid = true; // Flag para controlar se formulário está válido
            
                // Executa todas as validações do formulário de cadastro
                if (!validateNome()) isValid = false;
                if (!validateEmail2()) isValid = false;
                if (!validatePass2()) isValid = false;
            
                // Se todas validações passaram, envia o formulário
                if (isValid) {
                    // Remove o preventDefault para permitir o envio real
                    $(this).off('submit').submit();
                } else {
                    // Mostra mensagem de erro geral se houver problemas
                    alert('Por favor, corrija os erros antes de enviar o formulário.');
                }
            });

            function validateNome() {
                const name = $('#name').val().trim(); // Obtém valor sem espaços extras
                const nameRegex = /^[a-zA-ZÀ-ÿ\s]{5,}$/; // Regex para letras e acentos (mín. 5)
            
                if (name === '') {
                  showError('name', 'Nome é obrigatório'); // Exibe erro se vazio
                  return false;
                } else if (!nameRegex.test(name)) {
                  showError('name', 'Nome deve conter apenas letras e pelo menos 5 caracteres');
                  return false;
                } else {
                  showSuccess('name'); // Marca como válido
                  return true;
                }
            }
        
            function validateEmail() {
                const email = $('#email').val().trim(); // Obtém valor
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
                if (email === '') {
                  showError('email', 'E-mail é obrigatório'); // Erro se vazio
                  return false;
                } else if (!emailRegex.test(email)) {
                  showError('email', 'E-mail inválido'); // Erro se inválido
                  return false;
                } else {
                  showSuccess('email'); // Marca como válido
                  return true;
                }
            }

            function validateEmail2() {
                const email2 = $('#email2').val().trim(); // Obtém valor
                const emailRegex2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
                if (email2 === '') {
                  showError('email2', 'E-mail é obrigatório'); // Erro se vazio
                  return false;
                } else if (!emailRegex2.test(email2)) {
                  showError('email2', 'E-mail inválido'); // Erro se inválido
                  return false;
                } else {
                  showSuccess('email2'); // Marca como válido
                  return true;
                }
            }

            function validatePass() {
                const password = $('#password').val().trim(); // Obtém valor
                
                if (password === '') {
                    showError('password', 'Senha é obrigatória'); // Erro se vazio
                    return false;
                } else if (password.length < 6) {
                    showError('password', 'Senha deve ter pelo menos 6 caracteres'); // Erro se muito curta
                    return false;
                } else {
                    // Verifica força da senha
                    let score = 0;
                    let feedback = [];
                    
                    // Critérios de validação
                    if (password.length >= 8) {
                        score += 1;
                    } else {
                        feedback.push('Use pelo menos 8 caracteres');
                    }
                    
                    if (/[a-z]/.test(password)) {
                        score += 1;
                    } else {
                        feedback.push('Adicione letras minúsculas');
                    }
                    
                    if (/[A-Z]/.test(password)) {
                        score += 1;
                    } else {
                        feedback.push('Adicione letras maiúsculas');
                    }
                    
                    if (/\d/.test(password)) {
                        score += 1;
                    } else {
                        feedback.push('Adicione números');
                    }
                    
                    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
                        score += 1;
                    } else {
                        feedback.push('Adicione caracteres especiais');
                    }
                    
                    // Determina força e aplica estilo visual
                    if (score >= 5) {
                        showSuccess('password'); // Senha forte - sucesso
                        return true;
                    } else if (score >= 3) {
                        showWarning('password', 'Senha média. ' + feedback.join(', ')); // Senha média - erro
                        return false; // NÃO aceita senha média
                    } else {
                        showError('password', 'Senha fraca. ' + feedback.join(', ')); // Senha fraca - erro
                        return false;
                    }
                }
            }

            function validatePass2() {
                const password2 = $('#password2').val().trim(); // Obtém valor
                
                if (password2 === '') {
                    showError('password2', 'Senha é obrigatória'); // Erro se vazio
                    return false;
                } else if (password2.length < 6) {
                    showError('password2', 'Senha deve ter pelo menos 6 caracteres'); // Erro se muito curta
                    return false;
                } else {
                    // Verifica força da senha
                    let score = 0;
                    let feedback = [];
                    
                    // Critérios de validação
                    if (password2.length >= 8) {
                        score += 1;
                    } else {
                        feedback.push('Use pelo menos 8 caracteres');
                    }
                    
                    if (/[a-z]/.test(password2)) {
                        score += 1;
                    } else {
                        feedback.push('Adicione letras minúsculas');
                    }
                    
                    if (/[A-Z]/.test(password2)) {
                        score += 1;
                    } else {
                        feedback.push('Adicione letras maiúsculas');
                    }
                    
                    if (/\d/.test(password2)) {
                        score += 1;
                    } else {
                        feedback.push('Adicione números');
                    }
                    
                    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password2)) {
                        score += 1;
                    } else {
                        feedback.push('Adicione caracteres especiais');
                    }
                    
                    // Determina força e aplica estilo visual
                    if (score >= 5) {
                        showSuccess('password2'); // Senha forte - sucesso
                        return true;
                    } else if (score >= 3) {
                        showWarning('password2', 'Senha média. ' + feedback.join(', ')); // Senha média - erro
                        return false; // NÃO aceita senha média
                    } else {
                        showError('password2', 'Senha fraca. ' + feedback.join(', ')); // Senha fraca - erro
                        return false;
                    }
                }
            }

            // Exibe mensagem de erro e aplica estilo visual
            function showError(field, message) {
                $(`#${field}`).addClass('error').removeClass('success').removeClass('warning'); // Aplica classe de erro
                $(`#${field}-error`).text(message).removeClass('warning'); // Exibe mensagem de erro
            }
            
            // Remove o erro e aplica o estilo de atenção
            function showWarning(field,message) {
                $(`#${field}`).addClass('warning').removeClass('error').removeClass('sucess'); // Aplica classe de atenção
                $(`#${field}-error`).text(message).addClass('warning').removeClass('error'); // Exibe mensagem de erro
            }

            // Remove erro e aplica estilo de sucesso
            function showSuccess(field) {
                $(`#${field}`).addClass('sucess').removeClass('error').removeClass('warning'); // Aplica classe de sucesso
                $(`#${field}-error`).text(''); // Remove mensagem de erro
            }
        });

       