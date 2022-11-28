const buttonSubmit = () => {
    let nameInput = document.getElementById("name").value;
    let quantityInput = document.getElementById("quantity").value;
    let priceInput = document.getElementById("price").value;
    console.log(nameInput);
    nameInput ??= "Brak nazwy";
    quantityInput ??= 0;
    priceInput ??= 0; 
    if(nameInput == ""){
        nameInput = "Brak nazwy";
    }
    if(quantityInput == ""){
        quantityInput = 0;
    }
    if(priceInput == ""){
        priceInput = 0;
    }
    const table = document.getElementById("tbody-products");
    let rows = table.getElementsByTagName('tr');

    let template = `<tr> <td></td> <td>${nameInput}</td> <td>${quantityInput}</td> <td>${priceInput}zł</td> <td>${quantityInput * priceInput}zł</td> <td> <input type="submit" value="Usuń" id="Delete_button" onclick="deleteRow(${rows.length})"></td></tr> `;

    table.innerHTML += template;

    // console.log(rows.length);
    rows[rows.length - 1].children[0]["innerText"] = rows.length;
    sumReceipt();
}

const deleteRow = (number) => {
    document.getElementById("tbody-products").deleteRow(number);
    editNumberRow();
    sumReceipt();
}

const editNumberRow = () => {
    var table = document.getElementById("tbody-products");

    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerHTML = i+1;
        table.rows[i].cells[5].innerHTML = `<input type="submit" value="Usuń" id="Delete_button" onclick="deleteRow(${i})"></input>`;
    }
}

const sumReceipt = () => {
    var table = document.getElementById("tbody-products");
    let sum=0;
    for (var i = 0; i < table.rows.length; i++) {
        let value = table.rows[i].cells[4].innerHTML.split('zł')[0].replace(',', '.');
        value = Number(value);
        // console.log(value);
        sum += value;
    }
    document.getElementById("costSummary-sum").innerHTML = sum + 'zł';
}