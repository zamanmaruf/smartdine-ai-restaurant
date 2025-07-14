# Deployment Guide

## Netlify Deployment (Frontend Only)

Since this is a full-stack application, you have two deployment options:

### Option 1: Deploy Frontend to Netlify + Backend to Railway/Heroku

1. **Deploy Backend First**
   - Push your code to GitHub
   - Deploy the backend to Railway or Heroku
   - Get your backend URL (e.g., `https://your-app.railway.app`)

2. **Update Frontend API Calls**
   - In `public/js/main.js`, update the fetch URLs:
   ```javascript
   // Change from:
   const response = await fetch('/api/bookings', {
   
   // To:
   const response = await fetch('https://your-app.railway.app/api/bookings', {
   ```

3. **Deploy Frontend to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `views/` and `public/` folders
   - Or connect your GitHub repository
   - Set build command: `echo "No build required"`
   - Set publish directory: `views`

### Option 2: Full Stack Deployment

#### Railway Deployment (Recommended)

1. **Prepare for Railway**
   - Create a `railway.json` file:
   ```json
   {
     "build": {
       "builder": "NIXPACKS"
     }
   }
   ```

2. **Deploy to Railway**
   - Connect your GitHub repository to Railway
   - Railway will automatically detect Node.js
   - Set environment variables if needed

#### Heroku Deployment

1. **Create Procfile**
   ```
   web: node server/index.js
   ```

2. **Deploy to Heroku**
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

## Environment Variables

For production, set these environment variables:

- `PORT`: Server port (Railway/Heroku will set this automatically)
- `NODE_ENV`: Set to `production`

## CORS Configuration

If deploying frontend and backend separately, update CORS in `server/index.js`:

```javascript
app.use(cors({
  origin: ['https://your-frontend.netlify.app', 'http://localhost:3000'],
  credentials: true
}));
```

## Testing Deployment

1. **Test API Endpoints**
   ```bash
   curl -X POST https://your-backend.railway.app/api/chatbot \
     -H "Content-Type: application/json" \
     -d '{"message":"Are you open on Sundays?"}'
   ```

2. **Test Booking System**
   ```bash
   curl -X POST https://your-backend.railway.app/api/bookings \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","phone":"1234567890","guests":"2","date":"2025-08-01","time":"19:00"}'
   ```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Update CORS configuration for your domain
   - Check that frontend URLs are correct

2. **API Not Found**
   - Ensure backend is running
   - Check that API routes are correct
   - Verify environment variables

3. **Static Files Not Loading**
   - Ensure `public/` folder is in the correct location
   - Check file paths in HTML

### Debug Steps

1. Check browser console for errors
2. Verify API endpoints are accessible
3. Test with Postman or curl
4. Check server logs for errors

## Performance Optimization

1. **Enable Compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add Caching Headers**
   ```javascript
   app.use(express.static(path.join(__dirname, '../public'), {
     maxAge: '1d'
   }));
   ```

3. **Minify Assets**
   - Use a build tool to minify CSS/JS
   - Optimize images

## Security Considerations

1. **Rate Limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   app.use('/api/', rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   }));
   ```

2. **Input Validation**
   - Already implemented in controllers
   - Consider adding more validation

3. **HTTPS**
   - Enable HTTPS in production
   - Use secure cookies if needed 