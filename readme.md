# NBA Injury Tracker

A React application with serverless API that scrapes NBA injury data from ESPN.

## Features

- **React Frontend**: Modern React app with Create React App
- **Serverless API**: Node.js API function that scrapes NBA injury data
- **Real-time Data**: Fetches current injury information for NBA teams
- **Responsive Design**: Works on desktop and mobile devices

## Deploy to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/sorting)

### Option 2: Manual Deployment

1. **Fork this repository** to your GitHub account

2. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

3. **Clone and setup**:
   ```bash
   git clone https://github.com/your-username/sorting.git
   cd sorting
   npm install
   ```

4. **Configure environment variables**:
   ```bash
   vercel env add SCRAPE_URL production
   # Enter: https://www.espn.com/nba/injuries
   
   vercel env add NBA_TEAM production
   # Enter your team name (e.g., "Lakers", "Warriors", etc.)
   ```

5. **Deploy**:
   ```bash
   vercel --prod
   ```

### Option 3: GitHub Integration

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the React app configuration

2. **Add environment variables** in the Vercel dashboard:
   - `SCRAPE_URL`: `https://www.espn.com/nba/injuries`
   - `NBA_TEAM`: Your preferred NBA team name

3. **Deploy**: Vercel will automatically deploy on every push to main branch

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
This will automatically launch your browser with Hot Module Reload running.
Saved changes to file in `src/` will automatically reload the page.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Runs the api tests

### `npm test:i`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run serve`

Builds the app for production then launches the sandbox server at [http://localhost:3333](http://localhost:3333) so you can test the production build.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

### Vercel Documentation

- [Vercel Functions](https://vercel.com/docs/functions) - Learn about serverless functions
- [Environment Variables](https://vercel.com/docs/environment-variables) - Managing secrets and config
- [Deployment](https://vercel.com/docs/deployments) - Understanding deployments and domains

### React & Development

- [Create React App](https://create-react-app.dev/) - Learn more about the React framework
- [React Documentation](https://reactjs.org/) - Official React documentation
- [Node.js](https://nodejs.org/) - JavaScript runtime for the API

### API Endpoints

- **GET `/api`** - Fetches NBA injury data for the configured team
- **Environment Variables Required**:
  - `SCRAPE_URL`: ESPN NBA injuries page URL
  - `NBA_TEAM`: Team name to filter injuries
  - `ALLOWED_ORIGIN`: https://your-domain.com

### Common Issues

**API Function Error**: If you get `FUNCTION_INVOCATION_FAILED`:
- Ensure your API function uses `module.exports = async function handler(req, res)` format
- Check that environment variables are properly configured in Vercel

**Deployment Protection**: If API returns authentication page:
- Go to Vercel Dashboard → Project Settings → Security
- Disable "Deployment Protection" for production environment

**Environment Variables**: If API returns empty data:
- Verify `SCRAPE_URL` points to ESPN NBA injuries page
- Check that `NBA_TEAM` matches exactly with team names on ESPN

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
