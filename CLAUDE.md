# Claude Code Working Guidelines

## Response Style

- Respond in Korean.
- Give a short explanation first, and provide details only when necessary.
- Before modifying code, briefly summarize which files will be changed.
- When suggesting commands, explain what each part of the command means.
- Do not guess uncertain parts. Say that verification is needed.

## Working Style

- Follow the existing code style first.
- Do not perform unnecessary refactoring.
- Do not modify files outside the requested scope.
- Before making large changes, show the work plan first.
- Always ask for confirmation before deleting files, moving many files, or installing packages.

## Git Rules

- Use the `feature/feature-name` format for branch names.
- Write commit messages that clearly describe the changes.
- Before merging, check the current branch and changed files.
- If a conflict occurs, first summarize which files have conflicts.

## Frontend Rules

- Use React + TypeScript as the default standard.
- Avoid using `any` types.
- Keep components small and clearly separated.
- Follow the existing Tailwind class/token rules first.

## Token Saving Rules

- Do not read entire files by default. Read only the necessary files.
- For large files, first understand the structure, then inspect only the necessary parts.
- Prefer targeted searches over reading full files.
- Do not repeat explanations.
- After code changes, provide only a brief summary of the changes.
- Do not paste full file contents unless I explicitly ask for the full file.

## Token / Context Management

- Before starting work, first identify only the candidate files that may be needed.
- For large files, do not read the entire file. Focus on related functions/components.
- Do not analyze `node_modules`, `dist`, `build`, `.next`, or `coverage` folders.
- Do not repeat the same explanation. Summarize mainly around the changes.
- Do not scan the entire project unless I explicitly say “full analysis.”

## File Reading / Search Rules

- Prefer targeted searches over reading full files.
- Use file names, component names, function names, type names, and error messages as search keywords.
- Before opening a large file, explain why that file is likely relevant.
- When reading a file, read only the smallest necessary range first.
- If more context is needed, expand the range gradually.
- Do not open generated files, lock files, or minified files unless explicitly requested.
- Do not read `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock` unless dependency resolution is directly related to the task.

## Output Rules

- Keep responses concise.
- Do not paste full files unless explicitly requested.
- Show only changed code blocks or diffs when possible.
- After making changes, summarize:
  - changed files
  - key changes
  - verification steps

- Do not include lengthy explanations unless asked.
