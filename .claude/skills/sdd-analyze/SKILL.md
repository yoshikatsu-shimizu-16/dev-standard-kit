---
name: sdd-analyze
description: requirements.md・design.md・tasks.mdの整合性をconstitution.mdと突き合わせてチェックする、read-onlyの整合性ゲート。実装(implement)の直前に使う。
---

このスキルの実体は `.agents/skills/sdd-analyze/SKILL.md` にある(Agent Skills open
standardの実装場所を`.claude/skills/`(Claude Code)と`.agents/skills/`(Codex CLI等)の
両方に置き、単一の内容を重複させないための転送ファイル)。

起動したら必ず `.agents/skills/sdd-analyze/SKILL.md` を読み、そこに書かれた
Steps(まず`bash scripts/spec-check.sh`を実行する)/ Verdict format / Boundary に従うこと。
