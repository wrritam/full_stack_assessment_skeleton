const BASE_URI = import.meta.env.VITE_BACKEND_URL;

const post = async (url: string, body: any) => {
  const conf = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(`${BASE_URI}/${url}`, conf);

  if (response.ok) {
    return response.json();
  }
  throw new Error("Request failed");
};

const get = async (url: string) => {
  const conf = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${BASE_URI}/${url}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Request failed");
};

const put = async (url: string, body: any) => {
  const conf = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(`${BASE_URI}/${url}`, conf);

  if (response.ok) {
    return response.json();
  }
  throw new Error("Request failed");
};

const patch = async (url: string, body: any) => {
  const conf = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(`${BASE_URI}/${url}`, conf);

  if (response.ok) {
    return response.json();
  }
  throw new Error("Request failed");
};

const deleteRequest = async (url: string) => {
  const conf = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const response = await fetch(`${BASE_URI}/${url}`, conf);

  if (response.ok) {
    return response.json();
  }

  throw new Error("Request failed");
};

export default { post, get, put, deleteRequest, patch };
