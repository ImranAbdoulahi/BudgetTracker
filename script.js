// Stores all budget entries(income and expenses)
let budgetList=[];
let count = 0;

// Gets references to DOM elements for updating the UI
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income-total");
const expenseEl = document.getElementById("expense-total");
const tableBody = document.getElementById("expense-table");

// Event listener for when "Add" button is clicked
document.getElementById("add-btn").addEventListener("click", () => {
const type = document.getElementById("type").value;
const desc = document.getElementById("desc").value.trim();
const amount = parseFloat(document.getElementById("amount").value);

// Input validation 
if (!desc || isNaN(amount) || amount <= 0) return alert("Invalid input");

budgetList.push({ id: ++count, type, desc, amount });

updateUI();

document.getElementById("desc").value = "";
document.getElementById("amount").value = "";
});

// Function to delete an entry
function deleteEntry(id){
    budgetList = budgetList.filter(entry => entry.id !== id);
    updateUI();
}
// Function to rebuild the table and update totals everytime something changes
function updateUI() {
    let income = 0, expense = 0;
    tableBody.innerHTML = "";

    budgetList.forEach((entry, index) => {
       
        if(entry.type === "income") {
            income += entry.amount;
        }
        else {
            expense += entry.amount;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.desc}</td>
        <td>${entry.amount}</td>
        <td class="${entry.type}">${entry.type === "income" ? "↗" : "↘"}</td>
        <td><span class="delete-btn" onclick="deleteEntry(${entry.id})">✗</span></td>
        `;
        tableBody.appendChild(row);
    });

    //Updates the totals display on the tracker
    balanceEl.textContent = income - expense;
    incomeEl.textContent = income;
    expenseEl.textContent = expense;

}

