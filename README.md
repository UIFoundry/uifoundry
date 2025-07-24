# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Setup

### Prerequisites

- Node.js (18.x or later)
- pnpm (or npm/yarn)
- MongoDB database (either MongoDB Atlas or local Docker instance)
- Google Cloud Platform account (for OAuth authentication)

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd t3-x-payloadcms
pnpm install
```

### 2. Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

### 3. Setup Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
4. Configure OAuth consent screen:
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" user type
   - Fill in required fields (App name, User support email, Developer contact)
5. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Set application name (e.g., "T3 Payload CMS App")
   - **Add authorized redirect URIs**:
     - For development: `http://localhost:3000/api/auth/callback/google`
     - For production: `https://yourdomain.com/api/auth/callback/google`
6. **Copy your credentials**:
   - **Client ID**: Copy this value for `GOOGLE_CLIENT_ID`
   - **Client Secret**: Copy this value for `GOOGLE_CLIENT_SECRET`
   - Save these credentials securely

### 4. Setup MongoDB

#### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string from the "Connect" button

#### Option B: Local Docker Instance

```bash
docker run --name mongodb -d -p 27017:27017 mongo:latest
```

Your connection string will be: `mongodb://localhost:27017/your-database-name`

### 5. Configure Environment Variables

Update your `.env` file with the following variables:

```env
# Database
DATABASE_URI="mongodb://localhost:27017/your-database-name"
# or for Atlas: "mongodb+srv://username:password@cluster.mongodb.net/database-name"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (from Google Cloud Console - step 3.6)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Payload CMS
PAYLOAD_SECRET="your-payload-secret"
```

Generate secrets using:
```bash
openssl rand -hex 32
```

### 6. Start Development Server

```bash
pnpm dev
```

Your app will be available at `http://localhost:3000`

- Frontend: `http://localhost:3000`
- Payload Admin: `http://localhost:3000/admin`

## Shopify Integration (Optional)

To enable ecommerce functionality, you'll need to configure Shopify and obtain the required environment variables.

### 1. Create Shopify Store

If you don't have a Shopify store:
1. Go to [Shopify](https://www.shopify.com/) and create a new store
2. Complete the basic store setup

### 2. Setup Custom App for API Access

1. In your Shopify admin, go to **Settings** → **Apps and sales channels**
2. Click **"Develop apps"** → **"Create an app"**
3. Name your app (e.g., "T3 Payload CMS Integration")
4. **Configure Admin API access**:
   - Click **"Configure Admin API scopes"**
   - Enable these scopes:
     - `read_products` - Read product data
     - `read_orders` - Read order data
     - `read_customers` - Read customer data
     - `write_orders` - Create orders
     - `read_inventory` - Read inventory levels
5. **Install the app** to your store
6. **Copy Admin API credentials**:
   - **Admin API access token**: Copy for `SHOPIFY_ACCESS_TOKEN`
   - **API key**: Copy for `SHOPIFY_API_KEY`
   - **API secret**: Copy for `SHOPIFY_API_SECRET`

### 3. Setup Storefront API Access

1. In your Shopify admin, go to **Settings** → **Apps and sales channels**
2. Scroll down to **"Storefront API access"**
3. Click **"Create private app"** or **"Manage private apps"**
4. Create/edit a private app with:
   - **Private app name**: "T3 Storefront Access"
   - **Storefront API access scopes**:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_write_checkouts`
     - `unauthenticated_read_checkouts`
5. **Save** and copy the **Storefront access token** for `SHOPIFY_STOREFRONT_ACCESS_TOKEN`

### 4. Get Shop Domain

Your shop domain is your Shopify store URL:
- Format: `your-store-name.myshopify.com`
- Example: `my-awesome-store.myshopify.com`
- Copy this for `SHOPIFY_SHOP_DOMAIN`

### 5. Update Environment Variables

Add the following to your `.env` file:

```env
# Shopify Configuration
SHOPIFY_SHOP_DOMAIN="your-store-name.myshopify.com"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-storefront-access-token"
SHOPIFY_API_KEY="your-api-key"
SHOPIFY_API_SECRET="your-api-secret"
SHOPIFY_ACCESS_TOKEN="your-admin-api-access-token"
```

### What This Enables

With these credentials configured, your application can:
- Read product data from your Shopify store
- Create and manage orders
- Access customer information
- Fetch real-time data on each request
- Use Shopify's admin interface for product and inventory management

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Payload CMS](https://payloadcms.com/docs/getting-started/what-is-payload)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
