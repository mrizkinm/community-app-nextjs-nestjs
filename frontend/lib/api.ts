import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getPosts(params: {
  tag?: string;
  onlyMine?: boolean;
}) {
  const session = await getServerSession(authOptions);
  const queryString = new URLSearchParams();
  if (params.tag) queryString.append('tag', params.tag);
  if (params.onlyMine) queryString.append('onlyMine', params.onlyMine.toString());

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/posts?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.token}`
      },
    });
    if (!response.ok) {
      return [];
    }
    return response.json();
  } catch (error) {
    return [];
  } finally {
  }
}

export async function getDetailPost(id: number) {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.token}`
      },
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    return null;
  } finally {
  }
}

export async function getComments(id: number) {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/comments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.token}`
      },
    });
    if (!response.ok) {
      return [];
    }
    return response.json();
  } catch (error) {
    return [];
  } finally {
  }
}

export async function getAnalytics() {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.token}`
      },
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    return null;
  } finally {
  }
}

export async function getAllPosts() {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.token}`
      },
    });
    if (!response.ok) {
      return [];
    }
    return response.json();
  } catch (error) {
    return [];
  } finally {
  }
}

export async function getAdminDetailPost(id: number) {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.token}`
      },
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    return null;
  } finally {
  }
}

export async function getAdminComments(id: number) {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/comments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.token}`
      },
    });
    if (!response.ok) {
      return [];
    }
    return response.json();
  } catch (error) {
    return [];
  } finally {
  }
}