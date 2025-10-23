# Personal Website

This is a Personal Website for me that has some of my accomplishments, skills and experience.
I also plan to add a blog later


## Quick Start

```bash
./start.sh
```

## Backend (Flask + Python)

### Testing
```bash
cd backend
source venv/bin/activate
python -m pytest  # When tests are added
```

### Code Formatting
**Format all Python files:**
```bash
cd backend
black .
```

### Linting
**Run Pylint:**
```bash
cd backend
pylint *.py
```

**Run MyPy type checker:**
```bash
cd backend
mypy .
```

## Frontend (React + TypeScript)

### Testing
```bash
cd frontend
npm test
```

### Code Formatting
**Format all files:**
```bash
cd frontend
npm run format
```

### Linting
**Check for linting errors:**
```bash
cd frontend
npm run lint
```

**Auto-fix linting issues:**
```bash
cd frontend
npm run lint:fix
```