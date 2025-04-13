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
                }
                h1 {
                    color: #333;
                    font-size: 24px;
                }
                .code-box {
                    margin: 20px auto;
                    padding: 15px;
                    background: #f5f5f5;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    word-break: break-all;
                    text-align: left;
                    font-family: monospace;
                    max-width: 90%;
                }
                .copy-btn {
                    background-color: #4285f4;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                }
                .instructions {
                    margin-top: 20px;
                    color: #666;
                }
                .highlight {
                    color: #ff0000;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <h1>Google 授权成功</h1>
            <p>请复制以下授权码，并粘贴到微信小程序中：</p>
            <div class="code-box" id="authCode">${code}</div>
            <button class="copy-btn" onclick="copyCode()">复制授权码</button>
            <div class="instructions">
                <p>完成步骤：</p>
                <ol>
                    <li>点击"复制授权码"按钮</li>
                    <li><span class="highlight">在小程序底部粘贴授权码并提交</span></li>
                </ol>
            </div>

            <script>
                function copyCode() {
                    const codeText = document.getElementById('authCode').innerText;
                    navigator.clipboard.writeText(codeText)
                        .then(() => {
                            alert('授权码已复制到剪贴板');
                        })
                        .catch(err => {
                            alert('复制失败，请手动复制授权码');
                            console.error('复制失败:', err);
                        });
                }
            </script>
        </body>
        </html>
    `);
});

module.exports = app;
