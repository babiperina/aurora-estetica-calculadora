var totalSemDesconto = 0;

var qtdeMicroLabial = 0;
var qtdeRevitLabial = 0;
var qtdeMicroSobrancelha = 0;
var qtdeDesignSobrancelha = 0;

document.getElementById('qtde-micro-labial').innerText = `${qtdeMicroLabial}`
document.getElementById('qtde-micro-sobrancelha').innerText = `${qtdeMicroSobrancelha}`
document.getElementById('qtde-revit-labial').innerText = `${qtdeRevitLabial}`
document.getElementById('qtde-design-sobrancelha').innerText = `${qtdeDesignSobrancelha}`


const servicos = {
    'Micropigmentação de sobrancelhas': {
        valor: 660,
        desconto_pix: 600,
        desconto_credito_avista: 620,
        desconto_credito_semjuros: 620,
        credito_parcelado_4x: 664,
        credito_parcelado_5x: 675,
        credito_parcelado_6x: 678
    },
    'Micropigmentação labial': {
        valor: 680,
        desconto_pix: 620,
        desconto_credito_avista: 640,
        desconto_credito_semjuros: 640,
        credito_parcelado_4x: 690,
        credito_parcelado_5x: 695,
        credito_parcelado_6x: 795.96
    },
    'Revitalização de lábios': {
        valor: 230,
        desconto_pix: 120,
        desconto_credito_avista: 125,
        desconto_credito_semjuros: 125,
        credito_parcelado_4x: 134,
        credito_parcelado_5x: 135,
        credito_parcelado_6x: 135.96
    },
    'Design de sobrancelhas': {
        valor: 60,
        desconto_pix: 50,
        desconto_credito_avista: 52,
        desconto_credito_semjuros: 52,
        credito_parcelado_4x: 59,
        credito_parcelado_5x: 61,
        credito_parcelado_6x: 63
    }
};

document.getElementById('valor-micro-labial').innerText = `R$ ${(servicos['Micropigmentação labial'].valor).toFixed(2)}`
document.getElementById('valor-micro-sobrancelha').innerText = `R$ ${(servicos['Micropigmentação de sobrancelhas'].valor).toFixed(2)}`
document.getElementById('valor-revit-labial').innerText = `R$ ${(servicos['Revitalização de lábios'].valor).toFixed(2)}`
document.getElementById('valor-design-sobrancelha').innerText = `R$ ${(servicos['Design de sobrancelhas'].valor).toFixed(2)}`


let servicosSelecionados = [];

function adicionarServico(nomeServico) {
    servicosSelecionados.push(nomeServico);
    // exibirServicos();
    // calcularValorFinal();
    if (nomeServico=='Micropigmentação de sobrancelhas') {
        qtdeMicroSobrancelha++;
        document.getElementById('qtde-micro-sobrancelha').innerText = qtdeMicroSobrancelha;
    } else if (nomeServico=='Micropigmentação labial') {
        qtdeMicroLabial++;
        document.getElementById('qtde-micro-labial').innerText = qtdeMicroLabial;
    } else if (nomeServico=='Revitalização de lábios') {
        qtdeRevitLabial++;
        document.getElementById('qtde-revit-labial').innerText = qtdeRevitLabial;
    } else {
        qtdeDesignSobrancelha++;
        document.getElementById('qtde-design-sobrancelha').innerText = qtdeDesignSobrancelha;
    }
    calcularTotal();
}

function removerQtdeServico(nomeServico){
    servicosSelecionados.push(nomeServico);
    if (nomeServico=='Micropigmentação de sobrancelhas') {
        qtdeMicroSobrancelha--;
        document.getElementById('qtde-micro-sobrancelha').innerText = qtdeMicroSobrancelha;
    } else if (nomeServico=='Micropigmentação labial') {
        qtdeMicroLabial--;
        document.getElementById('qtde-micro-labial').innerText = qtdeMicroLabial;
    } else if (nomeServico=='Revitalização de lábios') {
        qtdeRevitLabial--;
        document.getElementById('qtde-revit-labial').innerText = qtdeRevitLabial;
    } else {
        qtdeDesignSobrancelha--;
        document.getElementById('qtde-design-sobrancelha').innerText = qtdeDesignSobrancelha;
    }
    calcularTotal();
}

