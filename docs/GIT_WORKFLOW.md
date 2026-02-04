# Git Workflow Guide for Designers

This guide explains the git workflow for working on prototypes in this project.

## Overview

Each designer works on their own **branch**. Think of a branch as your own copy of the project where you can make changes without affecting anyone else's work.

The workflow has three stages:

1. **Work locally** - Build and iterate on your local machine
2. **Share in-progress** - Create a draft PR to get a multidev URL for feedback
3. **Final handoff** - Request approval and merge to main

## The Three-Stage Workflow

### Stage 1: Work Locally

Start building your prototype on a local branch without pushing to GitHub.

**Create your branch:**

Terminal:

```bash
git checkout main
git pull origin main
git checkout -b your-name/project-name
```

GitHub Desktop:

1. Click the branch dropdown → "New Branch"
2. Name it following the pattern: `your-name/project-name`
3. Click "Create Branch"

**Naming Convention:**

- Start with your first name
- Add a slash `/`
- Then a descriptive project name
- Use lowercase and dashes

✅ Good: `sarah/site-management`, `marcus/user-profiles`
❌ Bad: `MyBranch`, `test`, `branch1`

**Create your project:**

```bash
npm run new
```

**Work and commit locally:**

Terminal:

```bash
git add .
git commit -m "Add site table to dashboard"
```

GitHub Desktop:

1. Your changes appear in the left sidebar
2. Add a commit message in the bottom left
3. Click "Commit to your-name/project-name"

**Preview locally:**

```bash
npm run dev
```

Visit http://localhost:3000/projects/your-project-name

Continue iterating locally without pushing. This is perfect for exploration and early development.

### Stage 2: Share In-Progress Work

When you're ready to share with other designers or product managers, create a draft pull request to get a multidev environment.

**Push your branch:**

Terminal:

```bash
git push origin your-name/project-name
```

GitHub Desktop:

- Click "Push origin" button in the top toolbar

**Create a Draft Pull Request:**

1. Go to the repository on GitHub in your web browser
2. Click "Pull requests" → "New pull request"
3. Select your branch to merge into `main`
4. Add a title and description of what you're working on
5. Click "Create **draft** pull request" (use the dropdown arrow)

Alternatively, in GitHub Desktop:

- Click "Preview Pull Request" button
- Review changes and click "Create pull request"
- This opens GitHub in your browser where you can make it a draft

**Multidev environment created:**

- A multidev environment is automatically created for your PR
- You'll receive a URL to share with teammates and PMs
- Continue pushing updates as you iterate
- The multidev URL updates automatically with each push

**Collaborate and iterate:**

Terminal:

```bash
git add .
git commit -m "Update dashboard header"
git push
```

GitHub Desktop:

1. Make your changes
2. Commit in the app
3. Click "Push origin"

Share the multidev URL for feedback. No approval needed yet - this is your working space.

### Stage 3: Final Handoff or Archive

When your prototype is ready for final handoff or to be archived:

**Request approval:**

1. Go to your pull request on GitHub
2. Click "Ready for review" to convert your draft PR
3. **Request a review from `mel-miller`** (required for merge)
4. Add final context about what this prototype demonstrates

**Merge to main:**

- After approval, merge the PR on GitHub
- Your prototype is now on the main URL
- Use the main URL for stakeholder demos and handoffs
- The multidev branch will be cleaned up automatically

## Temporary/Exploratory Work

If you were just exploring and don't want to share or keep the prototype:

1. **Don't create a PR** - just work locally
2. When you're done, delete your local branch:

Terminal:

```bash
git checkout main
git pull origin main
git branch -D your-name/project-name
```

GitHub Desktop:

- Switch to the `main` branch using the branch dropdown
- Click "Fetch origin" then "Pull origin" to get latest changes
- Right-click your branch in the branch list
- Select "Delete..."

## Keeping Projects in Sync

Periodically pull the latest changes from main to see other designers' work:

Terminal:

```bash
git checkout main
git pull origin main
```

GitHub Desktop:

1. Switch to the `main` branch using the branch dropdown
2. Click "Fetch origin" to check for updates
3. Click "Pull origin" to download the latest changes

