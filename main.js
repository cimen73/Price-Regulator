const formBtn = document.querySelector('.add-btn');
const listt = document.querySelector('.listt');
const totalInformation = document.querySelector("#total-information");
const selectFilter = document.querySelector("#filter-select");
const expenceInput = document.querySelector('#expence');
const paidInput = document.querySelector('#paids');
const statusCheck = document.querySelector("#status-input")


formBtn.addEventListener('click', addExpense);
listt.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

let total = 0;

function updateTotal(paids) {
    total += Number(paids);
    totalInformation.innerText = total;
}

function addExpense(e) {
    e.preventDefault(); 
    
    if(!paidInput.value || !expenceInput.value) {
        alert("Please Fill Out the Forms...");
        return; 
    }

    const expenceDiv = document.createElement('div');

    expenceDiv.classList.add('expence');
    if(statusCheck.checked){
        expenceDiv.classList.add("paid");
    }
 
    expenceDiv.innerHTML = `
          <h2>${expenceInput.value}</h2>
          <h2 id="value" >${paidInput.value}</h2>
          <div class="buttons">
            <img id="payment" src="assets/payment.png" />
            <img id="remove" src="assets/remove.png" />
          </div>
           `;

 
    listt.appendChild(expenceDiv);
    updateTotal(paidInput.value);

    expenceInput.value = "";
    paidInput.value = "";
}

function handleClick(e){

    const element = e.target
    if(element.id === "remove") {

        const wrapperElement = element.parentElement.parentElement;

        const deletedPrice = wrapperElement.querySelector("#value").innerText;
        Number(deletedPrice);
   
        updateTotal( - Number(deletedPrice));

        wrapperElement.remove();}}


function handleFilter(e){
    const items = listt.childNodes;

    items.forEach((item) => {
        switch (e.target.value) {
            case "all":
                item.style.display = "flex";
            break;

            case "paid":
                if (!item.classList.contains("paid")) {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }
            break;

            case "not-paid":
                if (item.classList.contains("paid")) {
                    item.style.display = "none";
                }else{
                    item.style.display = "flex";
                }
            break;
        }
    })
}