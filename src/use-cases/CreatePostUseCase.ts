import { Post } from "../domain/entities/Post";
import { PostRepository } from "../domain/repositories/PostRepository";

export class CreatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(post: Post): Promise<void> {
    // 1. 重複チェック
    const isExists = await this.postRepository.exists(post.slug);
    if (isExists) {
      throw new Error("ALREADY_EXISTS");
    }

    // 2. 保存
    await this.postRepository.save(post);
  }
}
