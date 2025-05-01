let num1 = '';
let num2 = '';
let symbol = '';
let symbolState = false;
let operation = 0;
let result = 0;
let calc = '';
let pointState = false;

function enterNum(val) {

    let display = document.getElementById("result");

    if(display.innerHTML.length < 9){

        if(!symbolState){
            if(val == '.' && pointState == false){
                num1 = num1 + val;
                display.innerHTML = num1;

                pointState = true;

            }else if(val == '.' && pointState == true){}

            if(val !== '.'){
                num1 = num1 + val;
                display.innerHTML = num1;
            }

            console.log(num1);

        }else{

            if(val == '.' && pointState == false){
                num2 = num2 + val;
                calc = num1 + symbol + num2;
                display.innerHTML = num2;

                pointState = true;

            }else if(val == '.' && pointState == true){}

            if(val !== '.'){
                num2 = num2 + val;
                calc = num1 + symbol + num2;
                display.innerHTML = num2;
            }
        
            console.log(num2);
        }

    }
}

function setOperation(symb) {

    let display = document.getElementById("result");
    let opt = document.getElementById("operation");

    
    if(!symbolState){
        num1 = display.innerHTML;
        document.getElementById('calc').innerHTML = num1;
        display.innerHTML = '';
        
        symbolState = true;
        pointState = false;
        symbol = symb;
        var value = num1 + symbol;
    
        // display.innerHTML = value;

        if(symbol == '+'){
            operation = 1;
            opt.innerHTML = '<i class="fa-solid fa-plus"></i>';
        } else if(symbol == '-'){
            operation = 2;
            opt.innerHTML = '<i class="fa-solid fa-minus"></i>';
        } else if(symbol == 'x'){
            operation = 3;
            opt.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else if(symbol == '/'){
            operation = 4;
            opt.innerHTML = '<i class="fa-solid fa-divide"></i>';
        }

        console.log(operation);
    }else{

    }
}

function operate() {
    
    if(symbolState){

        switch (operation) {
            case 1:
                sum(num1,num2);
                break;
            case 2:
                sub(num1,num2);
                break;
            case 3:
                mult(num1,num2);
                break;
            case 4:
                div(num1,num2);
                break;
            default:
                break;
        }
    
        let opt = document.getElementById("operation");
        let calcOpt = document.getElementById("calc");
        let display = document.getElementById("result");

        if(parseFloat(result.toFixed(0)) == parseFloat(result.toFixed(2))){

            display.innerHTML = result.toFixed(0);
        }else{

            display.innerHTML = result.toFixed(2);
        }

        calcOpt.innerHTML = num1 + symbol + num2;
        opt.innerHTML = '<i class="fa-solid fa-equals"></i>';
    
        reset();
    }
    
}

function sum(n1,n2) {
    result = parseFloat(n1) + parseFloat(n2);
}

function sub(n1,n2) {
    result = n1 - n2;
}

function mult(n1,n2) {
    result = n1 * n2;
}

function div(n1,n2) {
    result = n1 / n2;
}

function reset() {

    num1 = '';
    num2 = '';
    symbol = '';
    operation = 0;
    symbolState = false;
}

function clean() {

    reset();
    result = 0;

    let opt = document.getElementById("operation");
    let calcOpt = document.getElementById("calc");
    let display = document.getElementById("result");

    display.innerHTML = result;
    calcOpt.innerHTML = '';
    opt.innerHTML = '';
}

function backspace() {
    
    let display = document.getElementById("result");
    var l = display.innerHTML.length;
    var newResult = display.innerHTML.substring(0,(l-1));

    if(!symbolState){
        num1 = newResult;
    }else{
        num2 = newResult;
    }

    display.innerHTML = newResult;
    console.log(newResult);
}

function sqroot(){

}

function cubroot() {
    
}

function pow(params) {
    
}