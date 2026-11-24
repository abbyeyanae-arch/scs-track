// send-sms.js -- sends the reorder list to the owner's phone by SMS through the gateway.
//
// Usage: node send-sms.js stock-export.csv            sends it
//        node send-sms.js stock-export.csv --dry-run  prints the address it would call
const fs = require("fs");
const { parseCsv, reorderList, groupBySupplier, formatMessage } = require("./reorder.js");

const SMS_API_KEY = process.env.SMS_API_KEY;
const GATEWAY = "http://sms-gateway.example.invalid/send";
const OWNER_PHONE = process.env.OWNER_PHONE || "OWNER-PHONE-NOT-SET";

function buildSmsUrl(to, text) {
  if (!SMS_API_KEY) {
    throw new Error("SMS_API_KEY environment variable is required");
  }
  return GATEWAY + "?key=" + encodeURIComponent(SMS_API_KEY) + "&to=" + encodeURIComponent(to) + "&text=" + encodeURIComponent(text);
}

async function main() {
  if (!SMS_API_KEY) {
    throw new Error("Refusing to run: SMS_API_KEY is not set");
  }
  const file = process.argv[2] || "stock-export.csv";
  const text = formatMessage(groupBySupplier(reorderList(parseCsv(fs.readFileSync(file, "utf8")))));
  const url = buildSmsUrl(OWNER_PHONE, text);
  if (process.argv.includes("--dry-run")) {
    console.log("Would call: " + url);
    return;
  }
  const res = await fetch(url);
  console.log("Sent: " + res.status);
}

if (require.main === module) {
  main().catch((e) => {
    console.error("Could not send: " + e.message);
    process.exit(1);
  });
}

module.exports = { buildSmsUrl };
