
$('.table-up').click(function () {
    var $row = $(this).parents('tr');
    if ($row.index() === 1) return; // Don't go above the header
    $row.prev().before($row.get(0));
    console.log("gora")
  });


$('.table-down').click(function () {
    var $row = $(this).parents('tr');
    $row.next().after($row.get(0));
    console.log("dol")
  });


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

    let template = `<tr> <td></td> <td>${nameInput}</td> <td>${quantityInput}</td> <td>${priceInput}zł</td> <td>${quantityInput * priceInput}zł</td> <td><svg class="table-up" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
  </svg>
  <svg class="table-down" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
  </svg> </td><td> <input type="submit" value="Usuń" class="btn btn-danger" id="Delete_button" onclick="deleteRow(${rows.length})"></td></tr> `;

    table.innerHTML += template;

    // console.log(rows.length);
    rows[rows.length - 1].children[0]["innerText"] = rows.length; //trzeba to pozmieniac, miejsce tbody zostalo zmienione
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