const buttonSubmit = () => {
    let nameInput = document.getElementById("name").value;
    let quantityInput = document.getElementById("quantity").value;
    let priceInput = document.getElementById("price").value;

    const table = document.getElementById("tbody-products");
    let template = `<tr> <td></td> <td>${nameInput}</td> <td>${quantityInput}</td> <td>${priceInput}zł</td> <td>${quantityInput*priceInput}zł</td> </tr> `;    
 
    table.innerHTML += template;
    rows = table.getElementsByTagName('tr');
    console.log(rows.length);
    rows[rows.length-1].children[0]["innerText"] = rows.length-1;
}

const deleteRow = (number) => {
    document.getElementById("row"+number+"").outerHTML="";
}
