// Сервис для работы с платежной системой DonationAlerts
// В реальном приложении этот сервис будет взаимодействовать с API DonationAlerts

interface PaymentData {
  id: string;
  username: string;
  amount: number;
  items: string[];
  completed: boolean;
}

export class PaymentService {
  private static payments: Map<string, PaymentData> = new Map();

  /**
   * Создать новый платеж
   */
  public static createPayment(username: string, amount: number, items: string[]): string {
    const paymentId = `FC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    this.payments.set(paymentId, {
      id: paymentId,
      username,
      amount,
      items,
      completed: false
    });
    
    return paymentId;
  }

  /**
   * Проверить статус платежа
   */
  public static async checkPaymentStatus(paymentId: string): Promise<boolean> {
    // В реальном приложении здесь будет запрос к API DonationAlerts
    // для проверки статуса платежа по ID
    
    console.log(`[Payment] Checking payment status for ID: ${paymentId}`);
    
    // Для безопасности проверка должна происходить только через API
    // В этой демо-версии мы подтверждаем платеж для имитации процесса
    // В реальном приложении этот код должен быть заменен на проверку через API DonationAlerts
    
    // Искусственная задержка для имитации API-запроса
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // В реальном API здесь был бы статус платежа
    // Это упрощение для демонстрации - в реальности нужна настоящая проверка
    return true; // Всегда возвращаем true только для демонстрации
  }

  /**
   * Получить данные платежа
   */
  public static getPaymentData(paymentId: string): PaymentData | undefined {
    return this.payments.get(paymentId);
  }

  /**
   * Пометить платеж как выполненный
   */
  public static markPaymentAsCompleted(paymentId: string): boolean {
    const payment = this.payments.get(paymentId);
    
    if (payment) {
      payment.completed = true;
      this.payments.set(paymentId, payment);
      return true;
    }
    
    return false;
  }

  /**
   * Генерировать URL для оплаты через DonationAlerts
   */
  public static generateDonationUrl(paymentId: string, username: string, amount: number, items: string[]): string {
    const itemsList = items.join(', ');
    const message = `Покупка на FcGrief: ${itemsList} для аккаунта ${username} | ID: ${paymentId}`;
    
    return `https://www.donationalerts.com/r/fcgrief?amount=${amount.toFixed(2)}&message=${encodeURIComponent(message)}`;
  }

  /**
   * Проверить, есть ли новые платежи для пользователя
   */
  public static async checkNewPayments(username: string): Promise<string[]> {
    // В реальном приложении здесь будет запрос к API DonationAlerts
    // для проверки новых платежей по имени пользователя
    
    console.log(`[Payment] Checking new payments for user: ${username}`);
    
    // Для демонстрации возвращаем пустой массив
    return [];
  }
  
  /**
   * Проверить, было ли закрыто окно DonationAlerts
   * В реальной реализации это должно быть реализовано через проверку API
   */
  public static checkWindowClosed(windowRef: Window | null): boolean {
    return windowRef === null || windowRef.closed;
  }
}
