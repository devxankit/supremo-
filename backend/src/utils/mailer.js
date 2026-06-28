import nodemailer from "nodemailer";

// Build a transporter from SMTP_* env vars, or null when not configured.
const getTransporter = () => {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) return null;

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });
};

/**
 * Send an internal notification email to the business inbox.
 *
 * Best-effort and never throws: failures are logged so the calling public
 * submission handler can never be broken by an SMTP problem. Recipient is
 * NOTIFY_EMAIL if set, otherwise the configured SMTP_USER inbox.
 *
 * @returns {Promise<boolean>} true if an email was dispatched.
 */
export const sendAdminNotification = async (subject, text) => {
  try {
    const transporter = getTransporter();
    const recipient = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
    if (!transporter || !recipient) {
      console.warn(`[notification] SMTP not configured — skipping email: ${subject}`);
      return false;
    }
    await transporter.sendMail({
      from: `"Supremo Notifications" <${process.env.SMTP_USER}>`,
      to: recipient,
      subject,
      text,
    });
    return true;
  } catch (err) {
    console.error(`[notification] Failed to send admin notification: ${err.message}`);
    return false;
  }
};
