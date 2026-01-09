import { describe, it, expect, vi } from "vitest";
import { CreatePostUseCase } from "./CreatePostUseCase";
import { PostRepository } from "../domain/repositories/PostRepository";
import { Post } from "../domain/entities/Post";

describe("CreatePostUseCase", () => {
  const mockRepository: PostRepository = {
    exists: vi.fn(),
    save: vi.fn(),
  };

  const useCase = new CreatePostUseCase(mockRepository);

  const samplePost: Post = {
    title: "Test Post",
    slug: "test-post",
    description: "This is a test post",
    date: "2026-01-09",
    category: "Test",
    tags: ["test", "vitest"],
    content: "Hello World",
  };

  it("正常に記事を保存できること", async () => {
    vi.mocked(mockRepository.exists).mockResolvedValue(false);
    vi.mocked(mockRepository.save).mockResolvedValue(undefined);

    await expect(useCase.execute(samplePost)).resolves.not.toThrow();
    expect(mockRepository.save).toHaveBeenCalledWith(samplePost);
  });

  it("スラッグが重複している場合にエラーを投げること", async () => {
    vi.mocked(mockRepository.exists).mockResolvedValue(true);
    // 前のテストの呼び出し履歴をクリア
    vi.mocked(mockRepository.save).mockClear();

    await expect(useCase.execute(samplePost)).rejects.toThrow("ALREADY_EXISTS");
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});
