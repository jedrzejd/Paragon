const buttonSubmit = () => {
    let nameInput = document.getElementById("name").value;
    let quantityInput = document.getElementById("quantity").value;
    let priceInput = document.getElementById("price").value;

    const table = document.getElementById("tbody-products");
    let rows = table.getElementsByTagName('tr');

    let template = `<tr> <td></td> <td>${nameInput}</td> <td>${quantityInput}</td> <td>${priceInput}zł</td> <td>${quantityInput * priceInput}zł</td> <td> <input type="submit" value="Usuń" id="Delete_button" onclick="deleteRow(${rows.length})"></td></tr> `;

    table.innerHTML += template;

    // console.log(rows.length);
    rows[rows.length - 1].children[0]["innerText"] = rows.length;
}

const deleteRow = (number) => {
    document.getElementById("tbody-products").deleteRow(number);
    editNumberRow();
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
        console.log(i);
        sum += table.rows[i].cells[4].innerHTML;
    }
}