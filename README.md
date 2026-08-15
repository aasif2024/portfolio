# Mohammed Aasif M — Portfolio (MERN)

A full MERN-stack rebuild of the portfolio: **M**ongoDB stores the projects, certificates, and
contact-form messages; **E**xpress serves them as a REST API; **R**eact renders the site and
calls that API; **N**ode runs all of it. Same design as the static version (deep plum/brass
palette, git-log project accordions, certificate lightbox), but the content now lives in a
database instead of being hard-coded into the page.

```
portfolio-mern/
├── server/              Express API + MongoDB models
│   ├── models/          Project, Certificate, Message (Mongoose schemas)
│   ├── routes/          /api/projects, /api/certificates, /api/contact
│   ├── seed.js          Populates the DB with the real project/certificate data
│   └── server.js        App entry point
└── client/              React app (Vite)
    └── src/
        ├── components/  Nav, Hero, About, Work, Experience, Skills, Certificates, Contact
        ├── assets/       Photo + the six certificate images
        ├── api.js        fetch() wrappers for the three endpoints
        └── useReveal.js  Scroll-reveal hook (IntersectionObserver)
```

## 1. Prerequisites

- Node.js 18+ and npm
- A MongoDB database — either:
  - **Local**: install MongoDB Community Edition and run `mongod`, or
  - **Free cloud option**: create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and copy its connection string

## 2. Set up the server

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and set `MONGO_URI` to your database:

```
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
# or, for Atlas:
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/portfolio
```

Seed the database with the real portfolio content (projects + certificates):

```bash
npm run seed
```

Start the API:

```bash
npm run dev     # auto-restarts on changes (nodemon)
# or
npm start
```

You should see `Connected to MongoDB` and `API server running on http://localhost:5000`.
Sanity-check it: open `http://localhost:5000/api/health` in a browser — you should get
`{"ok":true,"status":"healthy"}`.

## 3. Set up the client

In a **second terminal**:

```bash
cd client
npm install
cp .env.example .env      # leave VITE_API_URL blank for local dev
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). The dev server proxies any
`/api/...` request straight to your Express server on port 5000, so no extra config is needed
locally.

## 4. How the pieces talk to each other

- `GET /api/projects` → powers the **Work** section. Each project includes a `commits` array,
  which renders as the git-log accordion.
- `GET /api/certificates` → powers the **Certificates** gallery + lightbox. The API returns each
  certificate's filename; the React app matches that filename to the actual image bundled in
  `client/src/assets/certs/`.
- `POST /api/contact` → the **Contact** form at the bottom of the page. Submissions are validated
  server-side and saved to the `messages` collection in MongoDB — check them with
  `mongosh` → `use portfolio` → `db.messages.find().pretty()`, or hook up a small admin view later.

## 5. Editing content

Since content now lives in MongoDB rather than the page itself, there are two ways to change it:

- **Quick edit**: change the data in `server/seed.js` and re-run `npm run seed` (this wipes and
  re-inserts projects/certificates, so don't do this if you've since edited data by hand elsewhere).
- **Direct edit**: connect with `mongosh` or MongoDB Compass and edit documents in the
  `projects` / `certificates` collections directly.

To add a **new project**, add a new commit array + metadata to `seed.js` (or insert a document
directly) — no code changes needed, `Work.jsx` renders whatever the API returns.

## 6. Deploying

- **API**: any Node host works — Render, Railway, Fly.io, a VPS. Set `MONGO_URI` (point at Atlas
  for production) and `CLIENT_ORIGIN` (your deployed frontend's URL) as environment variables.
- **Client**: `npm run build` in `client/` produces a static `dist/` folder — deploy that to
  Vercel, Netlify, or any static host. Set `VITE_API_URL` to your deployed API's base URL before
  building.

## 7. What's still a placeholder

The three projects don't have real GitHub repo links wired up yet (`githubUrl` is empty in
`seed.js`). Once your repos are public, add the URLs there and re-seed — the model already
supports it, the UI just isn't using it yet.
