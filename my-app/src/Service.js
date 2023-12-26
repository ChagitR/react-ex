//Loading users API
export const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

//Loading posts API
export const fetchPosts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Creating a new psut API
export const NewPostSrv = async (data) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        body: data.body,
        userId: data.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    const dataRe = await response.json();
    return dataRe;

  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
