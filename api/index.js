const express = require('express');
const app = express();

app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    
    if (!code) {
        return res.status(400).send('No authorization code provided');
    }

    // 修改为正确的微信小程序回跳方式
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Google OAuth Callback</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    text-align: center;
                }
                .code-container {
                    margin: 20px 0;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                    word-break: break-all;
                }
                .button {
                    background-color: #4CAF50;
                    border: none;
                    color: white;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 10px 2px;
                    cursor: pointer;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <h2>授权成功</h2>
            <p>您的授权码：</p>
            <div class="code-container">
                <code>${code}</code>
            </div>
            <p>请复制此授权码，并返回小程序完成登录。</p>
            <button class="button" onclick="copyCode()">复制授权码</button>
            
            <script>
                function copyCode() {
                    const codeText = '${code}';
                    navigator.clipboard.writeText(codeText)
                        .then(() => {
                            alert('授权码已复制到剪贴板');
                        })
                        .catch(err => {
                            console.error('复制失败: ', err);
                            alert('复制失败，请手动复制');
                        });
                }
            </script>
        </body>
        </html>
    `);
});

module.exports = app;
