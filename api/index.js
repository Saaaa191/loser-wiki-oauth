const express = require('express');
const axios = require('axios');
const app = express();

app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    
    if (!code) {
        return res.status(400).send('No authorization code provided');
    }

    // 返回一个简单的 HTML 页面，包含重定向到小程序的代码
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Google OAuth Callback</title>
            <script>
                // 将授权码传递给小程序
                window.location.href = 'weixin://dl/business/?t=YOUR_BUSINESS_ID&code=${code}';
            </script>
        </head>
        <body>
            <p>正在重定向到小程序...</p>
        </body>
        </html>
    `);
});

module.exports = app;
