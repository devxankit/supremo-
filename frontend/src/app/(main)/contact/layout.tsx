import type { Metadata } from "next";

// The contact page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Supremo. Call, WhatsApp or send us a message for inquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
