function moveTitle(n) {
    var title = document.getElementById('label-t');
    title.style.transition = ".2s";
    
    if (n == 1) {

        title.style.top = "0";
    }
    else {
        
        if(document.getElementById('title').value.length <= 0){

            title.style.top = "50px";
        }
    }
}

let countItem = 0;

function addItem() {

    var title = document.getElementById('title').value;

    if (title.length > 0) {

        countItem++;

        let option1 = document.createElement('div');
        option1.setAttribute('class','option');

        let optionrow1 = document.createElement('div');
        optionrow1.setAttribute('class','option-row');

        let option2 = document.createElement('div');
        option2.setAttribute('class','option');

        let optionrow2 = document.createElement('div');
        optionrow2.setAttribute('class','option-row');

        let checkt = document.createElement('div');
        checkt.setAttribute('class','check-t');

        let squareicon = document.createElement('i');
        squareicon.setAttribute('class','fa-regular fa-square');
        
        
        let squarecicon = document.createElement('i');
        squarecicon.setAttribute('class','fa-regular fa-square-check');
        

        let deletet = document.createElement('div');
        deletet.setAttribute('class','delete-t');

        let trashicon = document.createElement('i');
        trashicon.setAttribute('class','fa-regular fa-trash-can');
        
        let listcontent = document.createElement('div');
        listcontent.setAttribute('class','list-content');
        

        let itemt = document.createElement('div');
        itemt.setAttribute('class','item-t');

        let titlef = document.createElement('h1');

        let itemd = document.createElement('div');
        itemd.setAttribute('class','item-d');

        let descriptionf = document.createElement('p');

        var description = document.getElementById('description').value;
        
        var list = document.getElementById('list');
        var newItem = document.createElement('div');
       
        document.getElementById('description').value = '';

        var deadline = document.getElementById('deadline');
        var email = document.getElementById('email');

        var mail = null;
        var line = null;

        if (emailstate) {
            
            mail = email.value;
        }

        if (prazostate) {
            
            line = deadline.value;
        }

        withDB(db => {

            let request = db.add(
                {"title": title,
                 "description": description,
                 "done": false,
                 "deadline": line,
                 "email": mail,
                 "priority": prioritystate});

                 request.onsuccess = event => {

                    squareicon.setAttribute('id','check' + event.target.result);
                    squareicon.setAttribute('onclick','done(' + event.target.result +',1)');
                    squarecicon.setAttribute('id','checked' + event.target.result);
                    squarecicon.setAttribute('onclick','done(' + event.target.result +',0)');
                    listcontent.setAttribute('onclick', 'expandItem(' + event.target.result + ')');
                    trashicon.setAttribute('id','delete' + event.target.result);
                    trashicon.setAttribute('onclick','deleteItem(' + event.target.result +')');
                    

                    newItem.setAttribute('id','item' + event.target.result);
                    newItem.setAttribute('class','list-item');
        
                    checkt.appendChild(squareicon);
                    checkt.appendChild(squarecicon);
                    optionrow1.appendChild(checkt);
                    option1.appendChild(optionrow1);
        
                    titlef.innerText = title;
                    descriptionf.innerText = description;
        
                    itemt.appendChild(titlef);
                    itemd.appendChild(descriptionf);
                    listcontent.appendChild(itemt);
                    listcontent.appendChild(itemd);
                    
                    deletet.appendChild(trashicon);
                    optionrow2.appendChild(deletet);
                    option2.appendChild(optionrow2);
        
                    newItem.appendChild(option1);
                    newItem.appendChild(listcontent);
                    newItem.appendChild(option2);
        
                    list.appendChild(newItem);
        
                    document.getElementById('title').value = '';
                    moveTitle(0);
                }
        });
    }
}

let expandformstate = false;

function expandForm() {

    var expandForm = document.getElementById('expand-form');
    var expand = document.getElementById('expand');
    var colapse = document.getElementById('colapse');

    expandForm.style.transition = ".2s";

    if (!expandformstate) {

        expandForm.style.height = "180px";
        expand.style.display = "none";
        colapse.style.display = "block";

        expandformstate = true;

    }
    else {

        expandForm.style.height = "20px";
        expand.style.display = "block";
        colapse.style.display = "none";

        expandformstate = false;
    }
}

let expanditemstate = false;

function expandItem(itm) {
    var item = document.getElementById('item' + itm);
    item.style.transition = ".2s";

    if (!expanditemstate) {

        
        for (let i = 1; i <= items.length - 1; i++) {
            var itemx = document.getElementById('item' + items[i]);
            itemx.style.transition = ".2s";
            itemx.style.height = "30px";
        }

        item.style.height = "140px";
        expanditemstate = true;
    }
    else {

        item.style.height = "30px";
        expanditemstate = false;
    }
}

function done(n1,n2) {
    
    var chk = document.getElementById('check' + n1);
    var chkd = document.getElementById('checked' + n1);

    if (n2 == 1) {

        chk.style.display = "none";
        chkd.style.display = "block";
    } 
    else {

        chk.style.display = "block";
        chkd.style.display = "none";
    }
}

