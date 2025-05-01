let num1 = '';
let num2 = '';
let symbol = '';
let symbolState = false;
let operation = 0;
let result = 0;
let calc = '';
let pointState = false;
let rootState = false;
let powState = false;
let historyState = false;

function enterNum(val) {

    let display = document.getElementById("result");
    if (!rootState && !powState) {
        if(display.innerHTML.length < 7){

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
    } else if(rootState && !powState) {
        
        num2 = num2 + val;

        if(num1 == 0){
            display.innerText = display.innerText + val;
        }else{
            display.innerText = display.innerText + val;
        }
        
        console.log(num2);

    } else if(powState && !rootState){

        num2 = num2 + val;
        display.innerHTML = display.innerHTML + num2;
    }
}

function setOperation(symb) {

    let display = document.getElementById("result");
    let opt = document.getElementById("operation");
    num2 = '';
    
    if(!symbolState){
        num1 = display.innerHTML;
        document.getElementById('calc').innerHTML = num1;
        display.innerHTML = '';
        
        symbolState = true;
        pointState = false;
        symbol = symb;
    
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

        calcOpt.innerHTML = num1 + symbol + num2;
        opt.innerHTML = '<i class="fa-solid fa-equals"></i>';

        saveOperation(calcOpt.innerHTML, result);
        reset();
    }

    if(rootState){
        setRoot(num1,num2);
    }

    if(powState){

        setpPow(num1, num2);
    }
}

function sum(n1,n2) {

    let display = document.getElementById("result");
    result = parseFloat(n1) + parseFloat(n2);

    if(result >= 1e9){

        result = (result / 1e9).toFixed(1) + 'E+9';
        
    } else if(result >= 1e6){

        result = (result / 1e6).toFixed(1) + 'E+6';
    }

    display.innerHTML = result;
}

function sub(n1,n2) {
    
    let display = document.getElementById("result");
    result = parseFloat(n1) - parseFloat(n2);

    if(parseFloat(result.toFixed(0)) == parseFloat(result.toFixed(2))){

        display.innerHTML = result.toFixed(0);
    }else{

        display.innerHTML = result.toFixed(2);
    } 
}

function mult(n1,n2) {

    let display = document.getElementById("result");
    result = parseFloat(n1) * parseFloat(n2);

    if(result >= 1e9){

        result = (result / 1e9).toFixed(1) + 'E+9';
        display.innerHTML = result;
        
    } else if(result >= 1e6){

        result = (result / 1e6).toFixed(1) + 'E+6';
        display.innerHTML = result;

    }else{

        if(parseFloat(result.toFixed(0)) == parseFloat(result.toFixed(2))){

            display.innerHTML = result.toFixed(0);
        }else{

            display.innerHTML = result.toFixed(2);
        }   
    }
}

function div(n1,n2) {
    let display = document.getElementById("result");

    result = parseFloat(n1) / parseFloat(n2);

    if(parseFloat(result.toFixed(0)) == parseFloat(result.toFixed(2))){

            display.innerHTML = result.toFixed(0);
        }else{

            display.innerHTML = result.toFixed(2);
    }
}

function reset() {

    num1 = '';
    num2 = '';
    symbol = '';
    operation = 0;
    pointState = false;
    symbolState = false;
    rootState = false;
    powState = false;
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

function root(){

    let display = document.getElementById("result");
    rootState = true;
    symbolState = false;
    operation = 5;

    if(display.innerText == '0'){

        display.innerHTML = '&#8730;';

    }else{

        display.innerHTML = display.innerHTML + 'x' +'&#8730;';
    }
}

function setRoot(n1,n2){

    let display = document.getElementById("result");
    let calcOpt = document.getElementById("calc");

    calcOpt.innerHTML = display.innerHTML;

    if(n1 > 0){

        if(n2 >= 0){

            result = n1 * Math.sqrt(n2);

            console.log(result);
        }else{

            display.innerHTML = 'Erro';
            console.log("Error");
        }
    }else{

        if(n2 >= 0){

            result = Math.sqrt(n2);

            console.log(result);
        }else{

            display.innerHTML = 'Erro';
            console.log("Error");
        }
    }

    if(parseFloat(result.toFixed(0)) == parseFloat(result.toFixed(2))){

        result = result.toFixed(0);
        display.innerHTML = result;
    }else{

        result = result.toFixed(2);
        display.innerHTML = result;
    }

    saveOperation(calcOpt.innerHTML,result);

}

function pow() {
    
    let display = document.getElementById("result");
    
    if(num1 > 0){

        display.innerHTML = num1 + '^(';
    }

    powState = true;
    rootState = false;
}

function setpPow(n1,n2) {

    let display = document.getElementById("result");
    let calcOpt = document.getElementById("calc");

    calcOpt.innerHTML = display.innerHTML;
    
    if(n1 > 0){

        result = Math.pow(n1,n2);
        
        if(parseFloat(result.toFixed(0)) == parseFloat(result.toFixed(2))){

            result = result.toFixed(0);
        }else{
            
            result = result.toFixed(2);
        }

        if(result >= 1e9){

            result = (result / 1e9).toFixed(1) + 'E+9';
            
        } else if(result >= 1e6){
    
            result = (result / 1e6).toFixed(1) + 'E+6';
        }

        display.innerHTML = result;
        saveOperation(calcOpt.innerHTML,result);

        console.log(result);
    }
}

function showHistory() {

    var calculator = document.getElementById('calculator');
    var hcontent = document.getElementById('history');
    var hbtn = document.getElementById('history-btn');

    if(!historyState){

        calculator.style.gap = "5px";
        hcontent.style.padding = "10px";
        hcontent.style.height = "max-content";
        hcontent.style.transition = ".2s"; 
        hbtn.style.transition = ".5s"; 
        hbtn.style.transform = "rotateZ(360deg)";

        historyState = true;
    }else{
        calculator.style.gap = "0";
        hcontent.style.padding = "0";
        hcontent.style.height = "0";
        hbtn.style.transition = ".4s"; 
        hbtn.style.transform = "rotateZ(-360deg)"

        historyState = false;
    }
}


function saveOperation(op,rs) {
    
    var history = document.getElementById('history');
    
    var lastoperation = document.createElement('h2');
    lastoperation.innerHTML = op;

    var lastresult = document.createElement('h1');
    lastresult.innerText = rs;

    var hrow = document.createElement('div');
    hrow.setAttribute("class" , "history-row");

    hrow.append(lastoperation,lastresult);
    history.append(hrow);
    console.log("Any");
}