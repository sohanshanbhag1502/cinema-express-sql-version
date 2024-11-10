# Cinema Express: A Movie Ticket Booking and Management Website

## Tools and Frameworks Used:
- [Next.js](https://nextjs.org/): Full stack framework
- [Neon DB](https://neon.tech/): SQL Database Cluster Provider
- [Prisma](https://prisma.io): ORM For SQL Database Schema Migration and Interaction
- [Cloudinary](https://cloudinary.com/): Cloud Storage Provider for Providing Images
- [Vercel](https://vercel.com/): Website Hosting Platform
- [Google Analytics](https://analytics.google.com/): To measure the number of users visiting the website

## Getting Started
- Create a free account in Neon DB and copy the Database cluster url (pooled connection url).
- Create a free account in Cloudinary and create two upload presets (poster and cast photo)
- Create a account in Google Analytics to measure the users visiting the website.
- Create a .env file and add the following parameters:
```
DATABASE_URL: Neon DB pooled cluster url
JWT_SECRET: JWT secret key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: Cloudinary Cloud Name
NEXT_PUBLIC_CLOUDINARY_API_KEY: Cloudinary Cloud API Key
CLOUDINARY_API_SECRET: Cloudinary Cloud API Secret
CLOUDINARY_POSTER_PRESET: Cloudinary Cloud Poster Preset Name
CLOUDINARY_PHOTO_PRESET: Cloudinary Cloud Photo Preset Name
GAID: Google Analytics Measurement ID
```

Install the required npm modules
```
npm install
```

Migrate Database to schema (Only for first time)
```
npx prisma migrate dev
```

Generate prisma client
```
npx prisma generate
```

Start the development server:
```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To build into production
```
npm run build
npm start
```

To Deploy to production in vercel refer [Next.js deployment documentation](https://nextjs.org/docs/deployment)

## Contributors:
Sohan Shanbhag: [Github Link](https://github.com/sohanshanbhag1502)
Shrujan V: [Github Link](https://github.com/Shrujan-V)