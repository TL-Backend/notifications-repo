module.exports = {
  WELCOME_NOTIFICATION: (params) => ({
    subject: "مرحبًا بك في Aerpace",
    body: `<!DOCTYPE html>
    <html lang="ar">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="styles.css" />
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
    
          body {
            font-family: "Poppins", sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            font-size: 16px;
          }
    
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #fff;
            padding: 20px 40px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
    
          .header {
            background-color: #000;
            padding: 10px;
            padding-top: 15px;
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
    
          .content p {
            color: #333;
            line-height: 1.6;
            margin: 20px 0;
          }
    
          .disclaimer {
            font-style: italic;
            margin-top: 20px !important;
            margin-bottom: 40px !important;
            color: #aaa !important;
          }
    
          .footer-container {
            border-top: 1px solid #eee;
            background-color: #000;
            padding: 15px 0;
            color: #fff;
            display: flex;
            justify-content: space-between;
            /* align-items: center; */
            padding: 20px;
            /* padding-bottom: 20px; */
          }
    
          .contact {
            margin-right: 15px;
            white-space: nowrap;
          }
    
          .contact a {
            color: #fff !important;
            text-decoration: none;
          }
    
          .content p {
            color: #333;
            line-height: 1.6;
            margin: 20px 0;
            padding-top: 10px;
          }
    
          .footer-container {
            display: flex;
            justify-content: space-between;
            background-color: #000;
          }
    
          .contact {
            display: flex;
            flex-direction: column;
          }
          .contact-title {
            display: flex;
            align-self: flex-end;
          }
    
          .contact a {
            color: #fff;
            text-decoration: none;
          }
    
          .socials-rights {
            display: flex;
            flex-direction: column;
          }
    
          .socials {
            display: flex;
            gap: 10px;
            align-self: flex-end;
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
            <div class="header">
              <img
                src="https://aerpace-images.s3.ap-south-1.amazonaws.com/Aerpace+logo.png"
                alt="شعار Aerpace"
              />
            <h2>مرحبًا</h2>
            </div>
          </header>
          <div class="content" dir="rtl">
            <p>مرحبًا, {user_name}</p>
            <p>
              لقد أرسلنا لك هذا البريد الإلكتروني ردًا على طلبك بإعادة تعيين كلمنحن
              مسرورون بتمديد دعوة لك لتصبح جزءًا من عائلتنا في Aerpace.
            </p>
          </div>
          <!-- <footer dir="ltr"> -->
            <!-- <div class=""> -->
            <div class="footer-container">
              <div class="contact">
                <div class="contact-title">اتصال</div>
                <a href="mailto:hello@aerpace.com">hello@aerpace.com</a>
              </div>
              <div class="socials-rights">
                <div class="socials">
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-3.png"
                      alt="فيسبوك"
                  /></a>
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-4.png"
                      alt="تويتر"
                  /></a>
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-5.png"
                      alt="إنستاجرام"
                  /></a>
                  <a href="#"
                    ><img
                      src="https://aerpace-images.s3.ap-south-1.amazonaws.com/image-2.png"
                      alt="لينكدإن"
                  /></a>
                </div>
                <div class="rights">Aerpace © جميع الحقوق محفوظة</div>
              </div>
            <!-- </div> -->
          </div>
          <!-- </footer> -->
        </div>
      </body>
    </html>   
    `,
  }),
  USER_TEMPORARY_PASSWORD: (params) => ({
    subject: `كلمة المرور المؤقتة الخاصة بك: الرجاء إعادة تعيين حسابك`,
    body: {
      title: `كلمة مرور مؤقتة`,
      p1: `مرحبًا `,
      p2: `نحن متحمسون لدعوتك للانضمام إلى عائلة Aerpace. أدناه، ستجد كلمة المرور المؤقتة لتسجيل الدخول:`,
      p3: `الرجاء عدم الكشف عن بيانات اعتمادك.`,
      thanking: `شكرًا لاختيارك `,
    },
  }),
  USER_PASSWORD_RESET_MESSAGE: (params) => ({
    subject: `كلمة المرور المؤقتة الخاصة بك: يرجى إعادة تعيين حسابك`,
    body: {
      title: `كلمة مرور مؤقتة`,
      p1: `مرحبًا `,
      p2: `لقد قمت بطلب إعادة تعيين كلمة مرور حسابك في Aerpace. للمتابعة، يرجى النقر على الزر أدناه:"`,
      p3: `إذا لم تكن قد طلبت ذلك، يرجى تجاهل هذا البريد الإلكتروني. حسابك آمن.`,
      thanking: `شكرًا لاختيارك `,
      reset_password_button: `إعادة تعيين كلمة المرور`,
    },
  }),
};
