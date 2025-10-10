$(document).ready(function() {

  //Tira a mensagem de erro do bloco de ejs
  $('input').on('focus', function() {
    $(this).next('.spanErro').remove()
  })

  //Tira a mensagem de erro do bloco de ejs
  $('textarea').on('focus', function() {
    $(this).next('.spanErro').remove()
  })

    // Eventos de validação em tempo real (Ao sair do campo)
    $('#name').on('input', function() {
        validateNome();
    })

    $('#email').on('input', function() {
      validateEmail();
    })

    $('#telefone').on('input', function() {
      aplicarMascaraTelefone();
      validateTel();
    })

    $('#mensagem').on('input', function() {
      validateMess();
    })

    $('#msg').on('submit', function (e) {
        e.preventDefault(); // Impede envio padrão do formulário
    
        let isValid = true; // Flag para controlar se formulário está válido
    
        // Executa todas as validações e verifica se alguma falha
        if (!validateNome()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validateTel()) isValid = false;
        if (!validateMess()) isValid = false;
    
        // Se todas validações passaram, exibe mensagem
        if (isValid) {
          alert('Formulário enviado com sucesso!');
          // Aqui você pode enviar os dados para o servidor
          // this.submit();
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

      function aplicarMascaraTelefone() {
        let telefone = $('#telefone').val().replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        let telefoneFormatado = '';
        
        // Limita a 11 dígitos (DDD + 9 dígitos)
        if (telefone.length > 11) {
          telefone = telefone.substring(0, 11);
        }
        
        // Aplica a máscara conforme o tamanho
        if (telefone.length <= 2) {
          telefoneFormatado = telefone;
        } else if (telefone.length <= 7) {
          telefoneFormatado = `(${telefone.substring(0, 2)}) ${telefone.substring(2)}`;
        } else if (telefone.length <= 11) {
          telefoneFormatado = `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)}-${telefone.substring(7)}`;
        }
        
        $('#telefone').val(telefoneFormatado);
      }

      function validateTel() {
        const telefone = $('#telefone').val().trim(); // Obtém valor sem espaços extras
        const telefoneLimpo = telefone.replace(/\D/g, ''); // Remove formatação para validação
        // Regex para telefone brasileiro completo: 10 ou 11 dígitos
        const telRegex = /^[1-9]{2}[0-9]{8,9}$/;
    
        if (telefone === '') {
          showError('telefone', 'Telefone é obrigatório'); // Exibe erro se vazio
          return false;
        } else if (telefoneLimpo.length < 10) {
          showError('telefone', 'Telefone deve ter pelo menos 10 dígitos');
          return false;
        } else if (!telRegex.test(telefoneLimpo)) {
          showError('telefone', 'Telefone inválido. Use o formato: (11) 99999-9999');
          return false;
        } else {
          showSuccess('telefone'); // Marca como válido
          return true;
        }
      }

      function validateMess() {
        const mensagem = $('#mensagem').val().trim(); // Obtém valor sem espaços extras
        const minLength = 10; // Tamanho mínimo da mensagem
        const maxLength = 500; // Tamanho máximo da mensagem
    
        if (mensagem === '') {
          showError('mensagem', 'Mensagem é obrigatória'); // Exibe erro se vazio
          return false;
        } else if (mensagem.length < minLength) {
          showError('mensagem', `Mensagem deve ter pelo menos ${minLength} caracteres`);
          return false;
        } else if (mensagem.length > maxLength) {
          showError('mensagem', `Mensagem deve ter no máximo ${maxLength} caracteres`);
          return false;
        } else {
          showSuccess('mensagem'); // Marca como válido
          return true;
        }
      }

  // Exibe mensagem de erro e aplica estilo visual
  function showError(field, message) {
    $(`#${field}`).addClass('error').removeClass('success'); // Aplica classe de erro
    $(`#${field}-error`).text(message); // Exibe mensagem de erro
  }
  
  // Remove erro e aplica estilo de sucesso
  function showSuccess(field) {
    $(`#${field}`).addClass('sucess').removeClass('error'); // Aplica classe de sucesso
    $(`#${field}-error`).text(''); // Remove mensagem de erro
  }

});