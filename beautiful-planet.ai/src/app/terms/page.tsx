import React from 'react'


interface TermsAndCondition{
    id:number,
    Slug: string,
    Title: string,
    UpdatedDate: string,
    Description: string,
}

interface Email {
  id: number;
    Email: string;
}
const fetchTermsAndConditions = async (): Promise<TermsAndCondition[]> => {
    const res = await fetch("http://localhost:1337/api/terms-and-conditions?populate=*", {
    cache: "no-store", // Ensures fresh data on each request
    });

    if (!res.ok) {
    throw new Error("Failed to fetch Terms and Conditions");
  }

  const data = await res.json();
  return data.data; // Strapi wraps response in a "data" array
};

// Fetch email details
const fetchEmail = async (): Promise<Email[]> => {
  const res = await fetch("http://localhost:1337/api/emails?populate=*", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch email");
  }

  const data = await res.json();
  return data.data; // Strapi wraps response in a "data" array
};

const page = async () => {
    const terms = await fetchTermsAndConditions();
    const emails = await fetchEmail();
  return (
      <div className="bg-gray-100 min-h-screen">
          <div className="grid grid-cols-1 p-8 md:p-16">
              <h1 className='text-black text-center text-4xl font-bold mt-8'>Terms & Conditions</h1>
          {terms.map((post) => (
              <div key={ post.id} >
                  
              <div className='flex flex-col rounded-lg shadow-lg p-4'>
                      <h1 className='text-3xl mt-12 text-black font-bold'>{post.Title}</h1>
                      
                      
                      <p className='text-black mt-4'>{post.Description} </p>
                      {post.Title == "5. Contact Us" && 
                          <div>
                          {emails.map((e) => (
                      <a
                        key={e.id}
                        href={`mailto:${e.Email}`} 
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {e.Email}
                      </a>
                              ))}
                              </div>
                      }
                  </div>
                  </div>
              
          ))}
              </div>
    </div>
  )
}

export default page
