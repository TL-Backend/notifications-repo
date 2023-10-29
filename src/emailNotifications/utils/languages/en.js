module.exports = {
  WELCOME_NOTIFICATION: (params) => ({
    subject: "Welcome To Aerpace",
    body: `we are thrilled to invite you to the family of {{members_count}} members`,
  }),
  USER_TEMPORARY_PASSWORD: (params) => ({
    subject: `Your Temporary Password: Please Reset Your Account`,
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
    
          header {
            background-color: #000;
            padding: 30px 0;
            text-align: center;
            color: #fff;
            padding-left: 40px;
            padding-right: 40px;
          }
    
          header img {
            max-width: 150px;
            margin-bottom: 20px;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
    
          h2 {
            font-size: 24px;
            margin-top: 10px;
          }
    
          .lock-icon {
            margin-top: 60px;
            max-width: 60px;
          }
    
          .content p {
            color: #333;
            line-height: 1.6;
            margin: 20px 0;
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
            transition: background-color 0.3s;
            font-weight: bold;
          }
    
          .disclaimer {
            font-style: italic;
            margin-top: 20px !important;
            margin-bottom: 40px !important;
            color: #708090 !important;
          }
    
          footer {
            padding-top: 20px;
            border-top: 1px solid #eee;
            background-color: #000;
            padding: 15px 0;
            color: #fff;
          }
    
          .footer-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            padding-bottom: 60px;
          }
    
          .contact {
            margin-right: 15px;
            white-space: nowrap;
          }
    
          .contact a {
            color: #fff;
            text-decoration: none;
          }
    
          .contact p {
            margin-bottom: 5px;
          }
    
          .socials-rights {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }
    
          .socials {
            align-items: left;
            margin-right: 85px;
          }
    
          .socials a {
            margin: 0 5px;
          }
    
          .socials img {
            width: 29px;
            height: auto;
          }
    
          .rights {
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <img
              src="https://aerpace-images.s3.ap-south-1.amazonaws.com/Aerpace+logo.png"
              alt="Aerpace Logo"
            />
            <img
              src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-1.png"
              alt="lock logo"
              class="lock-icon"
            />
            <h2>Please reset your password</h2>
          </header>
          <div class="content">
            <p>Hello {user_name},</p>
            <p>
            We are thrilled to invite you to family of Aerpace. Below, you will find your temporary password for logging in:
            </p>
            <p>To reset your password, please follow the link below:</p>
            <a class="reset-btn">{temporary_password}</a>
            <p class="disclaimer">
            Please refrain from disclosing your credentials.
            </p>
          </div>
          <footer>
            <div class="footer-container">
              <div class="contact">
                <p>Contact</p>
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
                <div class="rights">Company © All Rights Reserved</div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>`,
  }),
  USER_PASSWORD_RESET_MESSAGE: (params) => ({
    subject: `Your Temporary Password: Please Reset Your Account`,
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
      
            header {
              background-color: #000;
              padding: 30px 0;
              text-align: center;
              color: #fff;
              padding-left: 40px;
              padding-right: 40px;
            }
      
            header img {
              max-width: 150px;
              margin-bottom: 20px;
              display: block;
              margin-left: auto;
              margin-right: auto;
            }
      
            h2 {
              font-size: 24px;
              margin-top: 10px;
            }
      
            .lock-icon {
              margin-top: 60px;
              max-width: 60px;
            }
      
            .content p {
              color: #333;
              line-height: 1.6;
              margin: 20px 0;
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
              transition: background-color 0.3s;
              font-weight: bold;
            }
      
            .reset-btn:hover {
              background-color: #333;
            }
      
            .disclaimer {
              font-style: italic;
              margin-top: 20px !important;
              margin-bottom: 40px !important;
              color: #708090 !important;
            }
      
            footer {
              padding-top: 20px;
              border-top: 1px solid #eee;
              background-color: #000;
              padding: 15px 0;
              color: #fff;
            }
      
            .footer-container {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 20px;
              padding-bottom: 60px;
            }
      
            .contact {
              margin-right: 15px;
              white-space: nowrap;
            }
      
            .contact a {
              color: #fff;
              text-decoration: none;
            }
      
            .contact p {
              margin-bottom: 5px;
            }
      
            .socials-rights {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
            }
      
            .socials {
              align-items: left;
              margin-right: 85px;
            }
      
            .socials a {
              margin: 0 5px;
            }
      
            .socials img {
              width: 29px;
              height: auto;
            }
      
            .rights {
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <header>
              <img
                src="https://aerpace-images.s3.ap-south-1.amazonaws.com/Aerpace+logo.png"
                alt="Aerpace Logo"
              />
              <img
                src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-1.png"
                alt="lock logo"
                class="lock-icon"
              />
              <h2>Please reset your password</h2>
            </header>
            <div class="content">
              <p>Hello {user_name},</p>
              <p>
                We have sent you this email in response to your request to reset your
                password on Aerpace.
              </p>
              <p>To reset your password, please follow the link below:</p>
              <a href={reset_password_link} class="reset-btn">Reset Password</a>
              <p class="disclaimer">
                Please ignore this email if you did not request a password change.
              </p>
            </div>
            <footer>
              <div class="footer-container">
                <div class="contact">
                  <p>Contact</p>
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
                  <div class="rights">Company © All Rights Reserved</div>
                </div>
              </div>
            </footer>
          </div>
        </body>
      </html>`,
  }),
};
