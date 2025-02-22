# Deployment Guide

## Overview
This guide covers deploying the Real Estate Platform to production environments.

---

## Pre-Deployment Checklist

- [ ] All tests passing (`npm test`)
- [ ] Code quality checked (`npm run lint`)
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificate obtained
- [ ] Rate limiting configured
- [ ] Logging setup verified
- [ ] Backup strategy in place

---

## Deployment Options

## Option 1: Docker (Recommended)

### Prerequisites
- Docker installed
- Docker Hub account (for image registry)

### Steps

1. **Build Docker image**
```bash
docker build -t yourusername/realestate:latest .
```

2. **Test locally**
```bash
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/realestate \
  -e JWT_SECRET=your-secret \
  yourusername/realestate:latest
```

3. **Push to Docker Hub**
```bash
docker login
docker push yourusername/realestate:latest
```

4. **Deploy on server**
```bash
docker run -d \
  --name realestate \
  -p 3000:80 \
  -e MONGODB_URI=$MONGO_URI \
  -e JWT_SECRET=$JWT_SECRET \
  yourusername/realestate:latest
```

### Using Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    image: yourusername/realestate:latest
    ports:
      - "3000:3000"
    environment:
      MONGODB_URI: mongodb://mongo:27017/realestate
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - mongo
    restart: always

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    restart: always

volumes:
  mongo_data:
```

Deploy:
```bash
docker-compose up -d
```

---

## Option 2: Heroku

### Prerequisites
- Heroku account
- Heroku CLI installed

### Steps

1. **Create app**
```bash
heroku create your-app-name
```

2. **Configure environment variables**
```bash
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/realestate
heroku config:set JWT_SECRET=your-secret-key
```

3. **Deploy**
```bash
git push heroku main
```

4. **View logs**
```bash
heroku logs --tail
```

---

## Option 3: AWS EC2

### Prerequisites
- AWS account
- EC2 instance running (Ubuntu 20.04+)
- SSH access to instance

### Steps

1. **Connect to instance**
```bash
ssh -i your-key.pem ec2-user@your-instance-ip
```

2. **Install dependencies**
```bash
sudo yum update -y
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs
```

3. **Install MongoDB**
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

4. **Clone repository**
```bash
git clone https://github.com/yourrepo/realestate.git
cd realestate
npm install
```

5. **Setup environment**
```bash
echo "MONGODB_URI=mongodb://localhost:27017/realestate" > .env.local
echo "JWT_SECRET=your-secret" >> .env.local
```

6. **Build and start**
```bash
npm run build
npm start
```

7. **Setup PM2 for process management**
```bash
npm install -g pm2
pm2 start npm -- start --name "realestate"
pm2 startup
pm2 save
```

8. **Setup Nginx reverse proxy**
```bash
sudo apt-get install -y nginx

# Create config: /etc/nginx/sites-available/realestate
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable config
sudo ln -s /etc/nginx/sites-available/realestate /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

9. **Setup SSL with Let's Encrypt**
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Option 4: DigitalOcean App Platform

### Prerequisites
- DigitalOcean account
- GitHub repository

### Steps

1. **Connect to App Platform**
   - Go to DigitalOcean App Platform
   - Connect GitHub repository
   - Select realestate repository

2. **Configure build**
   - Build command: `npm install && npm run build`
   - Run command: `npm start`

3. **Set environment variables**
   - `MONGODB_URI=your-mongo-uri`
   - `JWT_SECRET=your-secret`

4. **Deploy**
   - Click "Deploy" button
   - Watch deployment logs

---

## Option 5: Vercel (Frontend Only)

### Prerequisites
- Vercel account
- GitHub repository

### Steps

1. **Import project**
   - Go to vercel.com
   - Click "Import Project"
   - Select your GitHub repository

2. **Configure environment**
   - Set `NEXT_PUBLIC_API_URL` to your API endpoint

