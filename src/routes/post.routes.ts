import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as postController from "../controllers/post.controller";

const postRouter = Router();

postRouter.post("/", async (req: Request, res: Response) => {
  try {
    const post = req.body;
    const id = uuidv4();
    post.id = id;
    post.createdAt = new Date().toISOString();
    const data = await postController.createPost(post);
    res.status(201).send(data);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send(error);
  }
});

postRouter.get("/", async (req: Request, res: Response) => {
  try {
    const data = await postController.getPosts();
    res.status(200).send(data);
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).send(error);
  }
});

postRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const data = await postController.getPostById(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    console.error("Error getting post:", error);
    res.status(500).send(error);
  }
});

postRouter.put("/description/:id", async (req: Request, res: Response) => {
  try {
    const data = await postController.updatePostDescription(
      req.params.id,
      req.body.description
    );
    res.status(200).send(data);
  } catch (error) {
    console.error("Error updating post description:", error);
    res.status(500).send(error);
  }
});

postRouter.put("/content/:id", async (req: Request, res: Response) => {
  try {
    const data = await postController.updatePostContent(
      req.params.id,
      req.body.title,
      req.body.content
    );
    res.status(200).send(data);
  } catch (error) {
    console.error("Error updating post content:", error);
    res.status(500).send(error);
  }
});

postRouter.put("/image/:id", async (req: Request, res: Response) => {
  try {
    const data = await postController.updatePostImage(
      req.params.id,
      req.body.image
    );
    res.status(200).send(data);
  } catch (error) {
    console.error("Error updating post image:", error);
    res.status(500).send(error);
  }
});

postRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const data = await postController.deletePost(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send(error);
  }
});

export default postRouter;
