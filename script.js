const balance =
  document.getElementById("balance");

const income =
  document.getElementById("income");

const expense =
  document.getElementById("expense");

const text =
  document.getElementById("text");

const amount =
  document.getElementById("amount");

const type =
  document.getElementById("type");

const addBtn =
  document.getElementById("addBtn");

const transactionList =
  document.getElementById("transactionList");

const themeToggle =
  document.getElementById("themeToggle");


let transactions =
  JSON.parse(
    localStorage.getItem("transactions")
  ) || [];


// SAVE TO LOCAL STORAGE

function saveTransactions() {

  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}


// UPDATE UI

function updateUI() {

  transactionList.innerHTML = "";

  let totalIncome = 0;

  let totalExpense = 0;

  transactions.forEach((transaction, index) => {

    const li =
      document.createElement("li");

    li.innerHTML = `

      <div class="transaction-info">

        <strong>
          ${transaction.text}
        </strong>

        <small class="
          transaction-type-${transaction.type}
        ">
          ${transaction.type.toUpperCase()}
        </small>

      </div>

      <div>

        ₹ ${transaction.amount}

        <button
          class="delete-btn"
          onclick="deleteTransaction(${index})"
        >
          ✖
        </button>

      </div>
    `;

    transactionList.appendChild(li);

    if (transaction.type === "income") {

      totalIncome += transaction.amount;

    } else {

      totalExpense += transaction.amount;
    }
  });

  income.textContent = totalIncome;

  expense.textContent = totalExpense;

  balance.textContent =
    totalIncome - totalExpense;
}


// ADD TRANSACTION

function addTransaction() {

  const transactionText =
    text.value.trim();

  const transactionAmount =
    Number(amount.value);

  if (
    transactionText === "" ||
    transactionAmount <= 0
  ) {

    alert("Please enter valid details");

    return;
  }

  transactions.push({

    text: transactionText,

    amount: transactionAmount,

    type: type.value
  });

  saveTransactions();

  updateUI();

  text.value = "";

  amount.value = "";
}


// DELETE TRANSACTION

function deleteTransaction(index) {

  transactions.splice(index, 1);

  saveTransactions();

  updateUI();
}


// BUTTON EVENT

addBtn.addEventListener(
  "click",
  addTransaction
);


// DARK LIGHT MODE

themeToggle.addEventListener(
  "click",
  () => {

    document.body.classList.toggle("light");

    if (
      document.body.classList.contains("light")
    ) {

      themeToggle.innerText = "☀️";

    } else {

      themeToggle.innerText = "🌙";
    }
  }
);


// INITIAL UI

updateUI();