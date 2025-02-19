import Footer from "@/components/Footer";
import Image from 'next/image';
import { FaLinkedin } from "react-icons/fa"

interface StrapiImage {
  url: string;
  alternativeText?: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
  };
}
interface AboutUs{
  id: number,
  Slug: string,
  AboutUsImage: StrapiImage,
  AboutUsContent: string,
  BackgroundImage: StrapiImage,
  ImageHeading: string,
  ImageSummary: string,
  
}
interface TeamMemberDetails{
  id: number,
  Slug: string,
  TeamMemberImage: StrapiImage,
  TeamMemberName: string,
  TeamMemberDesignation: string,
  LinkedInUrl: string,
}

const fetchAboutUsDetails = async (): Promise<AboutUs[]> => {
  const res = await fetch("http://localhost:1337/api/about-uses?populate=*", {
    cache: "no-store", // Ensures fresh data on each request
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();
  return data.data; // Strapi wraps response in a "data" array
};

const fetchTeamMemberDetails = async (): Promise<TeamMemberDetails[]> => {
  const res = await fetch("http://localhost:1337/api/team-members?populate=*", {
    cache: "no-store", // Ensures fresh data on each request
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();
  return data.data; // Strapi wraps response in a "data" array
};

export default async function Page() {
  const aboutUs = await fetchAboutUsDetails();
  const teamMember = await fetchTeamMemberDetails();
  return (
    <div>
      {/* Banner */}
      {/*Background image + Backdrop*/}
      {aboutUs.map((post) => (
        <header
          key={post.id}
          className="relative h-[100vh] flex items-center justify-center text-white text-center px-6"
          style={{
            backgroundImage: `url(http://localhost:1337${
              post.BackgroundImage.formats?.medium?.url ||
              post.BackgroundImage.url
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

      {/* About Us Section */}
      <section
        className="py-16 px-4 md:px-8 bg-[#0e2342] text-white"
      >
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold">About Us</h2>
            {aboutUs.map((post) => (
            <p key={post.id} className="mt-4 text-base sm:text-lg leading-relaxed">
              {post.AboutUsContent}
            </p>
              ))}
            <button className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-full text-base sm:text-lg font-semibold">
              Learn More
            </button>
          </div>

          {/* Image */}
          {aboutUs.map((post) => (
            <div key={post.id} className="w-full md:w-1/2 flex justify-center">
              {post.AboutUsImage ? (
            <Image
              src={`http://localhost:1337${post.AboutUsImage.formats?.medium?.url || post.AboutUsImage.url}`}
              alt={post.AboutUsImage.alternativeText || "AboutUs Image"}
              width={500}
              height={300}
              className="w-full max-w-xs sm:max-w-md h-auto rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105"
              />
              ) : (
              <div className="bg-gray-300 w-full h-[300px] flex items-center justify-center text-gray-700">
                No Image Available
              </div>
            )}
            </div>
            ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0e2342]">
            Our Team
          </h2>
          {/* Team Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMember.map((post, index) => (
              <div
                key={index}
                className="bg-[#a5bdc1] rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="p-6">
                  {post.TeamMemberImage ? (
                  <Image
                    src={`http://localhost:1337${post.TeamMemberImage.formats?.medium?.url || post.TeamMemberImage.url}`}
                    alt={post.TeamMemberImage.alternativeText || "Team Member Image"}
                    width={500}
                    height={300}
                    className="rounded-xl w-full h-auto"
                    />
                  ) : (
                      <div className="bg-gray-300 w-full h-[350px] flex items-center justify-center text-gray-700">
                       No Image Available
                      </div>
                  )}
                  {/* Team member details */}
                </div>
                <div className="bg-[#0e2342] text-white text-center py-4 px-6">
                  <h3 className="text-xl font-semibold">{post.TeamMemberName}</h3>
                  <p className="text-sm mt-1">{post.TeamMemberDesignation}</p>
                  <a
                    href={post.LinkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin
                      className="w-6 h-6 mx-auto mt-3"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
