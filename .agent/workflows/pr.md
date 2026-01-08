---
description: 
---

# Path: .agent/workflows/feature_release.md

## Description
現在の作業ディレクトリ内の変更を検出し、Gitへのステージング、コミット、リモートへのプッシュを行った後、GitHub CLIを使用してプルリクエスト（PR）を作成する。

## Steps

1. ターミナルで `gh auth status` を実行し、GitHub CLIが認証済みであることを確認する。
2. ターミナルで `git status --porcelain` を実行し、変更があるファイル（Modified/Untracked）が存在するか確認する。もし出力が空であれば、処理を終了する。
3. ターミナルで `git rev-parse --abbrev-ref HEAD` を実行し、現在のブランチ名を取得する。
4. 変更内容（`git diff` の結果など）を分析し、[Conventional Commits](https://www.conventionalcommits.org/) の形式（例: `feat: ...`, `fix: ...`）に従ったコミットメッセージを生成する。
5. ターミナルで `git add .` を実行し、すべての変更をステージングエリアに追加する。
6. ターミナルで `git status` を実行し、変更が正しくステージングされたか（緑色で表示される状態、または "Changes to be committed"）を確認する。
7. ステップ4で生成したメッセージを使用し、ターミナルで `git commit -m "生成したコミットメッセージ"` を実行する。
8. ターミナルで `git log -1 --oneline` を実行し、新しいコミットが作成されたことを確認する。
9. ターミナルで `git push origin HEAD` を実行し、現在のブランチをリモートリポジトリにプッシュする。
10. コミット内容と変更の概要に基づき、PRの「タイトル」と「本文（Description）」を生成する。
11. ターミナルで以下のコマンドを実行し、PRを作成する（`{{Title}}` と `{{Body}}` はステップ10の内容に置換する）。
    ```bash
    gh pr create --title "{{Title}}" --body "{{Body}}" --web
    ```
12. コマンドの出力結果からPRのURLを特定し、"Pull Request created successfully: [URL]" という形式でユーザーに報告する。