let prazostate = false;
function prazodef() {
    
    var prazo = document.getElementById('deadline');
    var prazor = document.getElementById('deadline-r');

    if (!prazostate) {

        prazo.style.backgroundColor = "transparent";
        prazo.style.pointerEvents = "unset";
        prazo.style.cursor = "pointer";

        prazostate = true;
    }
    else {

        prazor.checked = false;
        
        prazo.style.backgroundColor = "#e0e0e0";
        prazo.style.pointerEvents = "none";
        prazo.style.cursor = "unset";

        prazostate = false; 
    }
}

let emailstate = false;
function emaildef() {
    
    var email = document.getElementById('email');
    var emailr = document.getElementById('email-r');

    if (!emailstate) {

        email.style.backgroundColor = "transparent";
        email.style.pointerEvents = "unset";
        email.style.cursor = "pointer";

        emailstate = true;
    }
    else {

        emailr.checked = false;
        
        email.style.backgroundColor = "#e0e0e0";
        email.style.pointerEvents = "none";
        email.style.cursor = "unset";

        emailstate = false; 
    }
}

let prioritystate = false;

function prioritydef() {
    
    var priorityr = document.getElementById('priority');

    if (!prioritystate) {

        prioritystate = true;
    }
    else {

        priorityr.checked = false;
        prioritystate = false;
    }
}

function withDB(callback) {
  
    let request = indexedDB.open("TarefasBD", 3);
  
    request.onerror = console.error;
  
    request.onsuccess = () => {
      let db = request.result;
      callback(db.transaction(["tarefas"], "readwrite").objectStore("tarefas"));
    }
  
    request.onupgradeneeded = (e) => {
      let db = e.target.result;
      db.createObjectStore("tarefas", {autoIncrement: true});

      let transaction = e.target.transaction;
      let objectStore = transaction.objectStore("tarefas");

      callback(objectStore);
    }
}

let intervalID;

function deleteItem(item) {
    
    var interval = 500;
    var itm = document.getElementById('item'+ item);
    itm.style.transition = ".4s";
    itm.style.marginLeft = "200px";

    intervalID = setInterval(() => {
        
        itm.remove();
        withDB(db => {
            db.delete(parseInt(item));
        });

        document.getElementById("list").innerHTML = "";
        withDB(loadItems);


        clearInterval(intervalID);
    }, interval);
   

    console.log(item);
}

const items = [];

function loadItems(db) {
    countItem = 0;
    items.length = 0;
    db.openCursor().onsuccess = event => {

        let cursor = event.target.result;

        if (cursor) {
            
            let option1 = document.createElement('div');
            option1.setAttribute('class','option');

            let optionrow1 = document.createElement('div');
            optionrow1.setAttribute('class','option-row');

            let option2 = document.createElement('div');
            option2.setAttribute('class','option');

            let optionrow2 = document.createElement('div');
            optionrow2.setAttribute('class','option-row');

            let checkt = document.createElement('div');
            checkt.setAttribute('class','check-t');

            let squareicon = document.createElement('i');
            squareicon.setAttribute('class','fa-regular fa-square');
            
            let squarecicon = document.createElement('i');
            squarecicon.setAttribute('class','fa-regular fa-square-check');
            

            let deletet = document.createElement('div');
            deletet.setAttribute('class','delete-t');

            let trashicon = document.createElement('i');
            trashicon.setAttribute('class','fa-regular fa-trash-can');
            
            let listcontent = document.createElement('div');
            listcontent.setAttribute('class','list-content');
            

            let itemt = document.createElement('div');
            itemt.setAttribute('class','item-t');

            let titlef = document.createElement('h1');

            let itemd = document.createElement('div');
            itemd.setAttribute('class','item-d');

            let descriptionf = document.createElement('p');

            var list = document.getElementById('list');
            var newItem = document.createElement('div');
            newItem.setAttribute('id','item' + cursor.key);
            newItem.setAttribute('class','list-item');
            
            squareicon.setAttribute('id','check' + cursor.key);
            squareicon.setAttribute('onclick','done(' + cursor.key +',1)');
            squarecicon.setAttribute('id','checked' + cursor.key);
            squarecicon.setAttribute('onclick','done(' + cursor.key +',0)');
            listcontent.setAttribute('onclick', 'expandItem(' + cursor.key + ')');
            trashicon.setAttribute('id','delete' + cursor.key);
            trashicon.setAttribute('onclick','deleteItem(' + cursor.key +')');


            checkt.appendChild(squareicon);
            checkt.appendChild(squarecicon);
            optionrow1.appendChild(checkt);
            option1.appendChild(optionrow1);

            titlef.innerText = event.target.result.value.title;
            descriptionf.innerText = event.target.result.value.description;

            itemt.appendChild(titlef);
            itemd.appendChild(descriptionf);
            listcontent.appendChild(itemt);
            listcontent.appendChild(itemd);
            
            deletet.appendChild(trashicon);
            optionrow2.appendChild(deletet);
            option2.appendChild(optionrow2);

            newItem.appendChild(option1);
            newItem.appendChild(listcontent);
            newItem.appendChild(option2);

            list.appendChild(newItem);

            cursor.continue();

            countItem++;
            items.length = countItem;
            items[countItem] = cursor.key;

        }
    }
    
}
  