## Common Git Commands

### Check Your Current Branch

```bash
git branch
```

The branch with a `*` is your current branch.

### See What Changed

```bash
git status
```

Shows which files have been modified.

### See Specific Changes

```bash
git diff
```

Shows line-by-line changes in your files.

### Undo Changes (Before Committing)

```bash
git checkout -- filename.tsx
```

This discards your changes to that file. **Be careful - this can't be undone!**

### Switch to a Different Branch

```bash
git checkout branch-name
```

## Commit Message Tips

- Start with a verb: Add, Update, Fix, Remove
- Be specific about what changed
- Keep it short (under 50 characters)

✅ Good: `Add navigation sidebar`, `Update card layout`, `Fix table spacing`
❌ Bad: `changes`, `wip`, `stuff`

## Resolving Conflicts

Sometimes when you try to merge or pull, you'll get a **merge conflict**. This happens when:

- Someone else changed the same file you changed
- Git can't automatically combine the changes

**Steps to resolve:**

1. Git will mark the conflicting files
2. Open the file - you'll see markers like:

   ```
   <<<<<<< HEAD
   Your changes
   =======
   Their changes
   >>>>>>> main
   ```

3. Choose which changes to keep (or combine them)
4. Remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
5. Save the file
6. Commit the resolved conflict:
   ```bash
   git add filename.tsx
   git commit -m "Resolve merge conflict"
   ```

**When to ask for help:**

- If you're unsure which changes to keep
- If the conflict seems complicated
- If multiple files have conflicts

## Best Practices

### DO:

✅ Work locally first before creating a PR
✅ Create draft PRs for in-progress work you want to share
✅ Commit often with clear messages
✅ Use descriptive branch names
✅ Pull from main before starting new work
✅ Ask for help if you're stuck

### DON'T:

❌ Work directly on the `main` branch
❌ Make huge commits with many changes
❌ Use vague commit messages like "updates"
❌ Force push (`git push --force`) without understanding why
❌ Delete branches with unmerged work

## Troubleshooting

### "Your branch is behind 'origin/main'"

Your local main branch is outdated. Update it:

```bash
git checkout main
git pull origin main
```

### "Permission denied (publickey)"

Your SSH key isn't set up. Ask for help setting up git credentials.

### "fatal: not a git repository"

You're not in the project directory. Navigate to the project:

```bash
cd path/to/pds-prototypes
```

### "Changes not staged for commit"

You have changes but haven't added them:

```bash
git add .
git commit -m "Your message"
```

### I committed to the wrong branch

1. Note your commit message
2. Switch to the correct branch:
   ```bash
   git checkout correct-branch-name
   ```
3. Cherry-pick your commit:
   ```bash
   git cherry-pick commit-hash
   ```
4. Go back to the wrong branch and reset:
   ```bash
   git checkout wrong-branch
   git reset --hard HEAD~1
   ```

**Note:** Ask for help if you're unsure about the commit hash.

## Visual Guide

```
main (production - stakeholder demos)
  |
  |--- melissa/dashboard (draft PR) → multidev: dashboard.pantheon.site
  |                                    (in-progress sharing)
  |
  |--- sarah/site-mgmt (ready for review) → multidev: site-mgmt.pantheon.site
  |                                         (awaiting approval)
  |
  |--- marcus/user-ui (merged) → now on main URL
                                 (final handoff complete)
```

Each draft PR creates its own multidev environment for collaboration!

## Getting Help

If you get stuck:

1. **Ask Claude Code** - If using Claude, ask for help with git commands
2. **Check git status:** `git status`
3. **Read the error message** - it often tells you what to do
4. **Google the error** - git errors are common and well-documented
5. **Ask a teammate** - don't struggle alone!
6. **Ask in the team channel** - others might have the same question

## Useful Resources

- [Git Basics (Interactive Tutorial)](https://learngitbranching.js.org/)
- [GitHub's Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Oh Shit, Git!?!](https://ohshitgit.com/) - Fixing common mistakes

---

Remember: Git is a safety net. You can almost always undo things, so don't be afraid to experiment!
