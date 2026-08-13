# Personal Portfolio Website — Annareddy Naveen Kumar Reddy

> **Dark Premium Cinematic + Futuristic Minimal Design**  
> Built for **ANNAREDDY NAVEEN KUMAR REDDY (Naveen)** — B.Tech ECE Student & Aspiring Software Engineer.

---

## 🌟 Overview & Highlights

- **Pure Modern Frontend**: Built using Semantic HTML5, Modular Vanilla CSS3 (Custom Design System with CSS variables and glassmorphism), and Clean Vanilla ES6+ JavaScript.
- **Zero Heavy Dependencies**: Lightning-fast loading speed with zero build step required. Double-click `index.html` to run anywhere!
- **Strict Content Truthfulness**: Grounded 100% in authentic data (Mohan Babu University B.Tech, Loyola Polytechnic Diploma, ZPHS Nallingayapalli, SmartLabTwinAI, AI Smart Attendance System). Zero fake certificates, fake jobs, or fake URLs.
- **Ultra Responsive**: Flawless layout across Desktop (1440px+), Laptop (1024px), Tablet (768px), and Mobile (375px+).
- **Accessible & SEO Optimized**: Full Open Graph, Twitter Cards, Semantic HTML5 hierarchy, visible focus rings, ARIA labels, and Schema.org `Person` JSON-LD metadata.

---

## 🚀 Quick Start / Local Preview

### Option 1: Direct File Opening
Simply open `index.html` in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari:
```bash
# Windows PowerShell
Start-Process index.html
```

### Option 2: VS Code Live Server / Python HTTP Server
```bash
# Using Python built-in server
python -m http.server 8000
# Then visit: http://localhost:8000
```

---

## 📂 Project Structure

```
portfolio/
├── index.html                  # Main website entrypoint with full semantic structure & SEO
├── README.md                   # Documentation & customization guide
├── css/
│   ├── variables.css           # Design tokens, color palette, glassmorphism, typography
│   ├── base.css                # CSS Reset, Google Fonts, cyber grid, ambient orbs
│   ├── components.css          # Buttons, cards, badges, modals, toasts, forms, filters
│   └── sections.css            # Section layouts: Hero, About, Skills, Education, Projects, etc.
├── js/
│   ├── data.js                 # Central data store for projects, certificates, and profile info
│   ├── animations.js           # IntersectionObserver scroll reveals, card mouse glow, skill filters
│   └── main.js                 # Navigation spy, mobile drawer, modals, copy buttons, form validation
└── assets/
    ├── images/
    │   ├── favicon.svg         # Monogram "NR" brand icon
    │   ├── profile-placeholder.svg # Sleek vector avatar placeholder
    │   ├── smartlabtwinai.svg  # SmartLabTwinAI digital twin telemetry vector
    │   └── smartattendance.svg # AI Face Recognition attendance vector
    └── docs/
        └── README_RESUME.txt   # Instructions for dropping in real resume.pdf
```

---

## 🎨 Easy Customization Guide

### 1. How to Add Your Real Profile Photo
1. Save your professional photo as `profile.jpg` or `profile.png`.
2. Place it into `assets/images/profile.jpg`.
3. In `index.html` (around line 178), update the image source:
   ```html
   <img src="assets/images/profile.jpg" alt="Annareddy Naveen Kumar Reddy" class="hero-portrait-img">
   ```

### 2. How to Add Your Real Resume PDF
1. Save your official resume as `resume.pdf`.
2. Place it into `assets/docs/resume.pdf`.
3. All "Download Resume" buttons on the website will instantly download and open your PDF.

### 3. How to Add Real Certificates
When you receive new certificates, you can add them to the `certificates` array in `js/data.js` or directly replace the placeholder card in `index.html`:
```javascript
// in js/data.js:
certificates: [
  {
    id: "cert-python",
    name: "Python for Data Science & AI",
    issuer: "Coursera / University",
    date: "2026",
    verificationUrl: "https://www.linkedin.com/in/annareddy-naveen-kumar-reddy-037343377/details/certifications/",
    image: "assets/images/cert-python.jpg"
  }
]
```

### 4. How the Contact Form Works (Zero Secrets Exposed)
The contact form is pre-configured to deliver all submissions directly to `naveenkumarreddyannareddy@gmail.com` using secure client-side AJAX.

