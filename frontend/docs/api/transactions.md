# Transactions API

## Overview

The Transactions API provides endpoints for managing financial transactions, including creating, reading, updating, and deleting transactions, as well as bulk operations and categorization.

## Endpoints

### List Transactions

```http
GET /api/transactions
Authorization: Bearer <access_token>
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| page | integer | Page number (default: 1) |
| limit | integer | Items per page (default: 10) |
| sort | string | Sort field (default: date) |
| order | string | Sort order (asc/desc) |
| search | string | Search query |
| category | string | Category filter |
| type | string | Type filter (income/expense) |
| startDate | string | Start date filter (YYYY-MM-DD) |
| endDate | string | End date filter (YYYY-MM-DD) |

#### Response

```json
{
  "transactions": [
    {
      "id": "txn_123",
      "date": "2024-01-01",
      "amount": 100.00,
      "description": "Salary",
      "category": "Income",
      "type": "income",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

### Create Transaction

```http
POST /api/transactions
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "date": "2024-01-01",
  "amount": 100.00,
  "description": "Salary",
  "category": "Income",
  "type": "income"
}
```

#### Response

```json
{
  "transaction": {
    "id": "txn_123",
    "date": "2024-01-01",
    "amount": 100.00,
    "description": "Salary",
    "category": "Income",
    "type": "income",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

#### Error Responses

```json
{
  "error": {
    "code": "INVALID_DATE",
    "message": "Invalid date format"
  }
}
```

```json
{
  "error": {
    "code": "INVALID_AMOUNT",
    "message": "Amount must be a positive number"
  }
}
```

### Get Transaction

```http
GET /api/transactions/:id
Authorization: Bearer <access_token>
```

#### Response

```json
{
  "transaction": {
    "id": "txn_123",
    "date": "2024-01-01",
    "amount": 100.00,
    "description": "Salary",
    "category": "Income",
    "type": "income",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

#### Error Responses

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Transaction not found"
  }
}
```

### Update Transaction

```http
PUT /api/transactions/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "date": "2024-01-01",
  "amount": 100.00,
  "description": "Salary",
  "category": "Income",
  "type": "income"
}
```

#### Response

```json
{
  "transaction": {
    "id": "txn_123",
    "date": "2024-01-01",
    "amount": 100.00,
    "description": "Salary",
    "category": "Income",
    "type": "income",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

#### Error Responses

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Transaction not found"
  }
}
```

### Delete Transaction

```http
DELETE /api/transactions/:id
Authorization: Bearer <access_token>
```

#### Response

```json
{
  "message": "Transaction deleted successfully"
}
```

#### Error Responses

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Transaction not found"
  }
}
```

### Upload Transactions

```http
POST /api/transactions/upload
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

file: <file>
```

#### Response

```json
{
  "message": "Transactions uploaded successfully",
  "stats": {
    "total": 100,
    "imported": 95,
    "failed": 5,
    "errors": [
      {
        "row": 1,
        "error": "Invalid date format"
      }
    ]
  }
}
```

#### Error Responses

```json
{
  "error": {
    "code": "INVALID_FILE",
    "message": "Invalid file format"
  }
}
```

### Get Categories

```http
GET /api/transactions/categories
Authorization: Bearer <access_token>
```

#### Response

```json
{
  "categories": [
    {
      "id": "cat_123",
      "name": "Income",
      "type": "income",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## Data Models

### Transaction

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| date | string | Transaction date (YYYY-MM-DD) |
| amount | number | Transaction amount |
| description | string | Transaction description |
| category | string | Transaction category |
| type | string | Transaction type (income/expense) |
| created_at | string | Creation timestamp |
| updated_at | string | Last update timestamp |

### Category

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | Category name |
| type | string | Category type (income/expense) |
| created_at | string | Creation timestamp |

## Error Codes

### Transaction Errors
- `INVALID_DATE`: Invalid date format
- `INVALID_AMOUNT`: Invalid amount
- `INVALID_CATEGORY`: Invalid category
- `INVALID_TYPE`: Invalid transaction type
- `NOT_FOUND`: Transaction not found
- `INVALID_FILE`: Invalid file format
- `UPLOAD_FAILED`: File upload failed
- `PROCESSING_FAILED`: File processing failed

## Best Practices

### Client Implementation
1. Implement proper error handling
2. Use pagination for large datasets
3. Implement proper file upload handling
4. Use appropriate content types
5. Handle rate limiting

### Data Management
1. Validate data before sending
2. Handle file size limits
3. Implement proper error recovery
4. Use appropriate data types
5. Follow data format standards

### Performance
1. Use pagination
2. Implement caching
3. Optimize queries
4. Handle large datasets
5. Monitor performance

## Rate Limiting

- 100 requests per minute for authenticated users
- 10 requests per minute for unauthenticated users
- 5 file uploads per minute
- 1000 transactions per upload

## File Upload

### Supported Formats
- CSV
- PDF (bank statements)
- Excel (coming soon)

### File Requirements
- Maximum size: 10MB
- Encoding: UTF-8
- Delimiter: Comma
- Required columns: date, amount, description

### Processing
- Automatic categorization
- Duplicate detection
- Error handling
- Progress tracking
- Result reporting 