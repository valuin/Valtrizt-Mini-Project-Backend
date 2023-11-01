# Expense Tracker CLI

This is a command-line interface (CLI) application for tracking expenses. It interacts with an API to fetch, add, update, and delete expenses.

## Installation

Before running the application, make sure you have Node.js and npm installed. Then, install the required dependencies:

```bash
npm install
```

## Usage

Create a local MySQL database first

```bash
CREATE DATABASE expenses;
USE expenses;

CREATE TABLE expenses (
  id INT NOT NULL AUTO_INCREMENT,
  description VARCHAR(255) NOT NULL,
  amount INT NOT NULL,
  PRIMARY KEY (id)
);

```
change the password section in server.js to your mysql password

```bash
// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'passwordplaceholder',
  database: 'expenses'
});
```
Run the application with the following command:
```bash
node server.js // to run the localhost
node client.js //
```
The application will present a menu with the following options:

Get all expenses
Get average expenses
Add an expense
Update an expense
Delete an expense

# Functions

## getExpenses()
This function fetches all expenses from the API and logs them to the console. Each expense is logged with its ID, description, amount, and date.

## getAverageExpenses()
This function fetches the average expenses from the API and logs them to the console. The averages are calculated by the API.

## addExpense()

This function adds a new expense to the database.

## updateExpense()

This function updates an existing expense in the database.

## deleteExpense()

This function deletes an existing expense from the database.

# Dependencies
express: A web application framework for Node.js, used to handle HTTP requests and responses.

mysql2/promise: A MySQL client for Node.js with Promise support. It's used to connect to the MySQL database and perform queries.

moment: A JavaScript library for parsing, validating, manipulating, and displaying dates and times. It's used to handle date and time data.

prompt-sync: Used to synchronously get user input in the console.

node-fetch: Used to make HTTP requests to the API.



# Expenses API

This API allows you to manage expenses.

## Endpoints

### GET /expenses ###

Returns a list of all expenses.

Response:

```json
[
    {
        "id": 1,
        "description": "Groceries",
        "amount": 50,
        "date": "2022-01-01T00:00:00.000Z"
    },
]

```

### GET /expenses/average
Returns a list of expenses grouped by date, with the total and average amount for each date.

Response:
```json
[
  {
    "date": "2022-01-01",
    "total_amount": 100,
    "average_amount": 50
  },
  // ...
]
```




### POST /expenses
Adds a new expense.

Request body:
```json

{
  "description": "Groceries",
  "amount": 50
}

Response:

{
  "id": 1,
  "description": "Groceries",
  "amount": 50,
  "date": "2022-01-01T00:00:00.000Z"
}
```



### PUT /expenses/:id
Updates an existing expense.

Request body:
```json

{
  "description": "Groceries",
  "amount": 50
}

Response:
{
  "id": 1,
  "description": "Groceries",
  "amount": 50,
  "date": "2022-01-01T00:00:00.000Z"
}
```

### DELETE /expenses/:id
Deletes an existing expense.

Response:

```json
{
  "id": 1
}
```