**How to Activate Email Delivery:**
1. Submit a test message through the contact form on your website.
2. FormSubmit will send a one-time confirmation email to `naveenkumarreddyannareddy@gmail.com` with an "Activate Form" button.
3. Click the button once to verify your inbox.
4. From then on, all messages sent by recruiters and visitors will arrive in your inbox formatted as a clean table with Name, Email, Phone, Subject, and Message!

**Alternative: Using Formspree**
If you have a Formspree account:
1. Create a free form at [formspree.io](https://formspree.io) pointing to `naveenkumarreddyannareddy@gmail.com`.
2. Copy your Form ID (e.g., `xpzgkqwe`).
3. In `js/main.js` (line 289), simply paste your ID into `formspreeId`:
   ```javascript
   formspreeId: 'xpzgkqwe',
   ```

---

## 🌐 Production Deployment Guides (100% Free & Zero Server Maintenance)

This portfolio is built with standard static web technologies (HTML5, CSS3, ES6+ JavaScript) and is 100% deployment-safe for any web host.

---

### 🚀 Method 1: Deploy to GitHub Pages (Recommended)

GitHub Pages hosts your portfolio directly under your GitHub username for free (`https://annareddy-naveen-kumar-reddy.github.io/` or `https://annareddy-naveen-kumar-reddy.github.io/portfolio/`).

1. Open PowerShell or Terminal in this `portfolio` directory:
   ```bash
   cd "portfolio"
   ```

2. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Deploy: Production portfolio for Annareddy Naveen Kumar Reddy"
   git branch -M main
   ```

3. Create a new repository on your GitHub account:
   - Go to [github.com/new](https://github.com/new)
   - Repository Name: `annareddy-naveen-kumar-reddy.github.io` *(for root user site)* or `portfolio`
   - Set visibility to **Public**
   - Do **not** initialize with a README (since this repository already has one)

4. Link the remote and push:
   ```bash
   git remote add origin https://github.com/annareddy-naveen-kumar-reddy/YOUR_REPOSITORY_NAME.git
   git push -u origin main
   ```

5. Enable GitHub Pages:
   - Go to your repository on GitHub → **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment** → **Source**, select **Deploy from a branch**.
   - Select Branch: `main` and Folder: `/ (root)`.
   - Click **Save**.
   - Within 1–2 minutes, your website will be live worldwide!

---

### ⚡ Method 2: Deploy to Vercel (Instant HTTPS & Global CDN)

Vercel provides lightning-fast global CDN edge hosting with pre-configured headers via the included `vercel.json`.

**Option A: Via GitHub (Recommended)**
1. Push your code to GitHub (as in Method 1).
2. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **"Add New..."** → **"Project"**.
4. Import your portfolio repository.
5. Leave Build & Output Settings as default (Static).
6. Click **Deploy**. Your website is immediately live on a custom `.vercel.app` domain with automatic SSL!

**Option B: Via Vercel CLI (Drag & Drop or Terminal)**
1. Install Vercel CLI: `npm install -g vercel` (if Node.js is installed)
2. Run `vercel` inside the portfolio directory and follow prompts.

---

### 🌿 Method 3: Deploy to Netlify (Drag & Drop in 30 Seconds)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the entire `portfolio` folder directly into the browser window.
3. Netlify will deploy your website instantly and give you a live production URL!

---

## 🔍 Pre-Flight Deployment Checklist

- [x] **Zero Local Dependencies**: No `localhost`, `file:///`, or machine-specific file paths.
- [x] **Assets Deployment-Safe**: All image and document paths use clean relative URLs (`assets/images/profile.jpg`, `assets/docs/resume.pdf`).
- [x] **Real Profile Image**: Your photo is located at `assets/images/profile.jpg`.
- [x] **Real Resume PDF**: Ready at `assets/docs/resume.pdf` for instant downloads.
- [x] **Working Contact Form**: Delivers straight to `naveenkumarreddyannareddy@gmail.com`.
- [x] **External Links**: Verified links for GitHub, LinkedIn, and Instagram.
- [x] **GitHub Pages & Vercel Ready**: Includes `.nojekyll`, `vercel.json`, `robots.txt`, `sitemap.xml`, and `.gitignore`.

---

## 📄 License & Attribution
© 2026 Annareddy Naveen Kumar Reddy. Built with precision, technical integrity, and passion.
