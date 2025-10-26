function telephoneCheck(str) {
  // 1o: verificar se tem caracteres invalidos
  var charValidos = "0123456789()- ";
  for (let i = 0; i < str.length; i++) {
    if (charValidos.indexOf(str[i]) == -1) return false;
  }

  // 2o: checar o numero total de digitos
  // limpa a string, deixando só os digitos (tirando parenteses e hifens)
  var digitos = "";
  for (let i = 0; i < str.length; i++) {
    if ("0123456789".indexOf(str[i]) != -1) {
      digitos += str[i];
    }
  }
  // checa a quantidade de digitos
  if (digitos.length == 11) {
    if (digitos[0] != '1') return false;
  } else if (digitos.length == 10) {
  } else { return false; }

  // 3o: checar se os parênteses estão sendo utilizados corretamente
  // verificar se tem parênteses
  var parentese1 = str.includes('(');
  var parentese2 = str.includes(')');
  if (parentese1 != parentese2) { return false; }

  if (parentese1) { 
    const indexP1 = str.indexOf('(');
    const indexP2 = str.indexOf(')');

    // verifica se tem mais de um par de parentese ou se ) vem antes de (
    if (indexP1 != str.lastIndexOf('(') || indexP2 != str.lastIndexOf(')') || indexP2 < indexP1) {
      return false; 
    }

    // verifica se estão na posição correta
    // (555)
    if (indexP1 == 0 && indexP2 != 4) return false;
    // 1(555)
    if (indexP1 == 1 && (str[0] != '1' || indexP2 != 5)) return false;
    // 1 (555)... ou 1-(555)...
    if (indexP1 == 2 && (str[0] != '1' || indexP2 != 6)) return false;
    // se aparecer no meio do número: false
    if (indexP1 > 2) return false;
  } else {
    if (digitos.length === 10) {

      if (str.length === 10) {
        // formato "5555555555". Já validado. OK.
      } else if (str.length === 12) {
        // formato "XXXsXXXsXXXX"
        var sep1 = str[3];
        var sep2 = str[7];
        if (sep1 !== sep2) return false; // separadores diferentes (ex: 555-555 5555)
        if (sep1 !== ' ' && sep1 !== '-') return false; // separador inválido
      } else { return false; }
      
    } else if (digitos.length === 11) {

      if (str.length !== 14) return false; // comprimento incorreto

      var sep0 = str[1];
      var sep1 = str[5];
      var sep2 = str[9];

      if (sep0 === ' ') { // formato "1 XXXsXXXsXXXX"
        if (sep1 !== sep2) return false; 
        if (sep1 !== ' ' && sep1 !== '-') return false; 
      } else if (sep0 === '-') {
        if (sep1 !== '-' || sep2 !== '-') return false; 
      } else { return false; }
    }
  }

  // 4o: checar se os hifens estão certos
  if (str[0] === '-' || str[str.length - 1] === '-') {
      return false;
  }

  return true;
}

telephoneCheck("555-555-5555");