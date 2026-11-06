# CineSearch – Movie Search App

A responsive single-page movie search application built with React, TypeScript, Vite and The Movie Database (TMDB) API.

## Features
- Search movies by title
- Movie poster, release date, rating and overview
- Previous/next pagination
- Sort current search results by release date or rating
- Filter current page by minimum rating
- Responsive layout
- Reusable components and utility tests

## 1. Get a TMDB API key
1. Visit https://www.themoviedb.org/ and create an account.
2. Open https://www.themoviedb.org/settings/api.
3. Request an API key (Developer option) and complete the requested details.
4. Copy the **API Key (v3 auth)**.

## 2. Run the project
Open this folder in VS Code. In the terminal, run:

```bash
npm install
```

Create a file named `.env` in the project root (same level as `package.json`) and add:

```env
VITE_TMDB_API_KEY=paste_your_v3_api_key_here
```

Save the file, then run:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually http://localhost:5173.

> Never upload your `.env` file to GitHub. The `.env` file is ignored by Git. Since this is a frontend assignment, the Vite environment variable is visible in the browser bundle; use a backend proxy for production applications that need to keep credentials secret.

## 3. Run tests and build
```bash
npm run test:run
npm run build
```

## 4. Push to GitHub
Create an empty repository on GitHub, then run these commands in the project terminal:

```bash
git init
git add .
git commit -m "Build movie search app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your own GitHub repository URL.

## 5. Deploy on Netlify
1. Push the project to GitHub.
2. In Netlify, choose **Add new project → Import an existing project**.
3. Select your GitHub repository.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. In **Site configuration → Environment variables**, add `VITE_TMDB_API_KEY` with your TMDB v3 API key.
7. Trigger a new deploy.

## Notes
- Search uses TMDB's `/search/movie` endpoint.
- Pagination is provided by TMDB.
- Sorting and rating filtering apply to the results on the currently displayed page.
- This product uses the TMDB API but is not endorsed or certified by TMDB.
