# GitHub Copilot Working Guidelines

## Response Style

- Respond in Korean.
- Give a short explanation first, and provide details only when necessary.
- When I ask for an opinion, answer only the question and do not start analysis or code changes in advance.
- Before modifying code, ask which files should be changed or briefly confirm the files you intend to modify.
- When suggesting commands, explain what each part of the command means.
- Do not guess uncertain parts. Say that verification is needed.

## Working Style

- Follow the existing code style first.
- Do not perform unnecessary refactoring.
- Do not modify files outside the requested scope.
- Before making large changes, show the work plan first.
- Always ask for confirmation before deleting files, moving many files, or installing packages.
- Do not make broad changes just because related issues are found.
- Keep changes minimal and focused on the requested task.

## Git Rules

- Use the `feature/feature-name` format for branch names.
- Write commit messages that clearly describe the changes.
- Before merging, check the current branch and changed files.
- If a conflict occurs, first summarize which files have conflicts.
- Do not run merge, rebase, reset, or force push commands unless explicitly requested.

## Frontend Rules

- Use React + TypeScript as the default standard.
- Avoid using `any` types.
- Keep components small and clearly separated.
- Follow the existing Tailwind class/token rules first.
- Prefer existing components, hooks, utilities, and patterns before creating new ones.
- Do not introduce a new library unless explicitly approved.
- Keep UI changes consistent with the existing design system.

## Context Management Rules

- Do not read entire files by default. Read only the necessary parts.
- For large files, first understand the structure, then inspect only the related parts.
- Do not analyze `node_modules`, `dist`, `build`, `.next`, or `coverage` folders.
- Do not repeat the same explanation.
- Do not analyze beyond the requested scope.
- Do not scan the entire project unless I explicitly say “full analysis.”

## File Reading / Search Rules

- Prefer targeted searches over reading full files.
- Use file names, component names, function names, type names, and error messages as search keywords.
- Before opening a large file, explain why that file is likely relevant.
- When reading a file, read only the smallest necessary range first.
- If more context is needed, expand the range gradually.
- Do not open generated files, lock files, or minified files unless explicitly requested.
- Do not read `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock` unless dependency resolution is directly related to the task.

## Code Change Rules

- Before editing, summarize the intended change briefly.
- Prefer showing diffs or changed code blocks instead of pasting full files.
- Do not rewrite unrelated code.
- Do not rename variables, files, components, or functions unless necessary for the requested change.
- Preserve existing formatting, naming, and folder structure.
- If multiple approaches are possible, recommend the safest minimal option first.
- If a change may affect behavior, mention the risk before applying it.

## Output Rules

- Keep responses concise.
- Do not paste full files unless explicitly requested.
- Show only changed code blocks or diffs when possible.
- After making changes, summarize:
  - changed files
  - key changes
  - verification steps

- Do not include lengthy explanations unless asked.

---

# Project-Specific Guidelines

## Project Overview

This project is a personal study archive website.

The main goal is to build a site for organizing coding study notes, code snippets, explanations, and folders while learning step by step.

This project is also for practice, so changes should be made gradually and clearly.

## Project Tech Stack

- Vite
- React
- TypeScript
- Bootstrap
- Zustand
- json-server
- JSON file based data storage
- pnpm

## Bootstrap Rules

- Use Bootstrap for the basic UI.
- Install Bootstrap with:

```bash
pnpm add bootstrap
```

- Prefer Bootstrap classes before writing custom CSS.
- Keep custom CSS minimal.
- Do not introduce another UI library unless explicitly requested.
- If the project currently has Tailwind rules from a previous template, prefer Bootstrap for this project unless I explicitly request Tailwind.

## State Management Rules

- Use Zustand for client-side state management.
- Keep stores small and separated by domain.
- Avoid putting all state into one large store.
- Prefer clear store names such as:
  - `useFolderStore`
  - `useNoteStore`
  - `useEditorStore`

## Data Storage Rules

- Do not use a real database at this stage.
- Use JSON files as the data source.
- Use `json-server` for local API simulation.
- Keep data structures simple and readable.
- Before changing the JSON structure, explain the reason first.
- Do not introduce backend frameworks unless explicitly requested.

## Main Features

### 1. Folder Structure Management

The site should support folder-based organization.

Required features:

- Create folder
- Edit folder name
- Delete folder
- View folder list
- Select a folder before saving a study note

Example folder data:

```json
{
  "folders": [
    {
      "id": "folder-001",
      "name": "React",
      "parentId": null,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Study Note Editor

The editor should allow saving study content.

Required fields:

- Title
- Folder
- Code content
- Explanation
- Tags
- Created date
- Updated date

A folder must be selected before saving.

Example note data:

```json
{
  "notes": [
    {
      "id": "note-001",
      "folderId": "folder-001",
      "title": "Object.entries usage",
      "code": "Object.entries(obj).map(([key, value]) => value)",
      "description": "Object.entries converts an object into key-value pairs.",
      "tags": ["javascript", "object"],
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

### 3. Saved Note List

The site should show saved study notes as a list.

Required features:

- View note list
- Filter by folder
- Search by title, description, code, or tag
- Open note detail
- Edit note
- Delete note

## Recommended Development Order

Build this project step by step.

Recommended order:

1. Create the Vite + React + TypeScript project
2. Install Bootstrap
3. Create the basic folder structure
4. Set up routing if needed
5. Create JSON data structure
6. Set up json-server
7. Create folder list page
8. Create folder create/edit/delete functions
9. Create note editor page
10. Add save validation for required folder selection
11. Create saved note list page
12. Add search and filter
13. Connect Zustand stores
14. Clean up UI with Bootstrap

Do not implement multiple large steps at once unless explicitly requested.

## Recommended Folder Structure

Use this as the initial direction.

```text
src/
  app/
    App.tsx
  components/
    common/
    folder/
    note/
    editor/
  pages/
    FolderPage.tsx
    NoteEditorPage.tsx
    NoteListPage.tsx
  stores/
    useFolderStore.ts
    useNoteStore.ts
  services/
    folderApi.ts
    noteApi.ts
  types/
    folder.ts
    note.ts
  utils/
    date.ts
  main.tsx
```

Do not create all files at once unless needed for the current step.

## Coding Rules

- Use React + TypeScript.
- Avoid using `any`.
- Prefer explicit types and interfaces.
- Keep components small and focused.
- Follow the existing code style.
- Do not refactor unrelated code.
- Do not modify files outside the requested scope.
- Do not add new packages without confirmation.

## Type Naming Rules

Use clear domain types.

Examples:

```ts
export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StudyNote {
  id: string;
  folderId: string;
  title: string;
  code: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

## API Rules

Use json-server style REST endpoints.

Expected endpoints:

```text
GET    /folders
POST   /folders
PATCH  /folders/:id
DELETE /folders/:id

GET    /notes
GET    /notes/:id
POST   /notes
PATCH  /notes/:id
DELETE /notes/:id
```

Keep API functions separated under `src/services`.

## Important Development Principle

This project is for learning.

Prefer simple, readable, step-by-step implementation over advanced abstraction.

Do not over-engineer.