function calcularTotal() {
   let total = qtdeMicroLabial*servicos['Micropigmentação labial'].valor;
   total+=qtdeMicroSobrancelha*servicos['Micropigmentação de sobrancelhas'].valor;
   total+=qtdeRevitLabial*servicos['Revitalização de lábios'].valor;
   total+=qtdeDesignSobrancelha*servicos['Design de sobrancelhas'].valor;
   totalSemDesconto = total;
   document.getElementById('total').innerText = `Total: R$ ${total.toFixed(2)}`;
   calcularResultado();
}

function calcularResultado() {
    const formaPagamento = document.getElementById('pagamento').value;
    var resultado = "";
    var economizou = 0;
    if (formaPagamento=="pix") {
        let totalPix = qtdeMicroLabial*servicos['Micropigmentação labial'].desconto_pix;
        totalPix+=qtdeMicroSobrancelha*servicos['Micropigmentação de sobrancelhas'].desconto_pix;
        totalPix+=qtdeRevitLabial*servicos['Revitalização de lábios'].desconto_pix;
        totalPix+=qtdeDesignSobrancelha*servicos['Design de sobrancelhas'].desconto_pix;
        economizou = totalSemDesconto - totalPix;
        resultado = `<p>R$ ${totalPix} é o valor final dos serviços selecionado para pagamento via Pix.</br>Desta forma, você irá economizar R$ ${economizou.toFixed(2)}.</p>`;
    } else if (formaPagamento=="credito_avista") {
        let totalCreditoAVista = qtdeMicroLabial*servicos['Micropigmentação labial'].desconto_credito_avista;
        totalCreditoAVista+=qtdeMicroSobrancelha*servicos['Micropigmentação de sobrancelhas'].desconto_credito_avista;
        totalCreditoAVista+=qtdeRevitLabial*servicos['Revitalização de lábios'].desconto_credito_avista;
        totalCreditoAVista+=qtdeDesignSobrancelha*servicos['Design de sobrancelhas'].desconto_credito_avista;
        economizou = totalSemDesconto - totalCreditoAVista;
        resultado = `<p>R$ ${totalCreditoAVista} é o valor final dos serviços selecionado para pagamento no Crédito a vista.</br>Desta forma, você irá economizar R$ ${economizou.toFixed(2)}.</p>`;
    } else if (formaPagamento=="credito_parcelado_sem_juros") {
        let totalCreditoSemJuros = qtdeMicroLabial*servicos['Micropigmentação labial'].desconto_credito_semjuros;
        totalCreditoSemJuros+=qtdeMicroSobrancelha*servicos['Micropigmentação de sobrancelhas'].desconto_credito_semjuros;
        totalCreditoSemJuros+=qtdeRevitLabial*servicos['Revitalização de lábios'].desconto_credito_semjuros;
        totalCreditoSemJuros+=qtdeDesignSobrancelha*servicos['Design de sobrancelhas'].desconto_credito_semjuros;
        economizou = totalSemDesconto - totalCreditoSemJuros;
        resultado = `<p>R$ ${totalCreditoSemJuros} é o valor final dos serviços selecionado para pagamento via no Crédito Parcelado em até 3x (Sem Juros).</br>Desta forma, você irá economizar ${economizou.toFixed(2)}.</p>`;
    } else if (formaPagamento=="credito_parcelado_4x") {
        let totalCredito4x = qtdeMicroLabial*servicos['Micropigmentação labial'].credito_parcelado_4x;
        totalCredito4x+=qtdeMicroSobrancelha*servicos['Micropigmentação de sobrancelhas'].credito_parcelado_4x;
        totalCredito4x+=qtdeRevitLabial*servicos['Revitalização de lábios'].credito_parcelado_4x;
        totalCredito4x+=qtdeDesignSobrancelha*servicos['Design de sobrancelhas'].credito_parcelado_4x;
        economizou = totalSemDesconto - totalCredito4x;
        resultado = `<p>R$ ${totalCredito4x} é o valor final dos serviços selecionado para pagamento no Crédito em 4x (Com Juros).</br>Lembrando que em até 3x no crédito você não paga juros.</p>`;
    } else if (formaPagamento=="credito_parcelado_5x") {
        let totalCredito5x = qtdeMicroLabial*servicos['Micropigmentação labial'].credito_parcelado_5x;
        totalCredito5x+=qtdeMicroSobrancelha*servicos['Micropigmentação de sobrancelhas'].credito_parcelado_5x;
        totalCredito5x+=qtdeRevitLabial*servicos['Revitalização de lábios'].credito_parcelado_5x;
        totalCredito5x+=qtdeDesignSobrancelha*servicos['Design de sobrancelhas'].credito_parcelado_5x;
        economizou = totalSemDesconto - totalCredito5x;
        resultado = `<p>R$ ${totalCredito5x}é o valor final dos serviços selecionado para pagamento no Crédito em 5x (Com Juros).</br>Lembrando que em até 3x no crédito você não paga juros.</p>`;
    } else if (formaPagamento=="credito_parcelado_6x") {
        let totalCredito6x = qtdeMicroLabial*servicos['Micropigmentação labial'].credito_parcelado_6x;
        totalCredito6x+=qtdeMicroSobrancelha*servicos['Micropigmentação de sobrancelhas'].credito_parcelado_6x;
        totalCredito6x+=qtdeRevitLabial*servicos['Revitalização de lábios'].credito_parcelado_6x;
        totalCredito6x+=qtdeDesignSobrancelha*servicos['Design de sobrancelhas'].credito_parcelado_6x;
        economizou = totalSemDesconto - totalCredito6x;
        resultado = `<p>R$ ${totalCredito6x}é o valor final dos serviços selecionado para pagamento no Crédito em 6x (Com Juros).</br>Lembrando que em até 3x no crédito você não paga juros.</p>`;
    } else {
        resultado = `<p>Forma de pagamento inválida.</p>`;
    }
    // document.getElementById('resultado').innerHTML = `<p>Valor final: R$ ${total}. Você economizou R$ ${totalSemDesconto-total}.</p>`;
    document.getElementById('resultado').innerHTML = resultado;
}

