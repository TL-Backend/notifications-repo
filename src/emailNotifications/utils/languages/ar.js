module.exports = {
  WELCOME_NOTIFICATION: (params) => ({
    subject: "مرحبًا بك في Aerpace",
    body: `نحن مبتهجون بدعوتك للانضمام إلى عائلتنا التي تحتضن {{members_count}} من الأعضاء`,
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
