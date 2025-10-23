// Adicionando interatividade aos botões
document.addEventListener('DOMContentLoaded', function () {
    // Elementos das telas
    var screen1 = document.getElementById('screen1');
    var screen2 = document.getElementById('screen2');
    var screen3 = document.getElementById('screen3');
    // Elementos do tipo de doação
    var donationTypes = document.querySelectorAll('.donation-type');
    var donationContents = document.querySelectorAll('.donation-content');
    // Elementos da doação financeira
    var valueOptions = document.querySelectorAll('.value-option');
    var otherValue = document.querySelector('.other-value');
    var customValueInput = document.querySelector('.custom-value-input');
    var valueDisplay = document.querySelector('.value-display');
    var summaryValue = document.querySelector('.summary-value');
    var paymentMethods = document.querySelectorAll('.payment-method');
    var paymentContents = document.querySelectorAll('.payment-content');
    // Elementos da doação de alimentos
    var foodTypes = document.querySelectorAll('.food-type');
    var deliveryOptions = document.querySelectorAll('.delivery-option');
    // Botões de confirmação
    var confirmFinanceira = document.getElementById('confirm-financeira');
    var confirmAlimentos = document.getElementById('confirm-alimentos');
    var finalizarDoacao = document.getElementById('finalizar-doacao');
    var voltarInicio = document.getElementById('voltar-inicio');
    // Variáveis de estado
    var currentDonationType = 'financeira';
    var currentPaymentMethod = 'pix';
    var currentValue = '50';
    // Seleção de tipo de doação
    donationTypes.forEach(function (type) {
        type.addEventListener('click', function () {
            var typeValue = this.getAttribute('data-type');
            if (!typeValue)
                return;
            // Atualizar estado
            currentDonationType = typeValue;
            // Atualizar UI
            donationTypes.forEach(function (t) { return t.classList.remove('active'); });
            this.classList.add('active');
            // Mostrar conteúdo correspondente
            donationContents.forEach(function (content) {
                if (content.id === "".concat(typeValue, "-content")) {
                    content.style.display = 'block';
                }
                else {
                    content.style.display = 'none';
                }
            });
        });
    });
    // Seleção de valor de doação
    valueOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            valueOptions.forEach(function (o) { return o.classList.remove('active'); });
            this.classList.add('active');
            // Atualizar valor
            var value = (this.textContent === null || this.textContent === void 0 ? void 0 : this.textContent.replace('R$ ', '')) || '0';
            currentValue = value;
            updateValueDisplay(value);
            // Esconder input personalizado se estiver visível
            if (customValueInput && otherValue) {
                customValueInput.style.display = 'none';
                otherValue.style.display = 'block';
            }
        });
    });
    // Outro valor
    if (otherValue && customValueInput) {
        otherValue.addEventListener('click', function () {
            otherValue.style.display = 'none';
            customValueInput.style.display = 'block';
            customValueInput.focus();
            customValueInput.value = ''; // Limpar o campo ao abrir
        });
    }
    // Input de valor personalizado
    if (customValueInput) {
        customValueInput.addEventListener('input', function () {
            // Remover tudo que não é número
            var value = this.value.replace(/\D/g, '');
            // Se o valor for vazio, mostrar 0,00
            if (value === '') {
                this.value = 'R$ 0,00';
                currentValue = '0';
                updateValueDisplay('0');
                return;
            }
            // Converter para número e dividir por 100 para ter os centavos
            var numericValue = parseInt(value) / 100;
            // Formatar como moeda brasileira
            var formattedValue = numericValue.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            // Atualizar o input
            this.value = "R$ ".concat(formattedValue);
            // Atualizar o estado (remover pontos de milhar, manter apenas números)
            currentValue = formattedValue.replace('.', '').replace(',', '.');
            // Atualizar display
            updateValueDisplay(formattedValue);
        });
        // Foco no input personalizado - formatação inicial
        customValueInput.addEventListener('focus', function () {
            if (this.value === 'R$ 0,00' || this.value === '') {
                this.value = '';
            }
        });
        // Quando perde o foco, garante que tem um valor válido
        customValueInput.addEventListener('blur', function () {
            if (this.value === '' || this.value === 'R$ ') {
                this.value = 'R$ 0,00';
                currentValue = '0';
                updateValueDisplay('0');
            }
        });
    }
    // Seleção de forma de pagamento
    paymentMethods.forEach(function (method) {
        method.addEventListener('click', function () {
            var methodValue = this.getAttribute('data-method');
            if (!methodValue)
                return;
            // Atualizar estado
            currentPaymentMethod = methodValue;
            // Atualizar UI
            paymentMethods.forEach(function (m) { return m.classList.remove('active'); });
            this.classList.add('active');
            // Mostrar conteúdo correspondente
            paymentContents.forEach(function (content) {
                if (content.id === "".concat(methodValue, "-content")) {
                    content.style.display = 'block';
                }
                else {
                    content.style.display = 'none';
                }
            });
        });
    });
    // Seleção de tipo de alimento
    foodTypes.forEach(function (type) {
        type.addEventListener('click', function () {
            foodTypes.forEach(function (t) { return t.classList.remove('active'); });
            this.classList.add('active');
        });
    });
    // Seleção de opção de entrega
    deliveryOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            deliveryOptions.forEach(function (o) { return o.classList.remove('active'); });
            this.classList.add('active');
        });
    });
    // Confirmar doação financeira
    if (confirmFinanceira && screen1 && screen2) {
        confirmFinanceira.addEventListener('click', function () {
            screen1.style.display = 'none';
            screen2.style.display = 'block';
            // Atualizar valores na tela 2
            var screen2ValueDisplay = document.querySelector('#screen2 .value-display');
            var screen2SummaryValue = document.querySelector('#screen2 .summary-value');
            if (screen2ValueDisplay && screen2SummaryValue) {
                screen2ValueDisplay.textContent = "R$ ".concat(formatForDisplay(currentValue));
                screen2SummaryValue.textContent = "R$ ".concat(formatForDisplay(currentValue));
            }
        });
    }
    // Confirmar doação de alimentos
    if (confirmAlimentos && screen1 && screen3) {
        confirmAlimentos.addEventListener('click', function () {
            var safetyChecked = document.getElementById('safety-guidelines');
            if (!(safetyChecked === null || safetyChecked === void 0 ? void 0 : safetyChecked.checked)) {
                alert('Por favor, confirme que leu e concorda com as Diretrizes de Segurança e Higiene.');
                return;
            }
            screen1.style.display = 'none';
            screen3.style.display = 'block';
        });
    }
    // Finalizar doação
    if (finalizarDoacao) {
        finalizarDoacao.addEventListener('click', function () {
            alert('Doação realizada com sucesso! Obrigado pela sua contribuição.');
            // Aqui você implementaria a lógica de processamento do pagamento
        });
    }
    // Voltar ao início
    if (voltarInicio && screen3 && screen1) {
        voltarInicio.addEventListener('click', function () {
            screen3.style.display = 'none';
            screen1.style.display = 'block';
            // Resetar formulário de alimentos
            var safetyGuidelines = document.getElementById('safety-guidelines');
            if (safetyGuidelines) {
                safetyGuidelines.checked = false;
            }
        });
    }
    // Função para atualizar exibição de valores
    function updateValueDisplay(value) {
        if (valueDisplay && summaryValue) {
            valueDisplay.textContent = "R$ ".concat(formatForDisplay(value));
            summaryValue.textContent = "R$ ".concat(formatForDisplay(value));
        }
    }
    // Função para formatar valor para exibição
    function formatForDisplay(value) {
        // Converter para número
        var numericValue = parseFloat(value);
        return numericValue.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
    // Inicializar display
    updateValueDisplay(currentValue);
});