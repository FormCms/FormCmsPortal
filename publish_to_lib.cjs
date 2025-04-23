const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Set environment variables
const envVars = {
    VITE_REACT_APP_API_URL: "/api",
    VITE_REACT_APP_API_PORTAL: "/_content/FormCMS/portal",
    VITE_REACT_APP_AUDIT_LOG_ROUTER_PREFIX: "/_content/FormCMS/portal/auth",
};

// Set environment variables dynamically for cross-platform compatibility
const env = { ...process.env, ...envVars };

// Build the project
execSync("tsc && vite build --base /_content/FormCMS/portal/", { stdio: "inherit", env });

// Remove the old folder
const portalPath = path.resolve("../formCms/server/FormCMS/wwwroot/portal");
fs.rmSync(portalPath, { recursive: true, force: true });

// Copy new build files
execSync(`rsync -azv --progress dist/* ${portalPath}`, { stdio: "inherit" });

// Git add changes
execSync("git add .", { cwd: portalPath, stdio: "inherit" });

console.log("✅ Publish completed!");