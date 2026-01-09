import { Post } from "../entities/Post";

export interface PostRepository {
  exists(slug: string): Promise<boolean>;
  save(post: Post): Promise<void>;
}
