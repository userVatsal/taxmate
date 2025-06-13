# Reports API

## Overview

The Reports API provides endpoints for generating tax reports and financial statements.

## Endpoints

### Income Summary

```http
GET /api/reports/income
Authorization: Bearer <access_token>
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| startDate | string | Start date (YYYY-MM-DD) |
| endDate | string | End date (YYYY-MM-DD) |
| category | string | Category filter |
| groupBy | string | Group by (day/week/month/year) |

#### Response

```json
{
  "summary": {
    "total": 50000.00,
    "count": 100,
    "average": 500.00,
    "min": 100.00,
    "max": 1000.00
  },
  "breakdown": [
    {
      "period": "2024-01",
      "amount": 10000.00,
      "count": 20
    }
  ],
  "categories": [
    {
      "category": "Salary",
      "amount": 30000.00,
      "percentage": 60
    }
  ]
}
```

### Expense Breakdown

```http
GET /api/reports/expenses
Authorization: Bearer <access_token>
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| startDate | string | Start date (YYYY-MM-DD) |
| endDate | string | End date (YYYY-MM-DD) |
| category | string | Category filter |
| groupBy | string | Group by (day/week/month/year) |

#### Response

```json
{
  "summary": {
    "total": 30000.00,
    "count": 150,
    "average": 200.00,
    "min": 50.00,
    "max": 500.00
  },
  "breakdown": [
    {
      "period": "2024-01",
      "amount": 6000.00,
      "count": 30
    }
  ],
  "categories": [
    {
      "category": "Rent",
      "amount": 12000.00,
      "percentage": 40
    }
  ]
}
```

### Tax Liability

```http
GET /api/reports/tax
Authorization: Bearer <access_token>
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| taxYear | string | Tax year (YYYY-YYYY) |
| includeDeductions | boolean | Include tax deductions |

#### Response

```json
{
  "summary": {
    "totalIncome": 50000.00,
    "totalExpenses": 30000.00,
    "netIncome": 20000.00,
    "taxLiability": 4000.00,
    "effectiveRate": 20
  },
  "breakdown": {
    "income": {
      "employment": 30000.00,
      "selfEmployment": 20000.00
    },
    "expenses": {
      "allowable": 25000.00,
      "disallowed": 5000.00
    },
    "deductions": {
      "personalAllowance": 12570.00,
      "other": 2000.00
    }
  },
  "taxBands": [
    {
      "band": "Personal Allowance",
      "rate": 0,
      "amount": 12570.00,
      "tax": 0.00
    },
    {
      "band": "Basic Rate",
      "rate": 20,
      "amount": 7429.00,
      "tax": 1485.80
    }
  ]
}
```

### Profit/Loss Statement

```http
GET /api/reports/profit-loss
Authorization: Bearer <access_token>
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| startDate | string | Start date (YYYY-MM-DD) |
| endDate | string | End date (YYYY-MM-DD) |
| includeTax | boolean | Include tax calculations |

#### Response

```json
{
  "summary": {
    "revenue": 50000.00,
    "expenses": 30000.00,
    "grossProfit": 20000.00,
    "tax": 4000.00,
    "netProfit": 16000.00
  },
  "breakdown": {
    "revenue": [
      {
        "category": "Sales",
        "amount": 40000.00
      },
      {
        "category": "Services",
        "amount": 10000.00
      }
    ],
    "expenses": [
      {
        "category": "Cost of Sales",
        "amount": 20000.00
      },
      {
        "category": "Operating Expenses",
        "amount": 10000.00
      }
    ]
  },
  "periods": [
    {
      "period": "2024-01",
      "revenue": 10000.00,
      "expenses": 6000.00,
      "profit": 4000.00
    }
  ]
}
```

### Export Report

```http
GET /api/reports/export
Authorization: Bearer <access_token>
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| type | string | Report type |
| format | string | Export format (pdf/csv) |
| startDate | string | Start date (YYYY-MM-DD) |
| endDate | string | End date (YYYY-MM-DD) |

#### Response

```http
Content-Type: application/pdf
Content-Disposition: attachment; filename="report.pdf"

<binary data>
```

## Data Models

### Report Summary

| Field | Type | Description |
|-------|------|-------------|
| total | number | Total amount |
| count | number | Number of transactions |
| average | number | Average amount |
| min | number | Minimum amount |
| max | number | Maximum amount |

### Tax Breakdown

| Field | Type | Description |
|-------|------|-------------|
| totalIncome | number | Total income |
| totalExpenses | number | Total expenses |
| netIncome | number | Net income |
| taxLiability | number | Tax liability |
| effectiveRate | number | Effective tax rate |

## Error Codes

### Report Errors
- `INVALID_DATE`: Invalid date format
- `INVALID_PERIOD`: Invalid date period
- `INVALID_TYPE`: Invalid report type
- `INVALID_FORMAT`: Invalid export format
- `NO_DATA`: No data available
- `GENERATION_FAILED`: Report generation failed
- `EXPORT_FAILED`: Export failed

## Best Practices

### Client Implementation
1. Implement proper error handling
2. Use appropriate date formats
3. Handle large datasets
4. Implement caching
5. Use appropriate export formats

### Data Management
1. Validate parameters
2. Handle date ranges
3. Implement proper error recovery
4. Use appropriate data types
5. Follow data format standards

## Rate Limiting

- 100 requests per minute for authenticated users
- 10 requests per minute for unauthenticated users
- 5 exports per minute

## Export Options

### Supported Formats
- PDF
- CSV

### Export Features
- Custom styling
- Multiple pages
- Charts and graphs
- Data tables
- Summary sections 