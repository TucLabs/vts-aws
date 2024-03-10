import { client } from "../database";

const POST_TABLE = "vts-portal-posts";

// get posts
export const getPosts = async () => {
  const params = {
    TableName: POST_TABLE,
  };

  try {
    const data = await client.scan(params).promise();
    return data.Items;
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;
  }
};

export const getPostById = async (postId: string) => {
  const params = {
    TableName: POST_TABLE,
    Key: {
      id: postId,
    },
  };

  try {
    const data = await client.get(params).promise();
    return data.Item;
  } catch (error) {
    console.error("Error getting post:", error);
    throw error;
  }
};

// create posts
export const createPost = async (post: {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  image: string;
  tags: string[];
}) => {
  const params = {
    TableName: POST_TABLE,
    Item: post,
  };

  try {
    await client.put(params).promise();
    return post;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// update posts
export const updatePost = async (post: {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  image: string;
  tags: string[];
}) => {
  const params = {
    TableName: POST_TABLE,
    Item: post,
  };

  try {
    await client.put(params).promise();
    return post;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const updatePostTitle = async (postId: string, title: string) => {
  const params = {
    TableName: POST_TABLE,
    Key: {
      id: postId,
    },
    UpdateExpression: "SET #title = :title",
    ExpressionAttributeNames: {
      "#title": "title",
    },
    ExpressionAttributeValues: {
      ":title": title,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await client.update(params).promise();
    return { id: postId, title };
  } catch (error) {
    console.error("Error updating post title:", error);
    throw error;
  }
};

export const updatePostDescription = async (
  postId: string,
  description: string
) => {
  const params = {
    TableName: POST_TABLE,
    Key: {
      id: postId,
    },
    UpdateExpression: "SET #description = :description",
    ExpressionAttributeNames: {
      "#description": "description",
    },
    ExpressionAttributeValues: {
      ":description": description,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await client.update(params).promise();
    return { id: postId, description };
  } catch (error) {
    console.error("Error updating post description:", error);
    throw error;
  }
};

export const updatePostContent = async (
  postId: string,
  title: string,
  content: string
) => {
  const params = {
    TableName: POST_TABLE,
    Key: {
      id: postId,
    },
    UpdateExpression: "SET #title = :title, content = :content",
    ExpressionAttributeNames: {
      "#title": "title",
    },
    ExpressionAttributeValues: {
      ":title": title,
      ":content": content,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await client.update(params).promise();
    return { id: postId, title, content };
  } catch (error) {
    console.error("Error updating post content:", error);
    throw error;
  }
};

export const updatePostImage = async (postId: string, image: string) => {
  const params = {
    TableName: POST_TABLE,
    Key: {
      id: postId,
    },
    UpdateExpression: "SET image = :image",
    ExpressionAttributeValues: {
      ":image": image,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await client.update(params).promise();
    return { id: postId, image };
  } catch (error) {
    console.error("Error updating post image:", error);
    throw error;
  }
};

// delete posts
export const deletePost = async (postId: string) => {
  const params = {
    TableName: POST_TABLE,
    Key: {
      id: postId,
    },
  };

  try {
    await client.delete(params).promise();
    return postId;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const getPrevAndNextPost = async (postId: string) => {
  const params = {
    TableName: POST_TABLE,
  };

  try {
    const data = await client.scan(params).promise();
    const posts = data.Items;
    // order posts by date
    posts?.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    // find index of current post
    const index = posts?.findIndex((post: any) => post.id === postId) ?? 0;
    // get prev and next posts
    const nextPost = posts?.[index + 1];
    if (index > 0) {
      const prevPost = posts?.[index - 1];
      return { prevPost, nextPost };
    }
    return { nextPost };
  } catch (error) {
    console.error("Error getting prev and next posts:", error);
    throw error;
  }
};