3. **Deploy**
   - Click "Deploy"
   - Vercel will auto-build and deploy

---

## Database Setup

### MongoDB Atlas (Cloud)

1. **Create cluster**
   - Go to mongodb.com/cloud
   - Create free account
   - Create M0 cluster

2. **Get connection string**
   - Copy connection string
   - Add to `.env.local`

3. **Create database user**
```bash
Username: admin
Password: [generate strong password]
```

### Self-Hosted MongoDB

1. **Install MongoDB**
```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

2. **Start MongoDB**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

3. **Verify**
```bash
mongosh  # Open MongoDB shell
```

---

## Post-Deployment

### Health Checks
```bash
# Check application
curl http://your-domain.com

# Check API
curl http://your-domain.com/api/stats

# Check logs
pm2 logs realestate
```

### Monitoring

1. **Setup logging**
   - Use CloudWatch (AWS)
   - Or ELK Stack for self-hosted

2. **Monitor metrics**
   - CPU usage
   - Memory usage
   - Disk space
   - Database connections

3. **Setup alerts**
   - High error rate
   - High response time
   - Low disk space

### Backup Strategy

1. **Database backups**
```bash
# MongoDB Atlas - automatic daily backups

# Self-hosted
mongobackup --uri mongodb://localhost:27017 --out ./backups
```

2. **File backups**
   - Backup `public/uploads` if using file storage
   - Store in S3 or similar

3. **Backup frequency**
   - Daily for production
   - Weekly for development

---

## Scaling

### Horizontal Scaling (Multiple Instances)

1. **Load Balancer Setup**
   - AWS ELB / ALB
   - DigitalOcean Load Balancer
   - Nginx

2. **Database Connection Pool**
   - Increase pool size in mongoose config
   - Use MongoDB connection pooling

3. **Session Management**
   - Use Redis for session store
   - Or rely on JWT (stateless)

### Vertical Scaling (Increase Resources)

1. **Increase server resources**
   - More CPU
   - More RAM
   - Better network

2. **Optimize code**
   - Database query optimization
   - Caching strategies
   - Code splitting

---

## Security Checklist

- [ ] HTTPS/SSL enabled
- [ ] Environment variables not committed
- [ ] Rate limiting configured
- [ ] Input validation implemented
- [ ] SQL injection protection (using Mongoose)
- [ ] XSS protection
- [ ] CSRF tokens if applicable
- [ ] Secure headers configured
- [ ] Database backups automated
- [ ] Log rotation configured
- [ ] Firewalls properly configured
- [ ] Regular security updates

---

## Troubleshooting Deployment

### Application won't start
```bash
# Check logs
pm2 logs realestate

# Check if port is in use
lsof -i :3000

# Check environment variables
env | grep MONGODB
```

### Database connection error
```bash
# Test MongoDB connection
mongosh "mongodb+srv://..."

# Check connection string format
# mongodb://user:pass@host:port/database
```

### High memory usage
```bash
# Check Node process
node --max-old-space-size=4096 server.js

# Analyze memory leaks
npm install --save-dev clinic
clinic doctor -- npm start
```

### Slow API responses
```bash
# Enable query logging
# In MongoDB, check indexes
db.collection.getIndexes()

# Create missing indexes
db.collection.createIndex({ field: 1 })
```

---

## Continuous Deployment (CI/CD)

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Push to Docker Hub
        uses: docker/build-push-action@v2
        with:
          push: true
          tags: yourusername/realestate:latest
      
      - name: Deploy
        run: |
          # Deploy commands
```

---

## Rollback Procedure

If deployment fails:

1. **Check logs for errors**
```bash
pm2 logs realestate
```

2. **Rollback code**
```bash
git revert [commit-hash]
git push
```

3. **Restart application**
```bash
pm2 restart realestate
```

4. **Verify functionality**
   - Check homepage loads
   - Test API endpoints
   - Verify database connection
