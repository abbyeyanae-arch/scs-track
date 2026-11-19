# GitHub Pages Deploy Log — SCS2b.2

Site address: https://abbyeyanae-arch.github.io/bio-page/

## Step 1: Push site repository to GitHub
- Clicked or typed: `git push -u origin main` in `~/scs/projects/bio-page`
- Expected: `main` branch updates on GitHub without errors
- Seen: Objects pushed to `github.com:abbyeyanae-arch/bio-page.git` (`main -> main`)

## Step 2: Enable GitHub Pages from branch
- Clicked or typed: Repository Settings -> Pages -> Source set to `Deploy from a branch`, branch `main` (`/ (root)`), Save
- Expected: GitHub builds and publishes the site at `https://abbyeyanae-arch.github.io/bio-page/`
- Seen: Site published live at `https://abbyeyanae-arch.github.io/bio-page/` over HTTPS

## Step 3: Add custom 404 page and re-push
- Clicked or typed: Created `404.html`, ran `git add 404.html`, `git commit`, and `git push`
- Expected: Missing paths return a custom `404.html` response on `https://abbyeyanae-arch.github.io/bio-page/`
- Seen: Commit pushed to `main` on `github.com:abbyeyanae-arch/bio-page.git`
