<?php
/**
 * API Test Page - Test auth endpoints
 * URL: http://localhost/info-loker/test-api.php
 */
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Test - JobRescue</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { color: #667eea; margin-bottom: 20px; }
        .test-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .test-section h2 {
            color: #333;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #555;
        }
        input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
        }
        button {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: background 0.3s;
        }
        button:hover { background: #5568d3; }
        .result {
            margin-top: 15px;
            padding: 15px;
            border-radius: 8px;
            display: none;
        }
        .result.success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        .result.error {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
        pre {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
            margin-top: 10px;
        }
        .info {
            background: #d1ecf1;
            border: 1px solid #bee5eb;
            color: #0c5460;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 API Test - JobRescue</h1>
        
        <div class="info">
            <strong>ℹ️ Info:</strong> Gunakan halaman ini untuk test API authentication secara langsung.
        </div>

        <!-- Test Login -->
        <div class="test-section">
            <h2>1. Test Login API</h2>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" id="loginEmail" value="elang@gmail.com" placeholder="Email">
            </div>
            <div class="form-group">
                <label>Password:</label>
                <input type="password" id="loginPassword" value="11111111" placeholder="Password">
            </div>
            <button onclick="testLogin()">🔐 Test Login</button>
            <div id="loginResult" class="result"></div>
        </div>

        <!-- Test Me -->
        <div class="test-section">
            <h2>2. Test Current User (Me)</h2>
            <button onclick="testMe()">👤 Get Current User</button>
            <div id="meResult" class="result"></div>
        </div>

        <!-- Test Register -->
        <div class="test-section">
            <h2>3. Test Register API</h2>
            <div class="form-group">
                <label>Name:</label>
                <input type="text" id="regName" value="Test User" placeholder="Full Name">
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" id="regEmail" value="test@example.com" placeholder="Email">
            </div>
            <div class="form-group">
                <label>Password:</label>
                <input type="password" id="regPassword" value="123456" placeholder="Password (min 6 chars)">
            </div>
            <button onclick="testRegister()">📝 Test Register</button>
            <div id="regResult" class="result"></div>
        </div>

        <!-- Test Logout -->
        <div class="test-section">
            <h2>4. Test Logout API</h2>
            <button onclick="testLogout()">🚪 Test Logout</button>
            <div id="logoutResult" class="result"></div>
        </div>

        <!-- Direct API Check -->
        <div class="test-section">
            <h2>5. Direct API File Check</h2>
            <button onclick="checkApiFile()">📄 Check API File</button>
            <div id="apiFileResult" class="result"></div>
        </div>
    </div>

    <script>
        async function testLogin() {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const resultDiv = document.getElementById('loginResult');
            
            try {
                const response = await fetch('api/auth.php?action=login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                resultDiv.style.display = 'block';
                if (data.ok) {
                    resultDiv.className = 'result success';
                    resultDiv.innerHTML = `
                        <strong>✅ Login Success!</strong>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    `;
                } else {
                    resultDiv.className = 'result error';
                    resultDiv.innerHTML = `
                        <strong>❌ Login Failed</strong>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    `;
                }
            } catch (error) {
                resultDiv.style.display = 'block';
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `<strong>❌ Error:</strong> ${error.message}`;
            }
        }

        async function testMe() {
            const resultDiv = document.getElementById('meResult');
            
            try {
                const response = await fetch('api/auth.php?action=me', {
                    credentials: 'include'
                });
                const data = await response.json();
                
                resultDiv.style.display = 'block';
                resultDiv.className = 'result success';
                resultDiv.innerHTML = `
                    <strong>Current User:</strong>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                `;
            } catch (error) {
                resultDiv.style.display = 'block';
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `<strong>❌ Error:</strong> ${error.message}`;
            }
        }

        async function testRegister() {
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const resultDiv = document.getElementById('regResult');
            
            try {
                const response = await fetch('api/auth.php?action=register', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                
                const data = await response.json();
                
                resultDiv.style.display = 'block';
                if (data.ok) {
                    resultDiv.className = 'result success';
                    resultDiv.innerHTML = `
                        <strong>✅ Register Success!</strong>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    `;
                } else {
                    resultDiv.className = 'result error';
                    resultDiv.innerHTML = `
                        <strong>❌ Register Failed</strong>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    `;
                }
            } catch (error) {
                resultDiv.style.display = 'block';
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `<strong>❌ Error:</strong> ${error.message}`;
            }
        }

        async function testLogout() {
            const resultDiv = document.getElementById('logoutResult');
            
            try {
                const response = await fetch('api/auth.php?action=logout', {
                    method: 'POST',
                    credentials: 'include'
                });
                const data = await response.json();
                
                resultDiv.style.display = 'block';
                resultDiv.className = 'result success';
                resultDiv.innerHTML = `
                    <strong>✅ Logout Success</strong>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                `;
            } catch (error) {
                resultDiv.style.display = 'block';
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `<strong>❌ Error:</strong> ${error.message}`;
            }
        }

        async function checkApiFile() {
            const resultDiv = document.getElementById('apiFileResult');
            
            try {
                const response = await fetch('api/auth.php');
                const text = await response.text();
                
                resultDiv.style.display = 'block';
                if (response.ok) {
                    resultDiv.className = 'result success';
                    resultDiv.innerHTML = `
                        <strong>✅ API File Accessible</strong>
                        <p>Status: ${response.status}</p>
                        <pre>${text.substring(0, 500)}${text.length > 500 ? '...' : ''}</pre>
                    `;
                } else {
                    resultDiv.className = 'result error';
                    resultDiv.innerHTML = `
                        <strong>❌ API File Error</strong>
                        <p>Status: ${response.status}</p>
                        <pre>${text}</pre>
                    `;
                }
            } catch (error) {
                resultDiv.style.display = 'block';
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `<strong>❌ Error:</strong> ${error.message}`;
            }
        }
    </script>
</body>
</html>
