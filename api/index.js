const express = require('express');
const app = express();

app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    
    if (!code) {
        return res.status(400).send('授权失败：未提供授权码');
    }

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Google 授权完成</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    text-align: center;
                    line-height: 1.6;
                    background-color: #f9f9f9;
                }
                h1 {
                    color: #333;
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                .success-icon {
                    color: #0f0;
                    font-size: 48px;
                    margin: 20px 0;
                }
                .code-container {
                    margin: 20px auto;
                    max-width: 90%;
                    position: relative;
                }
                .code-box {
                    padding: 15px;
                    background: #fff;
                    border: 2px solid #4285f4;
                    border-radius: 5px;
                    word-break: break-all;
                    text-align: left;
                    font-family: monospace;
                    font-size: 16px;
                    color: #333;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .copy-btn {
                    background-color: #4285f4;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: bold;
                    margin-top: 15px;
                    transition: background-color 0.3s;
                }
                .copy-btn:hover {
                    background-color: #3367d6;
                }
                .copy-btn:active {
                    background-color: #2a56c6;
                }
                .instructions {
                    margin-top: 25px;
                    background-color: #fff;
                    padding: 15px;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .steps {
                    text-align: left;
                    display: inline-block;
                }
                .highlight {
                    color: #d23f31;
                    font-weight: bold;
                }
                .notification {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 10px 20px;
                    background-color: rgba(0, 0, 0, 0.7);
                    color: white;
                    border-radius: 5px;
                    display: none;
                    z-index: 1000;
                }
            </style>
        </head>
        <body>
            <div id="notification" class="notification">已复制到剪贴板</div>
            
            <h1>Google 授权成功</h1>
            <div class="success-icon">✓</div>
            <p>请复制以下授权码，并粘贴到微信小程序中：</p>
            
            <div class="code-container">
                <div class="code-box" id="authCode">${code}</div>
            </div>
            
            <button class="copy-btn" onclick="copyCodeAndAlert()">复制授权码</button>
            
            <div class="instructions">
                <p><strong>完成步骤：</strong></p>
                <ol class="steps">
                    <li>点击上方"复制授权码"按钮</li>
                    <li>返回微信小程序</li>
                    <li><span class="highlight">在小程序底部输入框粘贴授权码</span></li>
                    <li><span class="highlight">点击"提交"按钮完成登录</span></li>
                </ol>
            </div>

            <script>
                function copyCodeAndAlert() {
                    const codeText = document.getElementById('authCode').innerText;
                    
                    // 复制到剪贴板
                    navigator.clipboard.writeText(codeText)
                        .then(() => {
                            // 显示通知
                            const notification = document.getElementById('notification');
                            notification.style.display = 'block';
                            
                            // 3秒后隐藏通知
                            setTimeout(() => {
                                notification.style.display = 'none';
                            }, 3000);
                            
                            // 更改按钮状态
                            const copyBtn = document.querySelector('.copy-btn');
                            copyBtn.textContent = '✓ 已复制';
                            copyBtn.style.backgroundColor = '#0f9d58';
                            
                            // 5秒后恢复按钮状态
                            setTimeout(() => {
                                copyBtn.textContent = '复制授权码';
                                copyBtn.style.backgroundColor = '#4285f4';
                            }, 5000);
                        })
                        .catch(err => {
                            console.error('复制失败:', err);
                            alert('复制失败，请手动复制授权码');
                        });
                }
                
                // 页面加载完成后聚焦授权码
                window.onload = function() {
                    const codeBox = document.getElementById('authCode');
                    const range = document.createRange();
                    range.selectNode(codeBox);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                };
            </script>
        </body>
        </html>
    `);
});

// 添加根路径处理
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Google OAuth 服务</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    text-align: center;
                    line-height: 1.6;
                }
                h1 {
                    color: #333;
                }
            </style>
        </head>
        <body>
            <h1>Google OAuth 服务</h1>
            <p>这是一个用于处理 Google OAuth 回调的服务。</p>
            <p>请通过微信小程序发起 Google 登录请求。</p>
        </body>
        </html>
    `);
});

module.exports = app;
