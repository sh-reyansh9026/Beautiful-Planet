import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export const fetchBlogs = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/blogs?populate=image`);
    return data.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const fetchBlogBySlug = async (slug: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=image`);
    return data.data.length ? data.data[0] : null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};
