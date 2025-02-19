// import Footer from "@/components/Footer";
// import InnerNavbar from "@/components/InnerNavbar";
// import Image from "next/image";

// interface StrapiImage {
//   url: string;
//   alternativeText?: string;
//   formats?: {
//     thumbnail?: { url: string };
//     small?: { url: string };
//     medium?: { url: string };
//   };
// }

// interface BlogPost {
//   id: number;
//   Title: string;
//   Slug: string;
//   Content: { type: string; children: { type: string; text: string }[] }[];
//   Publishedat: string;
//   Author: string,
//   Hashtags: string,
//   Thumbnailimage: StrapiImage | null;
// }

// // Fetch Blogs from Strapi (Server Component)
// const fetchBlogs = async (): Promise<BlogPost[]> => {
//   const res = await fetch("http://localhost:1337/api/blogs?populate=*", {
//     cache: "no-store", // Ensures fresh data on each request
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch blogs");
//   }

//   const data = await res.json();
  
//   return data.data; // Strapi wraps response in a "data" array
// };

// export default async function BlogsPage() {
//   const blogs = await fetchBlogs();

//   return (
//     <div>
//     <div className="max-w-4xl mx-auto p-6">
//       <InnerNavbar/>
//       <h1 className="text-3xl font-bold text-center mt-8 text-black mb-6">Latest Blogs</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {blogs.map((post) => (
//           <div key={post.id} className="border rounded-lg p-4 shadow-md">
//             {post.Thumbnailimage ? (
//               <Image
//                 src={`http://localhost:1337${post.Thumbnailimage.formats?.medium?.url || post.Thumbnailimage.url}`}
//                 alt={post.Thumbnailimage.alternativeText || "Blog Image"}
//                 width={300}
//                     height={400}
//                     className="rounded-md w-full h-[300px] object-cover transition-transform duration-300 transform hover:scale-105"
//               />
//             ) : (
//               <div className="bg-gray-300 w-full h-[300px] flex items-center justify-center text-gray-700">
//                 No Image Available
//               </div>
//             )}

//             <h2 className="text-xl font-semibold text-black mt-4 font-sans">{post.Title}</h2>
//             <p className="text-gray-600 mt-2 font-sans">{post.Content[0]?.children[0]?.text}</p>
//             <div className="text-gray-800 pt-4 font-sans">{post.Publishedat}</div>
//             <div className="text-black text-end font-sans">{post.Author}</div>
//             <div className="text-blue-900 text-end font-sans">{ post.Hashtags}</div>
//           </div>
//         ))}
//       </div>
//       </div>
//       <Footer/>
//     </div>
//   );
// }


import Footer from "@/components/Footer";
import InnerNavbar from "@/components/InnerNavbar";
import Image from "next/image";

interface StrapiImage {
  url: string;
  alternativeText?: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
  };
}

interface BlogPost {
  id: number;
  Title: string;
  Slug: string;
  Content: { type: string; children: { type: string; text: string }[] }[];
  Publishedat: string;
  Author: string,
  Hashtags: string,
  Thumbnailimage: StrapiImage | null;
}

// Fetch Blogs from Strapi (Server Component)
const fetchBlogs = async (): Promise<BlogPost[]> => {
  const res = await fetch("http://localhost:1337/api/blogs?populate=*", {
    cache: "no-store", // Ensures fresh data on each request
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();
  
  return data.data; // Strapi wraps response in a "data" array
};

export default async function BlogsPage() {
  const blogs = await fetchBlogs();

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <InnerNavbar />
        <h1 className="text-4xl font-bold text-center mb-10 text-[#0e2342] mt-4">Latest Blogs</h1>

        <div className="grid md:grid-cols-3 gap-8 justify-center">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            >
              {post.Thumbnailimage ? (
                <Image
                  src={`http://localhost:1337${post.Thumbnailimage.formats?.medium?.url || post.Thumbnailimage.url}`}
                  alt={post.Thumbnailimage.alternativeText || "Blog Image"}
                  width={400}
                  height={250}
                  className="w-full h-60 object-cover"
                />
              ) : (
                <div className="bg-gray-300 w-full h-[300px] flex items-center justify-center text-gray-700">
                  No Image Available
                </div>
              )}

              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">{post.Title}</h2>
                <p className="text-gray-600 mt-2">{post.Content[0]?.children[0]?.text}</p>
                <div className="text-gray-800 pt-4">{post.Publishedat}</div>
                <div className="text-black text-end">{post.Author}</div>
                <div className="text-blue-900 text-end">{post.Hashtags}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
