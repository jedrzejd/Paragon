const buttonSubmit = () => {
    let nameInput = document.getElementById("name").value;
    let quantityInput = document.getElementById("quantity").value;
    let priceInput = document.getElementById("price").value;
    console.log(nameInput);
    nameInput ??= "Brak nazwy";
    quantityInput ??= 0;
    priceInput ??= 0;
    priceInput = Number(priceInput).toFixed(2) //round to 2 
    if (nameInput == "") {
        nameInput = "Brak nazwy";
    }
    if (quantityInput == "") {
        quantityInput = 0;
    }
    if (priceInput == "") {
        priceInput = 0;
    }
    let table = document.getElementById("tbody-products");
    let rows = table.getElementsByTagName('tr');

    let template = `<tr> <td></td> <td>${nameInput}</td> <td>${quantityInput}</td> <td>${priceInput}zł</td> <td>${quantityInput * priceInput}zł</td> <td> <input type="submit" value="Usuń" class="btn btn-danger" id="Delete_button" onclick="deleteRow(${rows.length})"></td></tr> `;

    table.innerHTML += template;

    // console.log(rows.length);
    rows[rows.length - 1].children[0]["innerText"] = rows.length;
    rows[rows.length - 1].onclick = function () {
        rIndex = this.rowIndex;
        console.log(rIndex);

        document.getElementById("name").value = this.cells[1].innerHTML;
        document.getElementById("quantity").value = this.cells[2].innerHTML.split('zł')[0].replace(',', '.');
        document.getElementById("price").value = this.cells[3].innerHTML.split('zł')[0].replace(',', '.');
    };
    sumReceipt();
    updateCopyFromRowToForm();
}

const deleteRow = (number) => {
    document.getElementById("tbody-products").deleteRow(number);
    editNumberRow();
    sumReceipt();
    updateCopyFromRowToForm();
}

const editNumberRow = () => {
    var table = document.getElementById("tbody-products");

    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerHTML = i + 1;
        table.rows[i].cells[5].innerHTML = `<input type="submit" value="Usuń" id="Delete_button" class="btn btn-danger" onclick="deleteRow(${i})"></input>`;
    }
}

const sumReceipt = () => {
    var table = document.getElementById("tbody-products");
    let sum = 0;
    for (var i = 0; i < table.rows.length; i++) {
        let value = table.rows[i].cells[4].innerHTML.split('zł')[0].replace(',', '.');
        value = Number(value);
        // console.log(value);
        sum += value;
    }
    document.getElementById("costSummary-sum").innerHTML = Number(sum).toFixed(2) + 'zł';
}

const updateCopyFromRowToForm = () => {
    table = document.getElementById("tbody-products")
    rIndex = undefined;
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            console.log(rIndex);

            document.getElementById("name").value = this.cells[1].innerHTML;
            document.getElementById("quantity").value = this.cells[2].innerHTML.replace(',', '.');
            document.getElementById("price").value = this.cells[3].innerHTML.split('zł')[0].replace(',', '.');
        };
    }
}


function editRow() {
    // var table = document.getElementById("tbody-products"), rIndex;
    // rIndex = this.rowIndex;
    console.log(rIndex - 1);
    table.rows[rIndex - 1].cells[1].innerHTML = document.getElementById("name").value;
    table.rows[rIndex - 1].cells[2].innerHTML = document.getElementById("quantity").value;
    table.rows[rIndex - 1].cells[3].innerHTML = document.getElementById("price").value + "zł";
    table.rows[rIndex - 1].cells[4].innerHTML = document.getElementById("quantity").value * document.getElementById("price").value + "zł";
    sumReceipt();
    updateCopyFromRowToForm();
}

sumReceipt();
updateCopyFromRowToForm();