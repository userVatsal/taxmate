# Authentication API

## Overview

The Authentication API provides endpoints for user registration, login, and session management.

## Endpoints

### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Response

```json
{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "token": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 3600
  }
}
```

#### Error Responses

```json
{
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "Email already registered"
  }
}
```

```json
{
  "error": {
    "code": "INVALID_PASSWORD",
    "message": "Password must be at least 8 characters"
  }
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Response

```json
{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "token": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 3600
  }
}
```

#### Error Responses

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

```json
{
  "error": {
    "code": "ACCOUNT_LOCKED",
    "message": "Account is locked. Try again in 15 minutes"
  }
}
```

### Logout

```http
POST /api/auth/logout
Authorization: Bearer <access_token>
```

#### Response

```json
{
  "message": "Successfully logged out"
}
```

#### Error Responses

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

### Refresh Token

```http
POST /api/auth/refresh
Authorization: Bearer <refresh_token>
```

#### Response

```json
{
  "token": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 3600
  }
}
```

#### Error Responses

```json
{
  "error": {
    "code": "INVALID_REFRESH_TOKEN",
    "message": "Invalid or expired refresh token"
  }
}
```

### Verify Email

```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "token": "verification_token"
}
```

#### Response

```json
{
  "message": "Email verified successfully"
}
```

#### Error Responses

```json
{
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired verification token"
  }
}
```

### Request Password Reset

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Response

```json
{
  "message": "Password reset instructions sent to email"
}
```

#### Error Responses

```json
{
  "error": {
    "code": "EMAIL_NOT_FOUND",
    "message": "No account found with this email"
  }
}
```

### Reset Password

```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token",
  "password": "new_password123"
}
```

#### Response

```json
{
  "message": "Password reset successfully"
}
```

#### Error Responses

```json
{
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired reset token"
  }
}
```

## Authentication Flow

1. User registers with email and password
2. System sends verification email
3. User verifies email
4. User logs in with credentials
5. System returns access and refresh tokens
6. Client uses access token for API requests
7. When access token expires, use refresh token to get new tokens
8. User can logout to invalidate tokens

## Token Management

### Access Token
- JWT format
- Contains user ID and permissions
- Expires in 1 hour
- Used for API authentication

### Refresh Token
- JWT format
- Contains user ID
- Expires in 7 days
- Used to get new access tokens

## Security Considerations

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Rate Limiting
- 5 requests per minute for registration
- 10 requests per minute for login
- 20 requests per minute for other endpoints

### Session Management
- Access tokens expire in 1 hour
- Refresh tokens expire in 7 days
- Multiple sessions allowed
- Session tracking and management

## Error Codes

### Authentication Errors
- `INVALID_CREDENTIALS`: Wrong email or password
- `ACCOUNT_LOCKED`: Too many failed attempts
- `EMAIL_EXISTS`: Email already registered
- `INVALID_PASSWORD`: Password doesn't meet requirements
- `INVALID_TOKEN`: Invalid or expired token
- `EMAIL_NOT_FOUND`: No account with this email
- `UNAUTHORIZED`: Invalid or expired access token
- `INVALID_REFRESH_TOKEN`: Invalid or expired refresh token

## Best Practices

### Client Implementation
1. Store tokens securely
2. Implement token refresh logic
3. Handle token expiration
4. Implement proper error handling
5. Use HTTPS for all requests

### Security Measures
1. Use strong passwords
2. Enable 2FA when available
3. Monitor login attempts
4. Implement proper session management
5. Follow security best practices 