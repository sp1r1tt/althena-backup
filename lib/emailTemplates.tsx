export function generateBookingConfirmationEmail(data: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
      <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        <h1 style="color: #2d3748; margin-bottom: 24px; font-size: 28px;">Подтверждение записи</h1>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">Здравствуйте, ${data.userName}!</p>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">Ваша запись к специалисту <strong>${data.therapistName}</strong> подтверждена.</p>
        
        <div style="background: #f7fafc; border-radius: 8px; padding: 24px; margin: 24px 0;">
          <h3 style="color: #2d3748; margin-bottom: 16px;">Детали сессии:</h3>
          <p style="margin: 8px 0; color: #4a5568;"><strong>Дата:</strong> ${data.date}</p>
          <p style="margin: 8px 0; color: #4a5568;"><strong>Время:</strong> ${data.time}</p>
          <p style="margin: 8px 0; color: #4a5568;"><strong>Тип сессии:</strong> ${data.sessionType}</p>
          <p style="margin: 8px 0; color: #4a5568;"><strong>Стоимость:</strong> ${data.price} ₴</p>
        </div>
        
        <p style="color: #4a5568; font-size: 14px; margin-top: 24px;">
          Если вам нужно отменить или перенести сессию, пожалуйста, сделайте это минимум за 24 часа.
        </p>
      </div>
    </div>
  `
}

export function generateSessionReminderEmail(data: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
      <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        <h1 style="color: #2d3748; margin-bottom: 24px; font-size: 28px;">Напоминание о сессии</h1>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">Здравствуйте, ${data.userName}!</p>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">Напоминаем, что завтра у вас запланирована сессия с <strong>${data.therapistName}</strong>.</p>
        
        <div style="background: #f7fafc; border-radius: 8px; padding: 24px; margin: 24px 0;">
          <h3 style="color: #2d3748; margin-bottom: 16px;">Время сессии:</h3>
          <p style="margin: 8px 0; color: #4a5568; font-size: 18px;"><strong>${data.time}</strong></p>
        </div>
        
        <p style="color: #4a5568; font-size: 14px; margin-top: 24px;">
          Пожалуйста, подготовьтесь к сессии заранее и убедитесь, что у вас стабильное интернет-соединение.
        </p>
      </div>
    </div>
  `
}

export function generateTestResultsEmail(data: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
      <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        <h1 style="color: #2d3748; margin-bottom: 24px; font-size: 28px;">Результаты теста</h1>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">Здравствуйте, ${data.userName}!</p>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">Ваши результаты теста <strong>"${data.testName}"</strong> готовы.</p>
        
        <div style="background: #f7fafc; border-radius: 8px; padding: 24px; margin: 24px 0;">
          <h3 style="color: #2d3748; margin-bottom: 16px;">Ваш результат:</h3>
          <p style="margin: 8px 0; color: #4a5568; font-size: 24px; font-weight: bold;">${data.score}</p>
          <p style="margin: 16px 0; color: #4a5568; line-height: 1.6;">${data.interpretation}</p>
        </div>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="${data.resultsUrl}" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Посмотреть подробные результаты</a>
        </div>
        
        <p style="color: #4a5568; font-size: 14px; margin-top: 24px;">
          На основе ваших результатов мы можем порекомендовать подходящих специалистов и материалы.
        </p>
      </div>
    </div>
  `
}

export function generateWelcomeEmail(data: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
      <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        <h1 style="color: #2d3748; margin-bottom: 24px; font-size: 28px;">Добро пожаловать!</h1>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">Здравствуйте, ${data.userName}!</p>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">Добро пожаловать на нашу платформу ментального здоровья! Мы рады, что вы присоединились к нам.</p>
        
        <div style="background: #f7fafc; border-radius: 8px; padding: 24px; margin: 24px 0;">
          <h3 style="color: #2d3748; margin-bottom: 16px;">Что вы можете делать:</h3>
          <ul style="color: #4a5568; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>Пройти психологические тесты</li>
            <li>Найти подходящего специалиста</li>
            <li>Записаться на консультацию</li>
            <li>Получить персональные рекомендации</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="${data.dashboardUrl}" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Перейти в личный кабинет</a>
        </div>
        
        <p style="color: #4a5568; font-size: 14px; margin-top: 24px;">
          Если у вас есть вопросы, не стесняйтесь обращаться к нашей службе поддержки.
        </p>
      </div>
    </div>
  `
}

export function generateBookingCancelledEmail(data: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
      <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        <h1 style="color: #2d3748; margin-bottom: 24px; font-size: 28px;">Отмена записи</h1>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">Здравствуйте, ${data.userName}!</p>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">Ваша запись к специалисту <strong>${data.therapistName}</strong> была отменена.</p>
        
        <div style="background: #fff5f5; border-radius: 8px; padding: 24px; margin: 24px 0; border-left: 4px solid #f56565;">
          <h3 style="color: #2d3748; margin-bottom: 16px;">Отмененная сессия:</h3>
          <p style="margin: 8px 0; color: #4a5568;"><strong>Дата:</strong> ${data.date}</p>
          <p style="margin: 8px 0; color: #4a5568;"><strong>Время:</strong> ${data.time}</p>
        </div>
        
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">Если отмена была сделана в соответствии с нашей политикой, возврат средств будет обработан в течение 3-5 рабочих дней.</p>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="${data.bookingUrl}" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Записаться снова</a>
        </div>
        
        <p style="color: #4a5568; font-size: 14px; margin-top: 24px;">
          Мы надеемся увидеть вас снова. Если у вас есть вопросы, обращайтесь к нашей службе поддержки.
        </p>
      </div>
    </div>
  `
}
