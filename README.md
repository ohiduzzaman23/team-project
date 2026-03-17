# MarketPlace - Online Shopping Platform

A modern e-commerce marketplace built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🛒 Shopping cart with Context API
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔄 Dynamic product pages
- ➕➖ Quantity controls
- 💰 Real-time price calculations
- 🚀 Fast and optimized with Next.js App Router

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

### Manual Deployment Steps

```bash
# Build the project
npm run build

# Start production server
npm start
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Images:** Next.js Image Optimization

## Project Structure

```
marketplace/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── products/          # Products listing
│   ├── product/[id]/      # Product details
│   └── cart/              # Shopping cart
├── components/            # React components
├── context/               # Context providers
├── data/                  # JSON data files
└── public/                # Static assets
```

## License

MIT
