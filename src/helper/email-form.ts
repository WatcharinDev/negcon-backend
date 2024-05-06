export const emailForm = (email:string,url:string) => {

    return  `
   
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
            /* Reset styles for email client compatibility */
            body, html {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f5f5f5;
                text-align: center;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
            }
            h2 {
                color: #333333;
            }
            p {
                color: #666666;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #FFFFFF !important;
                text-decoration: none;
                border-radius: 4px;
            }
            .button:hover {
                background-color: #0056b3;
                color:#FFFFFF;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Password Reset</h2>
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <a class="button" href=${url}>Reset Password</a>
            <p>If you didn't request this, please ignore this email.</p>
        </div>
    </body>
    </html>
    
    `
}