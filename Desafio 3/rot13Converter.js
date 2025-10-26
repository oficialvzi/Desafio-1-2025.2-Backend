function rot13(str) {
  var resultado = "";
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);

    if (charCode >= 65 && charCode <= 122) {
      resultado += String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
    }else {
      resultado += str[i];
    }

  }
  return resultado;
}

rot13("SERR PBQR PNZC");