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