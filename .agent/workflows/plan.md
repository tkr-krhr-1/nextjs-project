---
description:
---

Path: .agent/workflows/initialize_issue_branch.md

Description: 指定された Issue ID とタスク概要に基づき、適切な命名規則で Git ブランチを作成し、AntiGravity の完全な自律判断による実装計画書（Plan）を生成する。

1. **入力変数の検証: Issue ID**

   - コンテキスト変数 `{{Issue番号}}` (以下 `ISSUE_ID`) が提供されているか確認する。
   - もし `ISSUE_ID` が空、または未定義の場合、ユーザーに "Issue ID を入力してください" と尋ね、入力を待機して `ISSUE_ID` に格納する。

2. **入力変数の検証: タスク概要**

   - コンテキスト変数 `{{タスクの概要}}` (以下 `TASK_DESC`) が提供されているか確認する。
   - もし `TASK_DESC` が空、または未定義の場合、ユーザーに "タスクの概要を入力してください" と尋ね、入力を待機して `TASK_DESC` に格納する。

3. **作業ディレクトリの安全確認**

   - ターミナルで以下のコマンドを実行し、変更状態を確認する。
     ```bash
     git status --porcelain
     ```
   - コマンドの出力結果を確認する。
   - **分岐処理:** もし出力結果が空ではない（変更がある）場合、処理を中断し、ユーザーに "未コミットの変更があります。stash または commit してから再実行してください。" と出力して終了する。

4. **ブランチタイプの決定 (Branch Strategy)**

   - `TASK_DESC` のテキスト内容を分析し、変数 `BRANCH_TYPE` を以下の優先順位で決定する。
     1. "バグ", "bug", "fix", "error", "crash" のいずれかを含む場合 → `bugfix`
     2. "リファクタリング", "refactor", "clean" のいずれかを含む場合 → `refactor`
     3. "ドキュメント", "docs", "readme" のいずれかを含む場合 → `docs`
     4. "緊急", "hotfix", "critical" のいずれかを含む場合 → `hotfix`
     5. 上記のいずれにも該当しない場合 → `feature`

5. **ブランチ名スラッグの生成**

   - `TASK_DESC` を基に、英語・小文字・ケバブケース（スペースをハイフンに置換）の形式で、3〜5 単語程度の短い識別子を生成し、変数 `SLUG` に格納する。（例: `implement-login-flow`）

6. **ブランチ名の確定**

   - 変数 `BRANCH_NAME` を以下の形式で結合し、確定する。
     `${BRANCH_TYPE}/${ISSUE_ID}-${SLUG}`

7. **既存ブランチの確認**

   - ターミナルで以下のコマンドを実行し、同名のブランチが存在するか確認する。
     ```bash
     git branch --list ${BRANCH_NAME}
     ```

8. **ブランチの作成または切り替え**

   - **分岐処理:**
     - 手順 7 の出力結果が空ではない（既に存在する）場合:
       ```bash
       git checkout ${BRANCH_NAME}
       ```
     - 手順 7 の出力結果が空（存在しない）場合:
       ```bash
       git checkout -b ${BRANCH_NAME}
       ```

9. **現在のブランチの検証**

   - ターミナルで以下のコマンドを実行し、現在のブランチ名を確認する。
     ```bash
     git branch --show-current
     ```
   - 出力が `BRANCH_NAME` と一致することを確認する。

10. **実装計画書の生成**

    - **CRITICAL Instruction:** `TASK_DESC` の内容および現在のコードベースを深く分析し、このタスクを遂行するための実装計画を Conversation で依頼する。

11. **完了通知**
    - ユーザーに処理の完了を伝えるため、ターミナルに以下のメッセージを出力する。
      "Branch `${BRANCH_NAME}` is ready. Plan generated at `.agent/plans/${ISSUE_ID}_plan.md`. Please review the plan."
