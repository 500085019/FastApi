# Vercel Deployment Guide

## Steps to Deploy on Vercel

### Option 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy from frontend directory:**
```bash
cd frontend
vercel
```

4. **Follow the prompts:**
   - Link to existing project or create new one
   - Set project name (e.g., `fastapi-chat-frontend`)
   - Select framework: Vite
   - Set output directory: `dist`
   - Set root directory: `./` (current)

### Option 2: Using GitHub Integration (Best for Continuous Deployment)

1. **Push your code to GitHub:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/FastApi.git
git branch -M main
git push -u origin main
```

2. **Go to [vercel.com](https://vercel.com)**

3. **Sign up/Login with GitHub**

4. **Click "New Project"**

5. **Import your repository:**
   - Select your FastApi repository
   - Select the `frontend` folder as the root directory
   - Vercel will auto-detect Vite

6. **Environment Variables (if needed):**
   - `VITE_API_URL=https://your-backend-api.com/api`

7. **Click Deploy**

### Option 3: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure project settings:
   - Framework: Vite
   - Root Directory: `frontend/`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables if needed
6. Click Deploy

## Post-Deployment Configuration

### Update API URL for Production

Create a `.env.production` file in the frontend root:

```env
VITE_API_URL=https://your-backend-api.com/api
```

If your backend is on a different domain, update CORS in your FastAPI backend:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Environment Variables in Vercel Dashboard

1. Go to your Vercel project settings
2. Click "Environment Variables"
3. Add:
   - `VITE_API_URL` = `https://your-api-url/api`

## Useful Vercel Commands

```bash
# Deploy production
vercel --prod

# Check deployment status
vercel status

# Remove deployment
vercel remove

# View project details
vercel projects
```

## Troubleshooting

**Build fails:**
- Check `npm run build` works locally
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility

**API calls fail:**
- Verify `VITE_API_URL` environment variable
- Check CORS headers in backend
- Ensure backend is running and accessible

**404 errors on refresh:**
- Vercel.json rewrites are already configured
- Routes should work correctly with SPA

## Domain Configuration

1. Go to Vercel Project Settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Monitoring

- **Vercel Analytics:** Dashboard shows performance metrics
- **Logs:** View deployment and runtime logs in dashboard
- **Performance:** Check Web Vitals and load times
