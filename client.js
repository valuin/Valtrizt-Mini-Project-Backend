const prompt = require("prompt-sync")();
const fetch = require("node-fetch");
const url = "http://localhost:3000";

async function getExpenses() {
  try {
    const response = await fetch(`${url}/expenses`);
    const expenses = await response.json();

    console.log("\nExpense List:");
    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const formattedDate = date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      console.log(
        `${expense.id}: ${expense.description} - Rp${expense.amount} - ${formattedDate} ${formattedTime}`
      );
    });

  } catch (error) {
    console.error("Error getting expenses:", error);
    return [];
  }
}

async function getAverageExpenses() {
  try {
    const response = await fetch(`${url}/expenses/average`);
    const averages = await response.json();

    console.log("\nAverage Expenses:");
    averages.forEach((average) => {
      const date = new Date(average.date);
      const formattedDate = date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      console.log(`Date: ${formattedDate}\nTotal Amount: Rp${average.total_amount}\nAverage Amount: Rp${average.average_amount}`);
    });

    console.log("\n");

  } catch (error) {
    console.error("Error getting average expenses:", error);
    return [];
  }
}
async function addExpense() {
  const description = prompt("Enter description: ");
  const amount = parseFloat(prompt("Enter amount: "));

  try {
    const response = await fetch(`${url}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, amount }),
    });
    const newExpense = await response.json();
    console.log(`Expense added with ID ${newExpense.id}`);

  } catch (error) {
    console.error("Error adding expense:", error);
  }
}

async function updateExpense() {
  const id = parseInt(prompt("Enter expense ID: "));
  const description = prompt("Enter new description: ");
  const amount = parseFloat(prompt("Enter amount: "));

  try {
    const response = await fetch(`${url}/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, amount }),
    });
    const updatedExpense = await response.json();
    console.log(`Expense with ID ${updatedExpense.id} updated`);
  } catch (error) {
    console.error("Error updating expense:", error);
  }
}

async function deleteExpense() {
  const id = parseInt(prompt("Enter expense ID: "));

  try {
    const response = await fetch(`${url}/expenses/${id}`, {
      method: "DELETE",
    });
    const deletedExpense = await response.json();
    console.log(`Expense with ID ${deletedExpense.id} deleted`);
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
}

async function main() {
  await getExpenses();
  await getAverageExpenses();

  console.log("Expense Tracker\n");
  console.log("1. View Expenses");
  console.log("2. Add Expense");
  console.log("3. Update Expense");
  console.log("4. Delete Expense");
  console.log("5. Exit\n");

  const choice = parseInt(prompt("Enter choice: "));

  switch (choice) {
    case 1:
      main();
      break;
    case 2:
      await addExpense();
      main();
      break;
    case 3:
      await updateExpense();
      main();
      break;
    case 4:
      await deleteExpense();
      main();
      break;
    case 5:
      console.log("Goodbye!");
      break;
    default:
      console.log("Invalid choice\n");
  }
}

main();
