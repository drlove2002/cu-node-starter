#!/usr/bin/env node
import inquirer from "inquirer";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fse from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Template generators
const generatePackageJson = (projectName) => ({
    "name": projectName,
    "version": "1.0.0",
    "description": "",
    "main": "dist/index.js",
    "type": "module",
    "scripts": {
        "dev": "tsx watch src/index.ts",
        "build": "tsc",
        "start": "node dist/index.js"
    },
    "keywords": [],
    "author": "",
    "license": "MIT"
});

const generateTsConfig = () => ({
    "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "moduleResolution": "node",
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "resolveJsonModule": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist", "public"]
});


(async () => {
    console.log(chalk.green("\n🚀 CU Node Starter\n"));

    const answers = await inquirer.prompt([
        {
            name: "projectName",
            message: "Project name:",
            default: "my-app",
            validate: input => /^[a-z0-9-_]+$/.test(input) || "Use lowercase letters, numbers, hyphens, and underscores only"
        },
        {
            name: "dbName",
            message: "Database name:",
            default: answers => answers.projectName.replace(/-/g, '_')
        },
        { name: "dbUser", message: "DB user:", default: "root" },
        { name: "dbPassword", message: "DB password:", type: "password", default: "" },
        { name: "dbHost", message: "DB host:", default: "localhost" },
        { name: "dbPort", message: "DB port:", default: "3306" }
    ]);

    const projectPath = path.join(process.cwd(), answers.projectName);

    console.log(chalk.blue("\n📁 Creating project structure...\n"));

    // Copy template files using fs-extra
    try {
        await fse.copy(path.join(__dirname, 'template'), projectPath);
        console.log(chalk.green("✅ Template files copied successfully!"));
    } catch (err) {
        console.error(chalk.red("❌ Error copying template files:"));
        console.error(err);
        process.exit(1);
    }


    // Generate configuration files dynamically
    console.log(chalk.yellow("📝 Generating configuration files..."));

    // Generate basic package.json (no dependencies)
    const packageJson = generatePackageJson(answers.projectName);
    fs.writeFileSync(
        path.join(projectPath, "package.json"),
        JSON.stringify(packageJson, null, 2)
    );

    // Generate tsconfig.json
    const tsConfig = generateTsConfig();
    fs.writeFileSync(
        path.join(projectPath, "tsconfig.json"),
        JSON.stringify(tsConfig, null, 2)
    );

    // Generate .env
    const envContent = `# Database Configuration
DB_HOST=${answers.dbHost}
DB_PORT=${answers.dbPort}
DB_USER=${answers.dbUser}
DB_PASSWORD=${answers.dbPassword}
DB_NAME=${answers.dbName}

# Server Configuration
PORT=3000
NODE_ENV=development
`;
    fs.writeFileSync(path.join(projectPath, ".env"), envContent);

    console.log(chalk.blue("\n📦 Installing dependencies...\n"));

    try {
        // Install production dependencies
        console.log(chalk.yellow("Installing production dependencies..."));
        execSync("npm add express mysql2 dotenv cors body-parser", { cwd: projectPath, stdio: "inherit" });

        // Install development dependencies
        console.log(chalk.yellow("Installing development dependencies..."));
        execSync("npm add -D @types/express @types/cors @types/node typescript tsx", { cwd: projectPath, stdio: "inherit" });

        console.log(chalk.green(`\n✅ Project "${answers.projectName}" created successfully!\n`));
        console.log(chalk.cyan("🚀 Quick start:"));
        console.log(chalk.white(`   cd ${answers.projectName}`));
        console.log(chalk.white(`   npm run dev`));
        console.log(chalk.cyan("\n📖 What's included:"));
        console.log(chalk.white("   • Express + TypeScript backend"));
        console.log(chalk.white("   • MySQL2 database connection"));
        console.log(chalk.white("   • Vite frontend build system"));
        console.log(chalk.white("   • Sample routes and frontend code"));
        console.log(chalk.white("   • Pre-styled CSS components"));
        console.log(chalk.cyan("\n🌐 Servers:"));
        console.log(chalk.white("   • Backend: http://localhost:3000"));
        console.log(chalk.white("   • Frontend: http://localhost:5173"));
        console.log(chalk.gray("\n💡 Frontend proxies API calls to backend automatically\n"));

    } catch (error) {
        console.error(chalk.red("\n❌ Error during installation:"));
        console.error(error.message);
        process.exit(1);
    }
})();