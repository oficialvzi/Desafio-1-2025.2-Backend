function checkCashRegister(price, cash, cid) {
  // 1o: valores de cada unidade monetaria em CENTAVOS.
  const valores = [
    ["ONE HUNDRED", 10000],
    ["TWENTY", 2000],
    ["TEN", 1000],
    ["FIVE", 500],
    ["ONE", 100],
    ["QUARTER", 25],
    ["DIME", 10],
    ["NICKEL", 5],
    ["PENNY", 1]
  ];

  // 2o: calcular o troco em centavos (usando o math round paras valores mais precisos)
  var troco = Math.round(cash * 100) - Math.round(price * 100);

  // 3o: ver o total em caixa
  let totalCaixa = 0;
  var cidMap = cid.reduce((acc, [unidade, valor]) => {
    var valorCentavos = Math.round(valor * 100);
    acc[unidade] = valorCentavos;
    totalCaixa += valorCentavos;
    return acc;
  }, {});

  // 3o: soluções para os diferentes casos

  // caso 1: caixa < troco
  if (totalCaixa < troco) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  // caso 2: caixa == troco
  if (totalCaixa === troco) {
    return { status: "CLOSED", change: cid };
  }

  // caso 3: ter que calcular o troco
  var trocoDevido = [];

  for (let [unidade, valorQuantia] of valores) {
    var quantiaDevida = 0; // quantia em centavos a devolver desta unidade

    // enquanto o troco devido for maior ou igual à unidade atual e ainda tiver dessa unidade no caixa
    while (troco >= valorQuantia && cidMap[unidade] > 0) {
      troco -= valorQuantia;
      cidMap[unidade] -= valorQuantia; 
      quantiaDevida += valorQuantia;
    }

    // se demos alguma quantia desta unidade, adicione ao array de troco.
    if (quantiaDevida > 0) {
      // converter para usd
      trocoDevido.push([unidade, quantiaDevida / 100]);
    }
  }

  // se por acaso depois de dar todo o troco ainda faltar alguma coisa, significa que não temos as denominações corretas
  if (troco > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  // se o troco foi dado corretamente
  return { status: "OPEN", change: trocoDevido };
}