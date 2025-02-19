import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

interface StrapiImage {
  url: string;
  alternativeText?: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
  };
}

interface Contact {
  id: number;
  Slug: string;
  Address: string;
  Phone: string;
  Email: string;
  ContactPageImage: StrapiImage;
  ImageHeading: string;
  ImageSummary: string;
}

interface Email {
  id: number;
  Email: string;
}

// Fetch contact details from strapi's api
const fetchContactDetails = async (): Promise<Contact[]> => {
  const res = await fetch("http://localhost:1337/api/contacts?populate=*", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch contact details");
  }

  const data = await res.json();
  return data.data;
};

// Fetching email details from strapi's api
const fetchEmail = async (): Promise<Email[]> => {
  const res = await fetch("http://localhost:1337/api/emails?populate=*", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch email");
  }

  const data = await res.json();
  return data.data;
};

async function Page() {
  const contacts = await fetchContactDetails();
  const emails = await fetchEmail();

  return (
    <>
      {/*Background image + Backdrop*/}
      {contacts.map((post) => (
        <header
          key={post.id}
          className="relative h-[100vh] flex items-center justify-center text-white text-center px-6"
          style={{
            backgroundImage: `url(http://localhost:1337${
              post.ContactPageImage.formats?.medium?.url ||
              post.ContactPageImage.url
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/*black Backdrop */}
          <div className="bg-black bg-opacity-50 p-10 rounded-lg">
            <h1 className="text-5xl font-bold">{post.ImageHeading}</h1>
            <p className="mt-4 text-lg">{post.ImageSummary}</p>
          </div>
        </header>
      ))}

      {/* Contact Information Section */}
      <section className="flex flex-col items-center justify-center px-6 py-16 bg-gray-100">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Get in Touch</h2>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Contact Info */}
          {contacts.map((post) => (
            <div key={post.id} className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="text-blue-500" />
                {emails.map((e) => (
                  <span key={e.id} className="text-gray-700">
                    {e.Email}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-blue-500" />
                <span className="text-gray-700">{post.Phone}</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="text-blue-500" />
                <span className="text-gray-700">{post.Address}</span>
              </div>
            </div>
          ))}

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Page;
