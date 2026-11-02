/**
 * Instant text-back through Twilio. Needs TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID,
 * TWILIO_API_KEY_SECRET and TWILIO_FROM_NUMBER, plus NOTIFY_SMS_TO for the team alert.
 * With any of them missing it does nothing, so a lead is never held up by SMS.
 */

/** Canadian and US numbers only, which also stops anyone using the form to text premium overseas numbers. */
export function toE164(phone?: string | null) {
  const digits = (phone ?? "").replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

export async function sendSms(to: string | null | undefined, body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const user = process.env.TWILIO_API_KEY_SID;
  const pass = process.env.TWILIO_API_KEY_SECRET;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!to || !sid || !user || !pass || !from) return false;
  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: { Authorization: `Basic ${btoa(`${user}:${pass}`)}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ To: to, From: from, Body: body }),
      signal: AbortSignal.timeout(6000),
    });
    if (res.ok) return true;
    console.error("Twilio error:", res.status, await res.text());
  } catch (e) {
    console.error("Twilio unreachable", e);
  }
  return false;
}

/** The reply a customer gets within seconds of sending the form. */
export function customerText({ name, tag, isCommercial, code, phone, url, business }: {
  name: string;
  tag: string;
  isCommercial: boolean;
  code?: string;
  phone: string;
  url: string;
  business: string;
}) {
  const first = name.trim().split(/\s+/)[0].replace(/[^\p{L}'-]/gu, "").slice(0, 20);
  const hi = `Hi${first ? ` ${first}` : ""}, it's ${business}.`;
  const reach = `Need us sooner? Call ${phone}. Reply STOP to opt out.`;
  if (tag === "REFER-SIGNUP") return `${hi} Here's your referral link to share with neighbours: ${url}/refer/${code}. Questions? Call ${phone}. Reply STOP to opt out.`;
  if (tag === "REBOOK") return `${hi} We got your rebooking request and will send your saved price within 24 hours. ${reach}`;
  if (isCommercial) return `${hi} We got your request and a commercial lighting specialist will reply within 24 hours. ${reach}`;
  return `${hi} We got your request and will send your quote within 24 hours. ${reach}`;
}
