# TaxMate Pages & Roles

## Public Pages

### Landing Page (/)
- Marketing content
- Feature highlights
- Pricing plans
- Call-to-action buttons
- Testimonials
- FAQ section

### Authentication Pages
- Login (/auth/login)
- Register (/auth/register)
- Forgot Password (/auth/forgot-password)
- Reset Password (/auth/reset-password)
- Email Verification (/auth/verify-email)

## Protected Pages

### Dashboard (/dashboard)
- Overview statistics
- Recent transactions
- Quick actions
- Notifications
- Tax status summary

### Transactions (/transactions)
- Transaction list
- Filtering and sorting
- Search functionality
- Bulk actions
- Export options
- Upload bank statements

### Reports (/reports)
- Income summary
- Expense breakdown
- Tax liability
- Profit/loss statement
- Custom reports
- Export functionality

### Settings (/settings)
- Profile settings
- Account settings
- Notification preferences
- API keys
- Connected accounts
- Billing information

## User Roles

### Free User
- Basic transaction management
- Limited reports
- Basic AI features
- Email support
- 1GB storage

### Pro User
- All Free features
- Advanced transaction management
- Full reporting suite
- Advanced AI features
- Priority support
- 10GB storage
- Custom categories
- Bulk operations

### Enterprise User
- All Pro features
- Custom integrations
- Dedicated support
- Unlimited storage
- Team management
- Advanced security
- Custom branding
- API access

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh
- POST /api/auth/verify-email
- POST /api/auth/reset-password

### Transactions
- GET /api/transactions
- POST /api/transactions
- GET /api/transactions/:id
- PUT /api/transactions/:id
- DELETE /api/transactions/:id
- POST /api/transactions/upload
- GET /api/transactions/categories

### Reports
- GET /api/reports/income
- GET /api/reports/expenses
- GET /api/reports/tax
- GET /api/reports/profit-loss
- POST /api/reports/custom
- GET /api/reports/export

### Settings
- GET /api/settings/profile
- PUT /api/settings/profile
- GET /api/settings/account
- PUT /api/settings/account
- GET /api/settings/notifications
- PUT /api/settings/notifications
- GET /api/settings/api-keys
- POST /api/settings/api-keys
- DELETE /api/settings/api-keys/:id

## Domain Structure

### Main Domain
- taxmate.uk

### Subdomains
- app.taxmate.uk (Main application)
- api.taxmate.uk (API endpoints)
- docs.taxmate.uk (Documentation)
- blog.taxmate.uk (Blog)
- support.taxmate.uk (Support portal)

## Security & Access Control

### Authentication
- JWT-based authentication
- Refresh token rotation
- Session management
- Rate limiting
- IP-based restrictions

### Authorization
- Role-based access control
- Resource-level permissions
- API key management
- OAuth integration
- SSO support

### Data Protection
- End-to-end encryption
- Secure data storage
- Data retention policies
- Audit logging
- Backup systems 