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
                .modal {
                    display: none;
                    position: fixed;
                    z-index: 1000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                }
                .modal-content {
                    background-color: white;
                    margin: 20% auto;
                    padding: 20px;
                    width: 80%;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                .input-area {
                    margin: 15px 0;
                }
                .code-input {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-family: monospace;
                    font-size: 16px;
                }
                .action-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                }
                .action-btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                }
                .submit-btn {
                    background-color: #07c160;
                    color: white;
                }
                .cancel-btn {
                    background-color: #f5f5f5;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <h1>Google 授权成功</h1>
            <p>请点击下方按钮复制授权码：</p>
            <div class="code-box" id="authCode">${code}</div>
            <button class="copy-btn" onclick="copyCodeAndShowModal()">复制授权码</button>
            <div class="instructions">
                <p>完成步骤：</p>
                <ol>
                    <li>点击"复制授权码"按钮</li>
                    <li><span class="highlight">在小程序底部粘贴授权码并提交</span></li>
                </ol>
            </div>

            <!-- 输入窗口 -->
            <div id="inputModal" class="modal">
                <div class="modal-content">
                    <h2>验证授权码</h2>
                    <p>请确认以下授权码是否正确：</p>
                    <div class="input-area">
                        <input type="text" class="code-input" id="codeInput" readonly />
                    </div>
                    <div class="action-buttons">
                        <button class="action-btn cancel-btn" onclick="closeModal()">取消</button>
                        <button class="action-btn submit-btn" onclick="returnToMiniProgram()">确认并返回小程序</button>
                    </div>
                </div>
            </div>

            <script>
                // 复制授权码并显示模态框
                function copyCodeAndShowModal() {
                    const codeText = document.getElementById('authCode').innerText;
                    navigator.clipboard.writeText(codeText)
                        .then(() => {
                            // 显示模态框并填充输入框
                            document.getElementById('codeInput').value = codeText;
                            document.getElementById('inputModal').style.display = 'block';
                        })
                        .catch(err => {
                            alert('复制失败，请手动复制授权码');
                            console.error('复制失败:', err);
                        });
                }

                // 关闭模态框
                function closeModal() {
                    document.getElementById('inputModal').style.display = 'none';
                }

                // 返回微信小程序
                function returnToMiniProgram() {
                    alert('授权码已复制，请返回微信小程序粘贴');
                    closeModal();
                    
                    // 提示用户返回小程序
                    setTimeout(() => {
                        // 尝试使用微信小程序的返回能力（如果在小程序WebView中）
                        try {
                            wx.miniProgram.navigateBack();
                        } catch (e) {
                            console.log('不在小程序WebView环境中，无法自动返回');
                        }
                    }, 1000);
                }

                // 点击模态框背景时关闭
                window.onclick = function(event) {
                    const modal = document.getElementById('inputModal');
                    if (event.target == modal) {
                        closeModal();
                    }
                }
            </script>
        </body>
        </html>
    `);
});

module.exports = app;
