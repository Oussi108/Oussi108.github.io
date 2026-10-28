# El-Houcine Oussi — Professional Portfolio & Academic Profile

> Modern, interactive, dual-perspective portfolio website engineered for **software engineering career applications** and **continuing graduate studies (Master's / PhD)**. Ready for instant deployment on **Firebase Hosting**.

---

## 🌟 Highlights & Key Features

- **Dual-Perspective Lens Switcher**:
  - 💼 **Industry & Work Focus**: Highlights production-grade applications (Google Play Store & Firebase deployments), Clean Architecture (.NET Core & Flutter/Riverpod), enterprise smart city experience, and technical skill matrix.
  - 🎓 **Academic & Research Focus**: Showcases Information Systems Engineering degree from SUPMTI, distributed systems foundations, custom expression compiler AST evaluation, applied ML solar forecasting datasets, and graduate study research aspirations.
  - 🌟 **All-Round View**: Complete unified presentation.
- **Project Deep-Dive Modals**: Click "Architecture" on any project card to view system design notes, technical tradeoffs, architecture layers, and direct links without leaving the page.
- **Full Asset Preservation**: Includes high-resolution profile portraits, actual application screenshots, and authentic PDF documents (**English CV**, **French CV**, and **EcoBeach System Design Report**).
- **Direct Communication & 1-Click Clipboard**: Instant mailto pre-formatted inquiry form, plus one-click copy buttons for email (`oussi.elhoucine0@gmail.com`) and phone (`+212 642587839`) with toast confirmations.
- **Theme Switcher**: Smooth Dark & Light mode toggle with automatic persistence in `localStorage`.
- **Zero-Dependency Static Build**: Pure semantic HTML5, modern CSS3 with glassmorphism & gradients, and vanilla ES6 JavaScript. No npm build steps or compilation required.

---

## 📂 Project Structure

```
MYProtofolio/
├── firebase.json            # Firebase Hosting configuration
├── .firebaserc              # Firebase default project alias
├── public/                  # Deployment directory for Firebase Hosting
│   ├── index.html           # Main website document
│   └── assets/
│       ├── css/styles.css   # Modern design system & responsive styling
│       ├── js/main.js       # Interactive features, modals, filters & theme
│       ├── imgs/            # Authentic project screenshots & portrait
│       └── docs/            # English CV, French CV & Architecture PDF
├── index.html               # Root mirror for instant double-click preview
└── assets/                  # Root mirror of all assets
```

---

## 🚀 How to Deploy to Firebase Hosting

You can host this website on Firebase Hosting with free SSL, custom domains, and global CDN delivery:

### Step 1: Install Firebase Tools (if not already installed)
Install Node.js from [nodejs.org](https://nodejs.org/), then open your terminal (PowerShell or Command Prompt) and run:
```bash
npm install -g firebase-tools
```

### Step 2: Login to your Google / Firebase Account
```bash
firebase login
```
*(If working inside a restricted terminal, you can run `firebase login --no-localhost`)*

### Step 3: Link or Create your Firebase Project
To link your project or set your new Firebase project ID:
```bash
firebase use --add
```
Select your Firebase project from the list (or create one for free at [console.firebase.google.com](https://console.firebase.google.com)).

### Step 4: Deploy
Simply run:
```bash
firebase deploy --only hosting
```
Firebase will immediately deploy the `public` directory and give you a live URL such as `https://<your-project-id>.web.app`.

---

## 💻 How to Preview Locally

You can preview the website locally in any of the following ways:

1. **Direct Double-Click**: Double-click either `index.html` or `public/index.html` in Windows File Explorer to open it in your browser.
2. **Python Built-in Server**:
   ```bash
   python -m http.server 8080 --directory public
   ```
   Then open `http://localhost:8080` in your browser.
3. **Firebase Local Emulator**:
   ```bash
   firebase emulators:start --only hosting
   ```

---

## 📄 Included Verified Documents
- `assets/docs/CV_English.pdf`: English Curriculum Vitae
- `assets/docs/CV_French.pdf`: French Curriculum Vitae
- `assets/docs/ecobeach.pdf`: EcoBeach Environmental IoT Architecture Report
