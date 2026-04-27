const http = require('http');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const { handleStudentRoutes } = require('./routes/students');

const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;

// Read HTML files
const landing = fs.readFileSync('./landing_page.html');
const home = fs.readFileSync('./home.html');
const dashboard = fs.readFileSync('./admin_dashboard.html');
const contact = fs.readFileSync('./contact2_us.html');
const about = fs.readFileSync('./About_us.html');
const log_sign = fs.readFileSync('./login_signup.html');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student_management')
    .then(() => {
        console.log(' Connected to MongoDB');
        console.log(' Database: student_management');
    })
    .catch((err) => {
        console.error(' MongoDB connection error:', err.message);
        console.log('  Running without database - data will not persist');
    });

const server = http.createServer(async (req, res) => {
    console.log(" Request:", req.method, req.url);
    
    // Add CORS headers to all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Handle API routes first
    const isApiRoute = await handleStudentRoutes(req, res);
    if (isApiRoute) {
        console.log(" API route handled");
        return;
    }

    let filePath = req.url.substring(1);
    console.log(" Looking for file:", filePath);

    // Handle root URL
    if (filePath === '') {
        filePath = 'landing_page.html';
    }

    // Handle CSS
    if (filePath.endsWith('.css')) {
        const fullPath = path.join(__dirname, filePath);
        console.log(" CSS Path:", fullPath);

        fs.readFile(fullPath, (err, data) => {
            if (err) {
                console.log("❌ CSS not found:", fullPath);
                res.writeHead(404);
                res.end('/* CSS file not found */');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
        return;
    }

    // Handle Images
    const ext = path.extname(filePath).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        const fullPath = path.join(__dirname, filePath);
        console.log(" Image Path:", fullPath);

        fs.readFile(fullPath, (err, data) => {
            if (err) {
                console.log(" ERROR loading image:", err.message);
                res.writeHead(404);
                res.end('Image not found');
                return;
            }

            const mimeTypes = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif'
            };

            res.writeHead(200, { 'Content-Type': mimeTypes[ext] });
            res.end(data);
        });
        return;
    }

    // Handle JavaScript
    if (filePath.endsWith('.js')) {
        const fullPath = path.join(__dirname, filePath);
        console.log(" JS Path:", fullPath);

        fs.readFile(fullPath, (err, data) => {
            if (err) {
                console.log(" ERROR loading JS:", err.message);
                res.writeHead(404);
                res.end('// JavaScript file not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
        return;
    }

    // Handle HTML pages
    res.setHeader('Content-Type', 'text/html');

    if (filePath === 'landing_page.html') {
        console.log(" Serving landing page");
        res.writeHead(200);
        res.end(landing);
    }
    else if (filePath === 'home.html') {
        console.log(" Serving home page");
        res.writeHead(200);
        res.end(home);
    }
    else if (filePath === 'admin_dashboard.html') {
        console.log(" Serving dashboard");
        res.writeHead(200);
        res.end(dashboard);
    }
    else if (filePath === 'contact2_us.html') {
        console.log(" Serving contact page");
        res.writeHead(200);
        res.end(contact);
    }
    else if (filePath === 'About_us.html') {
        console.log(" Serving about page");
        res.writeHead(200);
        res.end(about);
    }
    else if (filePath === 'login_signup.html') {
        console.log(" Serving login/signup page");
        res.writeHead(200);
        res.end(log_sign);
    }
    else {
        console.log(" 404 Not Found:", filePath);
        res.writeHead(404);
        res.end('<h1>404 Not Found</h1>');
    }
});

server.listen(port, hostname, () => {
    console.log(` Server running at http://${hostname}:${port}/`);
    console.log(` API endpoint: http://${hostname}:${port}/api/students`);
    console.log(` Dashboard: http://${hostname}:${port}/admin_dashboard.html`);
    console.log(` Home: http://${hostname}:${port}/home.html`);
});