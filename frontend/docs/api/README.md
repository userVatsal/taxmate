# TaxMate API Documentation

Welcome to the TaxMate API documentation. This documentation will help you understand how to use the TaxMate API effectively.

## Authentication

All API requests require authentication using a JWT token. Include the token in the `Authorization` header:

```http
Authorization: Bearer <your-token>
```

### Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <your-token>
```

#### Refresh Token
```http
POST /api/auth/refresh
Authorization: Bearer <your-token>
```

## Transactions

### Endpoints

#### List Transactions
```http
GET /api/transactions
Authorization: Bearer <your-token>
```

Query Parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sort`: Sort field (default: date)
- `order`: Sort order (asc/desc)
- `search`: Search query
- `category`: Category filter
- `type`: Type filter (income/expense)
- `startDate`: Start date filter
- `endDate`: End date filter

#### Create Transaction
```http
POST /api/transactions
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "date": "2024-01-01",
  "amount": 100.00,
  "description": "Salary",
  "category": "Income",
  "type": "income"
}
```

#### Get Transaction
```http
GET /api/transactions/:id
Authorization: Bearer <your-token>
```

#### Update Transaction
```http
PUT /api/transactions/:id
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "date": "2024-01-01",
  "amount": 100.00,
  "description": "Salary",
  "category": "Income",
  "type": "income"
}
```

#### Delete Transaction
```http
DELETE /api/transactions/:id
Authorization: Bearer <your-token>
```

#### Upload Transactions
```http
POST /api/transactions/upload
Authorization: Bearer <your-token>
Content-Type: multipart/form-data

file: <file>
```

## Reports

### Endpoints

#### Income Summary
```http
GET /api/reports/income
Authorization: Bearer <your-token>
```

Query Parameters:
- `startDate`: Start date
- `endDate`: End date
- `category`: Category filter

#### Expense Breakdown
```http
GET /api/reports/expenses
Authorization: Bearer <your-token>
```

Query Parameters:
- `startDate`: Start date
- `endDate`: End date
- `category`: Category filter

#### Tax Liability
```http
GET /api/reports/tax
Authorization: Bearer <your-token>
```

Query Parameters:
- `taxYear`: Tax year

#### Profit/Loss Statement
```http
GET /api/reports/profit-loss
Authorization: Bearer <your-token>
```

Query Parameters:
- `startDate`: Start date
- `endDate`: End date

## Settings

### Endpoints

#### Get Profile
```http
GET /api/settings/profile
Authorization: Bearer <your-token>
```

#### Update Profile
```http
PUT /api/settings/profile
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com"
}
```

#### Get Account Settings
```http
GET /api/settings/account
Authorization: Bearer <your-token>
```

#### Update Account Settings
```http
PUT /api/settings/account
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "currency": "GBP",
  "timezone": "Europe/London"
}
```

#### Get Notification Preferences
```http
GET /api/settings/notifications
Authorization: Bearer <your-token>
```

#### Update Notification Preferences
```http
PUT /api/settings/notifications
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "email": true,
  "push": true,
  "sms": false
}
```

## Error Handling

All API endpoints return standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses include a message and optional details:

```json
{
  "error": {
    "message": "Invalid request",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  }
}
```

## Rate Limiting

API requests are rate limited to:
- 100 requests per minute for authenticated users
- 10 requests per minute for unauthenticated users

Rate limit headers are included in all responses:
- `X-RateLimit-Limit`: Maximum requests per window
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when the rate limit resets 