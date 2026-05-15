const XLSX = require("xlsx")
const fs = require("fs")
const path = require("path")

// 📂 читаем Excel файл из корня проекта
const workbook = XLSX.readFile("products.xlsx")

// 📄 берём первый лист
const sheetName = workbook.SheetNames[0]
const sheet = workbook.Sheets[sheetName]

// 🔄 конвертируем в JSON
const data = XLSX.utils.sheet_to_json(sheet)

// 📦 путь куда сохраняем результат
const outputPath = path.join(
  __dirname,
  "../src/data/products.json"
)

// 💾 записываем JSON файл
fs.writeFileSync(
  outputPath,
  JSON.stringify(data, null, 2),
  "utf-8"
)

console.log("✅ Excel импорт завершён: products.json создан")