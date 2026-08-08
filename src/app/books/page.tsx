import type { Metadata } from "next";
import { BooksPage } from "@/components/books-page";

export const metadata: Metadata = {
  title: "Books",
  description:
    "Seven published books by Ankur Rana — spanning time, reality, attention, relationships, Hindi poetry, and Awadhi language. Available on Amazon Kindle.",
};

export default function Books() {
  return <BooksPage />;
}
