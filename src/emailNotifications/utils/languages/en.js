module.exports = {
  WELCOME_NOTIFICATION: (params) => ({
    subject: "Welcome To Aerpace",
    body: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
    
          body {
            font-family: "Poppins", sans-serif;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            font-size: 16px;
          }
    
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px 40px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
    
          .header {
            background-color: #000;
            padding: 10px;
            padding-top:15px;
            text-align: center;
            color: #fff;
          }
    
          .header img {
            max-width: 150px;
            margin-top: 10px;
            margin-bottom: 10px;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
    
          h2 {
            font-size: 24px;
            margin-top: 10px;
          }
    
          .content p {
            color: #333;
            line-height: 1.6;
            margin: 20px 0;
            padding-top:10px;
          }
   
    
          .footer-container {
            display: flex;
           justify-content: space-between;
           padding-bottom: 60px;
           padding-top: 20px;
           border-top: 1px solid #eee;
           background-color: #000;
           padding: 20px;
           color: #fff;
          }
    
          .contact {
            display: flex;
            flex-direction: column;
          }
    
          .contact a {
            color: #fff;
            text-decoration: none;
            
          }
    
          .socials-rights {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            
          }
    
          .socials {
            display:flex;
            align-items: left;
            margin-right: 85px; 
            gap: 10px;         
          }
    
    
          .socials img {
            width: 29px;
            height: auto;
            margin-right:10px;
          }
    
          .rights {
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="header">
            <img
              src="https://aerpace-images.s3.ap-south-1.amazonaws.com/Aerpace+logo.png"
              alt="Aerpace Logo"
            />
            <h2>Welcome</h2>
            </div>
          </header>
          <div class="content">
            <p>Hello {user_name},</p>
            <p>
              We are delighted to extend an invitation to you to become a part of our  Aerpace family.
            </p>
          </div>
          <footer>
            <div class="footer-container">
              <div class="contact">
                Contact
                <a href="mailto:hello@aerpace.com">hello@aerpace.com</a>
              </div>
              <div class="socials-rights">
                <div class="socials">
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-3.png"
                      alt="Facebook"
                  /></a>
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-4.png"
                      alt="Twitter"
                  /></a>
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-5.png"
                      alt="Instagram"
                  /></a>
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-2.png"
                      alt="LinkedIn"
                  /></a>
                </div>
                <div class="rights">Aerpace © All Rights Reserved</div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>`,
  }),
  USER_TEMPORARY_PASSWORD: (params) => ({
    subject: `Your Temporary Password: Please Reset Your Account`,
    body: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
    
          body {
            font-family: "Poppins", sans-serif;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            font-size: 16px;
          }
    
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px 40px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
    
          .header {
            background-color: #000;
            padding: 10px;
            padding-top:25px;
            text-align: center;
            color: #fff;
          }
    
          .header img {
            max-width: 150px;
            margin-top: 10px;
            margin-bottom: 10px;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
    
          h2 {
            font-size: 24px;
            margin-top: 10px;
          }
    
          .content p {
            color: #333;
            line-height: 1.6;
            margin: 20px 0;
            padding-top:10px;
          }
    
          .reset-btn {
            display: block;
            width: 250px;
            background-color: #000;
            color: white !important;
            padding: 15px 0;
            margin: 20px 0;
            text-align: center;
            text-decoration: none;
            transition: background-color 0.2s;
            font-weight: bold;
          }
    
          .reset-btn:hover {
            background-color: black;
          }
    
          .disclaimer {
            font-style: italic;
            margin-top: 20px !important;
            margin-bottom: 40px !important;
            color: #708090 !important;
          }
   
    
          .footer-container {
            display: flex;
           justify-content: space-between;
           padding-bottom: 60px;
           padding-top: 20px;
           border-top: 1px solid #eee;
           background-color: #000;
           padding: 20px;
           color: #fff;
          }
    
          .contact {
            display: flex;
            flex-direction: column;
          }
    
          .contact a {
            color: #fff;
            text-decoration: none;
            
          }
    
          .socials-rights {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px
            background-color: red:
          }
    
          .socials {
            display:flex;
            align-items: left;
            margin-right: 85px; 
            gap: 10px;         
          }
    
    
          .socials img {
            width: 29px;
            height: auto;
            margin-right: 10px; 
          }
    
          .rights {
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="header">
            <img
              src="https://aerpace-images.s3.ap-south-1.amazonaws.com/Aerpace+logo.png"
              alt="Aerpace Logo"
            />
            <h2>Here is your temporary password</h2>
            </div>
          </header>
          <div class="content">
            <p>Hello {user_name},</p>
            <p>
            We are thrilled to invite you to family of Aerpace. Please use this temporary password to access your account.
            </p>
            <p class="reset-btn">{temporary_password}</p>
            <p> Once successfully logged in to your account, you will be prompted to establish
a new password. </p>
            <p class="disclaimer">
            Please refrain from disclosing your credentials.
            </p>
          </div>
          <footer>
            <div class="footer-container">
              <div class="contact">
                Contact
                <a href="mailto:hello@aerpace.com">hello@aerpace.com</a>
              </div>
              <div class="socials-rights">
                <div class="socials">
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-3.png"
                      alt="Facebook"
                  /></a>
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-4.png"
                      alt="Twitter"
                  /></a>
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-5.png"
                      alt="Instagram"
                  /></a>
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-2.png"
                      alt="LinkedIn"
                  /></a>
                </div>
                <div class="rights">Aerpace © All Rights Reserved</div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>`,
  }),
  USER_PASSWORD_RESET_MESSAGE: (params) => ({
    subject: `Reset your password`,
    body: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
    
          body {
            font-family: "Poppins", sans-serif;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            font-size: 16px;
          }
    
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px 40px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
    
          .header {
            background-color: #000;
            padding: 10px;
            padding-top:25px;
            text-align: center;
            color: #fff;
          }
    
          .header img {
            max-width: 150px;
            margin-top: 10px;
            margin-bottom: 10px;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
    
          h2 {
            font-size: 24px;
            margin-top: 10px;
          }
    
          .lock-icon {
            margin-top: 40px;
            max-width: 40px;
            width: 60px;
            height: auto;
          }
    
          .content p {
            color: #333;
            line-height: 1.6;
            margin: 20px 0;
            padding-top:10px;
          }
    
          .reset-btn {
            display: block;
            width: 250px;
            background-color: #000;
            color: #fff;
            padding: 15px 0;
            margin: 20px 0;
            text-align: center;
            text-decoration: none;
            transition: background-color 0.2s;
            font-weight: bold;
          }
    
          .reset-btn:hover {
            background-color: black;
          }
    
          .disclaimer {
            font-style: italic;
            margin-top: 20px !important;
            margin-bottom: 40px !important;
            color: #708090 !important;
          }
   
    
          .footer-container {
            display: flex;
           justify-content: space-between;
           padding-bottom: 60px;
           padding-top: 20px;
           border-top: 1px solid #eee;
           background-color: #000;
           padding: 20px;
           color: #fff;
          }
    
          .contact {
            display: flex;
            flex-direction: column;
          }
    
          .contact a {
            color: #fff;
            text-decoration: none;
            
          }
    
          .socials-rights {
            display: flex;
            flex-direction: column;
            align-items: flex-start;            
          }
    
          .socials {
            display:flex;
            align-items: left;
            margin-right: 85px; 
            gap: 10px;         
          }
    
    
          .socials img {
            width: 29px;
            height: auto;
            margin-right:10px;
          }
    
          .rights {
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="header">
            <img
              src="https://aerpace-images.s3.ap-south-1.amazonaws.com/Aerpace+logo.png"
              alt="Aerpace Logo"
            />
            <h2>Forgot your password?</h2>
            </div>
          </header>
          <div class="content">
            <p>Hello {user_name},</p>
            <p>
              We have sent you this email in response to your request to reset your password on Aerpace.   
            </p>
            <p>That's okay, It happens! Click on the button below to reset your password.</p>
            <a href={reset_password_link} class="reset-btn">Reset Password</a>
            <p class="disclaimer">
              Please ignore this email if you did not request a password change.
            </p>
          </div>
          <footer>
            <div class="footer-container">
              <div class="contact">
                Contact
                <a href="mailto:hello@aerpace.com">hello@aerpace.com</a>
              </div>
              <div class="socials-rights">
                <div class="socials">
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-3.png"
                      alt="Facebook"
                  /></a>
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-4.png"
                      alt="Twitter"
                  /></a>
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-5.png"
                      alt="Instagram"
                  /></a>
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-2.png"
                      alt="LinkedIn"
                  /></a>
                </div>
                <div class="rights">Aerpace © All Rights Reserved</div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>`,
  }),
};
