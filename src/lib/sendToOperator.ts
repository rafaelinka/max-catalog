import { OPERATOR_PHONE } from "@/config/operator"

/**
 * 🔥 Абстракция доставки заявки оператору
 * позже тут будет MAX API
 */
export async function sendToOperator(message: string) {
  try {
    /**
     * 👉 СЕЙЧАС: имитация отправки
     * (позже заменим на MAX API)
     */

    console.log("========== OPERATOR MESSAGE ==========")
    console.log("TO:", OPERATOR_PHONE)
    console.log(message)
    console.log("======================================")

    /**
     * имитация сетевого запроса
     */
    await new Promise((res) => setTimeout(res, 500))

    return { success: true }
  } catch (e) {
    return { success: false }
  }
}