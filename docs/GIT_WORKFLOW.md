# Git Workflow Guide for Designers

This guide explains the git workflow for working on prototypes in this project.

## Overview

Each designer works on their own **branch**. Think of a branch as your own copy of the project where you can make changes without affecting anyone else's work.

When you push your branch to GitHub, Pantheon automatically creates a **multidev environment** - a live preview URL where you can view and share your prototype.

## Step-by-Step Workflow

### 1. Start a New Prototype

**Switch to the main branch and get the latest changes:**

```bash
git checkout main
git pull origin main
```

**Create your own branch:**

```bash
git checkout -b your-name/project-name
```

**Example:**

```bash
git checkout -b melissa/dashboard-redesign
```

**Naming Convention:**

- Start with your first name
- Add a slash `/`
- Then a descriptive project name
- Use lowercase and dashes

✅ Good: `sarah/site-management`, `marcus/user-profiles`
❌ Bad: `MyBranch`, `test`, `branch1`

### 2. Create Your Project

Run the project generator:

```bash
npm run new
```

Answer the prompts to create your project structure.

### 3. Work on Your Prototype

Make your changes in the `/projects/your-project-name/` folder.

As you work, **commit your changes regularly:**

```bash
git add .
git commit -m "Add site table to dashboard"
```

**Commit Message Tips:**

- Start with a verb: Add, Update, Fix, Remove
- Be specific about what changed
- Keep it short (under 50 characters)

✅ Good: `Add navigation sidebar`, `Update card layout`, `Fix table spacing`
❌ Bad: `changes`, `wip`, `stuff`

### 4. Push Your Branch

Send your changes to GitHub:

```bash
git push origin your-branch-name
```

**First time pushing:**

```bash
git push -u origin your-branch-name
```

The `-u` flag sets up tracking so future pushes are simpler.

**After first push:**

```bash
git push
```

### 5. View Your Multidev Environment

After pushing, Pantheon will create a multidev environment. You'll get a URL like:

```
https://your-branch-name.pantheon.example.com
```

Share this URL with your team to get feedback!

### 6. Make More Changes

As you continue working:

1. Make changes to your files
2. Commit the changes:
   ```bash
   git add .
   git commit -m "Update dashboard header"
   ```
3. Push to update your multidev:
   ```bash
   git push
   ```

Your multidev environment will automatically update.

### 7. When You're Done

You have two options:

**Option A: Keep Your Work (Merge to Main)**

If this is a long-term prototype you want to preserve:

1. Create a Pull Request on GitHub
2. Ask a teammate to review
3. After approval, merge to `main`
4. Your project will be part of the main site

**Option B: Temporary Work (Delete Your Branch)**

If this was just for testing or a quick prototype:

1. Switch back to main:

   ```bash
   git checkout main
   ```

2. Delete your local branch:

   ```bash
   git branch -D your-branch-name
   ```

3. Delete the remote branch:
   ```bash
   git push origin --delete your-branch-name
   ```

Your multidev environment will be removed, and your project won't appear on the main site.

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

### Get Latest Changes from Main

While on your branch:

```bash
git fetch origin main
git merge origin/main
```

Or the shortcut:

```bash
git pull origin main
```

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

✅ Commit often with clear messages
✅ Push regularly to back up your work
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
main (production)
  |
  |--- melissa/dashboard → multidev: dashboard.pantheon.site
  |
  |--- sarah/site-mgmt → multidev: site-mgmt.pantheon.site
  |
  |--- marcus/user-ui → multidev: user-ui.pantheon.site
```

Each branch creates its own isolated environment!

## Getting Help

If you get stuck:

1. **Check git status:** `git status`
2. **Read the error message** - it often tells you what to do
3. **Google the error** - git errors are common and well-documented
4. **Ask a teammate** - don't struggle alone!
5. **Ask in the team channel** - others might have the same question

## Useful Resources

- [Git Basics (Interactive Tutorial)](https://learngitbranching.js.org/)
- [GitHub's Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Oh Shit, Git!?!](https://ohshitgit.com/) - Fixing common mistakes

---

Remember: Git is a safety net. You can almost always undo things, so don't be afraid to experiment!
