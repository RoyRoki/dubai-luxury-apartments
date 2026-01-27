# Contributing to Dubai Luxury Apartments

Thank you for your interest in contributing to this project! This guide outlines our Git workflow and best practices.

## Git Workflow - Git Flow

We follow the **Git Flow** branching model for managing our codebase.

### Branch Structure

- **`main`** - Production-ready code. All releases are tagged here.
- **`develop`** - Integration branch for features. The latest development changes.
- **`feature/*`** - New features (e.g., `feature/property-search`)
- **`bugfix/*`** - Bug fixes for develop (e.g., `bugfix/fix-contact-form`)
- **`hotfix/*`** - Urgent production fixes (e.g., `hotfix/security-patch`)
- **`release/*`** - Release preparation (e.g., `release/v1.0.0`)

### Workflow Steps

#### 1. Starting a New Feature

```bash
# Switch to develop branch
git checkout develop

# Pull latest changes
git pull origin develop

# Create a new feature branch
git checkout -b feature/your-feature-name

# Work on your feature...
git add .
git commit -m "feat: add your feature description"

# Push to remote
git push -u origin feature/your-feature-name
```

#### 2. Finishing a Feature

```bash
# Switch to develop
git checkout develop

# Pull latest changes
git pull origin develop

# Merge your feature
git merge feature/your-feature-name

# Push to develop
git push origin develop

# Delete the feature branch (optional)
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

#### 3. Creating a Release

```bash
# Create release branch from develop
git checkout develop
git checkout -b release/v1.0.0

# Make release-specific changes (version bumps, changelog, etc.)
git commit -m "chore: prepare release v1.0.0"

# Merge to main
git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"

# Merge back to develop
git checkout develop
git merge release/v1.0.0

# Push everything
git push origin main develop --tags
```

#### 4. Hotfix for Production

```bash
# Create hotfix from main
git checkout main
git checkout -b hotfix/critical-bug

# Fix the bug
git commit -m "fix: resolve critical production bug"

# Merge to main
git checkout main
git merge hotfix/critical-bug
git tag -a v1.0.1 -m "Hotfix v1.0.1"

# Merge to develop
git checkout develop
git merge hotfix/critical-bug

# Push everything
git push origin main develop --tags
```

## Commit Message Convention

We use **Conventional Commits** for clear, standardized commit messages.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat:** A new feature
- **fix:** A bug fix
- **docs:** Documentation only changes
- **style:** Code style changes (formatting, missing semicolons, etc.)
- **refactor:** Code change that neither fixes a bug nor adds a feature
- **perf:** Performance improvement
- **test:** Adding or updating tests
- **chore:** Maintenance tasks (dependencies, build process, etc.)
- **ci:** CI/CD configuration changes
- **build:** Changes to build system or dependencies

### Examples

```bash
# Simple feature
git commit -m "feat: add property filtering by price range"

# Bug fix with scope
git commit -m "fix(header): resolve mobile navigation menu bug"

# Breaking change
git commit -m "feat: redesign contact form

BREAKING CHANGE: contact form API has changed"

# With body
git commit -m "refactor: optimize property card rendering

Improve rendering performance by memoizing expensive calculations
and reducing unnecessary re-renders"
```

## Best Practices

### Commits

- ✅ **Atomic commits** - One logical change per commit
- ✅ **Descriptive messages** - Explain *why*, not just *what*
- ✅ **Test before committing** - Ensure code works and tests pass
- ✅ **Small, focused commits** - Easier to review and revert if needed
- ❌ **Don't commit broken code** - Always commit working code
- ❌ **Don't commit secrets** - Use `.gitignore` for sensitive files

### Branches

- ✅ **Descriptive names** - `feature/property-search` not `fix-stuff`
- ✅ **Keep branches focused** - One feature/fix per branch
- ✅ **Delete merged branches** - Keep repository clean
- ✅ **Pull before push** - Avoid merge conflicts
- ❌ **Don't commit directly to main** - Always use feature branches
- ❌ **Don't let branches get stale** - Merge or close inactive branches

### Code Review

- Always create a **Pull Request** for merging to `develop` or `main`
- Request at least one reviewer
- Address all review comments
- Keep PRs focused and reasonably sized
- Write clear PR descriptions

## Quick Reference

```bash
# Clone repository
git clone git@github.com:RoyRoki/dubai-luxury-apartments.git

# Create feature branch
git checkout -b feature/my-feature develop

# Check status
git status

# Stage changes
git add <files>

# Commit with conventional format
git commit -m "feat: add new feature"

# Push branch
git push -u origin feature/my-feature

# Update your branch with latest develop
git checkout develop
git pull
git checkout feature/my-feature
git merge develop

# View commit history
git log --oneline --graph --all

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

## Getting Help

- Check [Git Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)
- Review [Conventional Commits](https://www.conventionalcommits.org/)
- Ask questions in GitHub Issues

## License

By contributing, you agree that your contributions will be licensed under the project's license.
