function convertToRoman(num) {
  var romanNumerals = [
    { valor: 1000, letra: 'M' },
    { valor: 900, letra: 'CM' },
    { valor: 500, letra: 'D' },
    { valor: 400, letra: 'CD' },
    { valor: 100, letra: 'C' },
    { valor: 90, letra: 'XC' },
    { valor: 50, letra: 'L' },
    { valor: 40, letra: 'XL' },
    { valor: 10, letra: 'X' },
    { valor: 9, letra: 'IX' },
    { valor: 5, letra: 'V' },
    { valor: 4, letra: 'IV' },
    { valor: 1, letra: 'I' }
  ];

  let numeroRomano = '';

  for (let i = 0; i < romanNumerals.length; i++) {
    while (num >= romanNumerals[i].valor) {
      numeroRomano += romanNumerals[i].letra;
      num -= romanNumerals[i].valor;
    }
  }
  return numeroRomano;
}

convertToRoman(36);