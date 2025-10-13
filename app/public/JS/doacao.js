 const botoes = document.querySelectorAll('.btn');
 const campoValor = document.getElementById('valorSelecionado');
 const inputManual = document.getElementById('inputManual');

 botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    // se o botão já estiver ativo, desmarca
    if (botao.classList.contains('ativo')) {
      botao.classList.remove('ativo');
      campoValor.value = '';
    } else {
      // caso contrário, marca o botão clicado e desmarca os outros
      botoes.forEach(b => b.classList.remove('ativo'));
      botao.classList.add('ativo');
      campoValor.value = botao.dataset.valor;
      console.log('Valor selecionado:', campoValor.value);
    }
  });
});

inputManual.addEventListener('input', () => {
  botoes.forEach(b => b.classList.remove('ativo'));
  console.log('Valor manual:', inputManual.value);
});

campoValor.value = '';


  $(document).ready(function() {

    //Tira a mensagem de erro do bloco de ejs
    $('input').on('focus', function() {
      $('.spanErro').remove()
    })

    $('button').on('click', function() {
      $('.spanErro').remove()
    })

    // Filtro de entrada - permite apenas números
    $('#inputManual').on('input', function() {
      let valor = $(this).val();
      
      // Remove todos os caracteres que não são números
      valor = valor.replace(/[^0-9]/g, '');
      
      // Aplica o valor filtrado de volta ao input
      $(this).val(valor);
      
      // Valida o input após a filtragem
      validateInput();
    })

    $('#select').on('submit', function (e) {
      e.preventDefault(); // Impede envio padrão do formulário
  
      let isValid = true; // Flag para controlar se formulário está válido
  
      // Executa todas as validações e verifica se alguma falha
      if (!validateInput()) isValid = false;
  
      // Se todas validações passaram, exibe mensagem
      if (isValid) {
      alert('Formulário enviado com sucesso!');
      // Aqui você pode enviar os dados para o servidor
      // this.submit();
      }
    });

    function validateInput() {
      const inputManual = $('#inputManual').val().trim(); // Obtém valor
      const valorSelecionado = $('#valorSelecionado').val().trim();
      
      // Se tem valor selecionado, não precisa validar input
      if (valorSelecionado !== '') {
        showSuccess('inputManual'); // Marca como válido
        return true;
      }
      
      // Validação do input manual
      if (inputManual === '') {
        showError('inputManual', 'Digite um valor para doação'); // Erro se vazio
        return false;
      }
      
      // Converte para número
      const numero = parseInt(inputManual, 10);
      
      // Verifica se é um número válido
      if (isNaN(numero) || numero <= 0) {
        showError('inputManual', 'Digite um valor válido maior que zero'); // Erro se inválido
        return false;
      }
      
      // Verifica valor mínimo (R$ 1)
      if (numero < 1) {
        showError('inputManual', 'Valor mínimo é R$ 1'); // Erro se muito baixo
        return false;
      }
      
      // Verifica valor máximo (R$ 10.000)
      if (numero > 10000) {
        showError('inputManual', 'Valor máximo é R$ 10.000'); // Erro se muito alto
        return false;
      }
      
      showSuccess('inputManual'); // Marca como válido
      return true;
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
  })