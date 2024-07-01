# NestJS Boilerplate

Welcome to the NestJS Boilerplate! This project is a robust, ready-to-use starting point for your NestJS applications. It includes a comprehensive setup with best practices for security, logging, API documentation, validation, and more.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Husky and Lint Staged](#husky-and-lint-staged)
- [Swagger API Documentation](#swagger-api-documentation)
- [Logging](#logging)
- [Security](#security)
- [Validation](#validation)
- [Versioning](#versioning)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Features

- **Global Error Handling**: Custom HTTP exception filters.
- **Request Validation**: DTOs with class validators and transformation.
- **API Documentation**: Swagger integration for interactive API docs.
- **Security**: Implemented security headers using `helmet`.
- **Logging**: Comprehensive logging with `winston` and `morgan`.
- **Rate Limiting**: Basic rate limiting to prevent abuse.
- **CORS**: Configurable Cross-Origin Resource Sharing.
- **Pre-commit Hooks**: Husky and lint-staged setup for code quality.
- **Versioning**: API versioning enabled for easy evolution.
- **Environment Configuration**: Supports environment-specific configurations.

## 🛠️ Prerequisites

- Node.js (>= 14.x)
- Yarn (>= 1.x) or npm (>= 6.x)

## 📦 Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/abhishekode/nest-base.git
    cd nest-base
    ```

2. **Use Node Version**:
    ```bash
    nvm use
    ```

3. **Install dependencies**:
    ```bash
    yarn install
    ```
    or
    ```bash
    npm install
    ```

4. **Set up environment variables**:
    - Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    - Modify the `.env` file with your specific settings.

## 🚀 Usage

1. **Run the application**:
    ```bash
    yarn start:dev
    ```
    or
    ```bash
    npm run start:dev
    ```

2. **Access API documentation**:
    - Visit [http://localhost:3000/swagger-doc](http://localhost:3000/swagger-doc) to explore the API using Swagger.

## 📜 Scripts

- **Start the application**: `yarn start` or `npm run start`
- **Development mode**: `yarn start:dev` or `npm run start:dev`
- **Build the application**: `yarn build` or `npm run build`
- **Run tests**: `yarn test` or `npm run test`
- **Lint code**: `yarn lint` or `npm run lint`
- **Format code**: `yarn format` or `npm run format`

## ⚙️ Configuration

The application uses environment variables for configuration. Update the `.env` file with your settings.

## 🔧 Husky and Lint Staged

This project uses Husky and lint-staged for managing pre-commit hooks to ensure code quality.

- **Husky**: Manages Git hooks and ensures they are run locally.
- **Lint Staged**: Runs linters on staged files only, improving performance and enforcing code quality.

### Setup

Husky and lint-staged are already configured in this project. The relevant configurations are in `package.json`.

#### Pre-commit Hook

- Runs `eslint` and `prettier` on staged files before committing.

#### Commit Message Hook

- Ensures commit messages follow a consistent format.

## 📚 Swagger API Documentation

The project includes Swagger for API documentation.

- **Setup**: The Swagger setup is in `main.ts`.
- **Access**: Visit [http://localhost:3000/swagger-doc](http://localhost:3000/swagger-doc) for the documentation.

## 📝 Logging

The application uses `winston` for logging, integrated with `morgan` for HTTP request logging.

- **Log Levels**: `info`, `warn`, `error`.
- **Log Files**: Errors are logged to `app-error.log`.
- **Console Output**: Logs are also output to the console for easy debugging.

## 🔐 Security

Security features include:

- **Helmet**: Sets various HTTP headers for security.
- **Rate Limiting**: Limits the number of requests to prevent abuse.
- **CORS**: Configurable to allow specific domains.

## ✅ Validation

- **ValidationPipe**: Used globally for request validation and transformation.
- **DTOs**: Define the structure and validation rules for incoming data.

## 🌐 Versioning

- **API Versioning**: Enabled using URI versioning (e.g., `/api/v1`).

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) for more information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
