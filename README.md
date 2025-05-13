SocialAIPlatform

A web platform with a ChatGPT-like interface, social media automation, and analytics, supporting Instagram (extendable to other platforms).

Setup





Prerequisites:





Node.js (v18+), Python (3.10+), Docker



Git



Installation:

git clone <repo-url>
cd SocialAIPlatform



Backend:

cd server
npm install
pip install -r ../requirements.txt



Frontend:

cd client
npm install



Environment Variables: Create server/.env with:

MONGODB_URI=mongodb://localhost:27017/socialai
REDIS_URL=redis://localhost:6379
SESSION_SECRET=your_secret_key
INSTAGRAM_CLIENT_ID=mock_client_id
INSTAGRAM_CLIENT_SECRET=mock_client_secret
INSTAGRAM_REDIRECT_URI=http://localhost:5000/auth/instagram/callback



Run Services:

docker-compose up -d
cd server
npm start
cd ../client
npm start



Access:





Frontend: http://localhost:3000



Backend: http://localhost:5000

Features





OAuth login (mock for Instagram)



Chat interface for scheduling posts



Analytics dashboard with mock data



Automation script for Instagram posting

Notes





Replace mock OAuth with real Instagram Graph API credentials for production.



Extend to other platforms by adding API integrations.



Deploy to AWS/GCP for scalability.