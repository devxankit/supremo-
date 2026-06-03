import type { Metadata } from "next";

// The contact page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Supremo India — head office in Indore plus regional offices. Call, WhatsApp or send us a message for dealer and bulk enquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