function removerServico(index) {
    servicosSelecionados.splice(index, 1);
    exibirServicos();
    calcularValorFinal();
}

function calcularValor(nomeServico) {
    const servico = servicos[nomeServico];
    return servico.valor;
}

function calcularValorFinal() {
    const formaPagamento = document.getElementById('pagamento').value;
    let total = 0;
    servicosSelecionados.forEach(servico => {
        total += calcularValorComDesconto(servico, formaPagamento);
    });
    const desconto = calcularDesconto(formaPagamento, total);
    const valorFinal = total - desconto;
    document.getElementById('resultado').innerHTML = `<p>Valor final: R$ ${total}. Você economizou R$ ${totalSemDesconto-total}.</p>`;
}

function calcularValorComDesconto(nomeServico, formaPagamento) {
    const servico = servicos[nomeServico];
    if (formaPagamento === 'pix') {
        return servico.desconto_pix || servico.valor;
    } else if (formaPagamento === 'credito_avista') {
        return servico.desconto_credito_avista || servico.valor;
    } else if (formaPagamento === 'credito_parcelado') {
        return servico.valor;
    }
}

function calcularDesconto(formaPagamento, total) {
    let desconto = 0;
    if (formaPagamento === 'pix') {
        servicosSelecionados.forEach(servico => {
            const valorOriginal = servicos[servico].valor;
            const valorComDesconto = servicos[servico].desconto_pix || valorOriginal;
            desconto = (valorOriginal - valorComDesconto);
        });
    } else if (formaPagamento === 'credito_avista') {
        servicosSelecionados.forEach(servico => {
            const valorOriginal = servicos[servico].valor;
            const valorComDesconto = servicos[servico].desconto_credito_avista || valorOriginal;
            desconto = (valorOriginal - valorComDesconto);
        });
    }
    return desconto;
}