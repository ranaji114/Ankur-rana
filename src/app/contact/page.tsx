import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ankur Rana — for project collaborations, research discussions, or general enquiries.",
};

export default function Contact() {
  return <ContactPage />;
}
