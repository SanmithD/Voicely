# Voicely

Voicely is a full-stack MERN application built with the purpose of allowing users to **share ideas, memories, opinions, and even trauma anonymously**—by **automatically hiding personal information**. It’s a safe space where thoughts can be shared without judgment, in a supportive and interactive community environment.

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite, DaisyUI, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT
- **Other Tools:** Vercel (frontend deployment), dotenv

---

## 📂 Project Structure

### Frontend (`/frontend`)
- `public/` – Static assets
- `src/`
  - `assets/` – Media assets
  - `components/` – Reusable UI components
  - `lib/` – Utility functions
  - `pages/` – Page-level components (like Home, Profile, etc.)
  - `store/` – Global state management
  - `App.jsx`, `main.jsx`, `index.css` – Entry and root setup

### Backend (`/server`)
- `src/`
  - `config/` – Environment and DB configs
  - `controllers/` – Request logic
  - `lib/` – Helpers and utilities
  - `middlewares/` – Request interceptors (auth, error handling)
  - `models/` – Mongoose schemas
  - `routes/` – API route definitions
  - `service/` – Business logic
  - `index.js` – Main entry point

---

## ✨ Features

- 🔐 **User Authentication** – Create account, login/logout securely
- 🧵 **Post Threads** – Share public or community-based posts
- 🏘️ **Create & Join Communities** – Participate in themed communities
- 📸 **Media Threads** – Attach media while posting
- 🧭 **View Community Threads** – See all posts in a joined community
- 📌 **Bookmark Threads** – Save posts for later
- 👤 **Profile Page** – View and manage your threads
- ❤️ **Like, Comment, Share** – Engage with content
- 🕶️ **Anonymous Posting** – Automatically removes or hides identifiable information

---

## 🖼️ Demo Screenshots

> ![Homepage](https://github.com/user-attachments/assets/89e9300c-7fc9-46e2-b8ad-954f202d2122)
> ![Profile page](https://github.com/user-attachments/assets/6b298e2a-3899-4cd6-a58d-f655757c8aae)
> ![Community ](https://github.com/user-attachments/assets/9f888376-2c9d-4183-ad82-c30174f31086)
> ![Post page](https://github.com/user-attachments/assets/db08fd11-e9ad-4338-aeac-0695f721b940)
---

## ⚙️ Setup Instructions

### 📦 Clone the Repository

``` bash
git clone https://github.com/SanmithD/Voicely.git
cd voicely

cd frontend
npm install
npm run dev

cd server
npm install
npm start

```

### Contributions

Feel free to open issues or pull requests to contribute ideas, fixes, or improvements.

### 👨‍💻 Created by
Sanimth Devadiga

Built with ❤️ to give everyone a voice — anonymously.

### License

Let me know if you'd like me to generate demo screenshots or help with deployment documentation!
