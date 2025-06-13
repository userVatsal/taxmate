# Contributing to TaxMate

Thank you for your interest in contributing to TaxMate! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/taxmate.git
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/original-owner/taxmate.git
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   npm run setup-env
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

1. Keep your fork up to date:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. Make your changes:
   - Write clear, descriptive commit messages
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

3. Run tests:
   ```bash
   npm test
   ```

4. Run linting:
   ```bash
   npm run lint
   ```

5. Build the project:
   ```bash
   npm run build
   ```

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation with any new features or changes
3. The PR will be merged once you have the sign-off of at least one other developer
4. Make sure all tests pass and there are no linting errors

## Style Guide

### TypeScript

- Use TypeScript for all new code
- Follow the TypeScript style guide
- Use proper type annotations
- Avoid using `any` type

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types
- Implement error boundaries where appropriate

### CSS

- Use Tailwind CSS for styling
- Follow the existing design system
- Keep styles modular and reusable
- Use CSS variables for theming

### Testing

- Write unit tests for all new features
- Use React Testing Library
- Follow the testing best practices
- Maintain good test coverage

## Documentation

### Code Documentation

- Document all functions and components
- Use JSDoc comments
- Keep documentation up to date
- Include examples where helpful

### API Documentation

- Document all API endpoints
- Include request/response examples
- Document error cases
- Keep API documentation in sync with code

## Git Workflow

### Branch Naming

- feature/feature-name
- bugfix/bug-name
- hotfix/issue-name
- release/version

### Commit Messages

Follow the conventional commits specification:

```
type(scope): subject

body

footer
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance tasks

### Pull Request Template

```markdown
## Description
[Describe your changes here]

## Related Issues
[Link to related issues]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective
- [ ] New and existing tests pass locally
```

## Review Process

1. Code review by maintainers
2. Automated checks must pass
3. Documentation must be updated
4. Tests must be added/updated
5. Changes must be properly tested

## Release Process

1. Version bump
2. Changelog update
3. Tag creation
4. Release notes
5. Deployment

## Support

For questions or help:
1. Check the documentation
2. Search existing issues
3. Create a new issue
4. Join our community chat

## License

By contributing, you agree that your contributions will be licensed under the project's license. 