/** Official contact (single source for links). */
export const NUO_CONTACT_EMAIL = "contact@nuo-networks.com";

export const NUO_CONTACT_MAILTO = `mailto:${NUO_CONTACT_EMAIL}`;

export function nuoContactMailtoSubject(subject: string): string {
  return `${NUO_CONTACT_MAILTO}?subject=${encodeURIComponent(subject)}`;
}

export function nuoContactMailtoSubjectBody(subject: string, body: string): string {
  const q = new URLSearchParams({
    subject,
    body
  });
  return `${NUO_CONTACT_MAILTO}?${q.toString()}`;
}

/** USA corporate line (E.164 without + for WhatsApp-style APIs if needed). */
export const NUO_US_PHONE_TEL = "tel:+14243553283";

/** Mexico operations — WhatsApp. */
export const NUO_WHATSAPP_MX_URL =
  "https://api.whatsapp.com/send/?phone=525636741156&type=phone_number&app_absent=0";

/** USA corporate line — WhatsApp (same number as NUO_US_PHONE_TEL). */
export const NUO_WHATSAPP_US_URL =
  "https://api.whatsapp.com/send/?phone=14243553283&type=phone_number&app_absent=0";
