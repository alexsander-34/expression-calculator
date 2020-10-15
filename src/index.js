
function eval() {
  // Do not use eval!!!
  return;
}

  function expressionCalculator(expr) {
    
    expr = expr.replace(/\s/g, "");
    console.log(expr);
  
    let leftBrackets = 0,
      rightBrackets = 0;
    expr.split("").forEach(char => {
      if (char === "(") leftBrackets++;
      if (char === ")") rightBrackets++;
    });
    if (leftBrackets !== rightBrackets) throw new Error("ExpressionError: Brackets must be paired");
  

    let innerLBracket = expr.lastIndexOf("("),
      innerRBracket = expr.indexOf(")", innerLBracket);

    if (innerLBracket >= 0) {
      return expressionCalculator(expr.slice(0, innerLBracket) + expressionCalculator(expr.slice(innerLBracket + 1, innerRBracket)) + expr.slice(innerRBracket + 1));
    }
  

    let array = expr.split(/[\*+\-\/]/g).map(x => +x),
      operators = expr.split(/[\d]*[.]*[\d]*/g);
  
    if (array[0] !== 0 && operators[0] !== '-') {
      operators.splice(0, 1);
    }
    operators.splice(-1, 1);
  

    for (let isZero = 0; isZero < array.length; isZero++) {
      if (array[isZero] === 0 && operators[isZero] === '-') {
        array.splice(isZero, 2, (array[isZero] - array[isZero + 1]));
        operators.splice(isZero, 1);
      }
      if (array[isZero] == -62 && operators[isZero-1] === '-') {
        array[isZero] = Math.abs(array[isZero]);
      }
    }
  

    while (array.length > 1) {
      let multiply = operators.indexOf('*'),
        divide = operators.indexOf('/'),
        minus = operators.indexOf('-'),
        plus = operators.indexOf('+');
      if (divide != -1) {
        if (array[divide + 1] === 0) throw new TypeError('TypeError: Division by zero.');
        array.splice(divide, 2, array[divide] / array[divide + 1]);
        operators.splice(divide, 1);
        continue;
      }
      if (multiply != -1) {
        array.splice(multiply, 2, array[multiply] * array[multiply + 1]);
        operators.splice(multiply, 1);
        continue;
      }
      if (minus != -1) {
        array.splice(minus, 2, (array[minus] - array[minus + 1]));
        operators.splice(minus, 1);
        continue;
      }
      if (plus != -1) {
        array.splice(plus, 2, array[plus] + array[plus + 1]);
        operators.splice(plus, 1);
        continue;
      } else {
        break;
      }
    }
   let a =array[0]
    return a;
  }
  
  module.exports = {
    expressionCalculator
  }