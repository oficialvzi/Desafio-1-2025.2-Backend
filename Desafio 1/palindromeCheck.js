function palindrome(str) {
  var strNormal = normalizarString(str);
  var strReversa = reverseString(strNormal);
  return strNormal === strReversa;
}

palindrome("Eye");

//transforma a string em minusculo e tira os caracteres que deve ser ignorados
function normalizarString(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

//troca a ordem da string já "tratada"
function reverseString(str) {
  return str.split('').reverse().join('');
}