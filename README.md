# Mini Project - Product Management App

A full-stack product management web application built with React and Firebase. It features a complete authentication system, real-time data handling, and a modern, responsive UI.

## Live Demo

[liveDemo](https://miniproject-d1493.firebaseapp.com/)

---

## ✨ Features

- **Authentication:** Secure user sign-up, login, and logout powered by Firebase Authentication.
- **Product CRUD:** Authenticated users can create, read, update, and delete their own products.
- **Real-time Database:** Product lists update instantly across clients using Firestore's `onSnapshot`.
- **Automatic Image Fetching:** New products are automatically assigned a random image from the `dummyjson.com` API.
- **Search & Sort:** Easily find products by name/SKU and sort them by price.
- **Responsive Design:** A sleek and modern UI built with **shadcn/ui** and **Tailwind CSS**, ensuring a great experience on all screen sizes.
- **Form Validation:** Robust client-side form validation using `react-hook-form` and `zod`.

## 🛠️ Tech Stack

- **Frontend:** React, Vite
- **Backend & Database:** Firebase (Authentication, Firestore)
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Form Handling:** React Hook Form, Zod
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Alerts & Modals:** SweetAlert2

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Prerequisites

- Node.js (v18 or later recommended)
- A Firebase Account

### 2. Clone the Project

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name/my-product-app-vite
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Firebase

This project requires Firebase credentials to connect to the database and authentication services.

1.  Go to the Firebase Console and create a new project.
2.  Enable **Firestore Database** and **Authentication** (with the Email/Password provider).
3.  In your Project Settings, create a new Web App and copy the `firebaseConfig` object.
4.  Create a `.env.local` file in the root of the `my-product-app-vite` directory.
5.  Add your Firebase credentials to the `.env.local` file in the following format:

    ```env
    VITE_API_KEY="your-api-key"
    VITE_AUTH_DOMAIN="your-auth-domain"
    VITE_PROJECT_ID="your-project-id"
    VITE_STORAGE_BUCKET="your-storage-bucket"
    VITE_MESSAGING_SENDER_ID="your-messaging-sender-id"
    VITE_APP_ID="your-app-id"
    ```

### 5. Create Firestore Index

The project uses a compound query that requires a custom index in Firestore.

1.  Install the Firebase CLI globally: `npm install -g firebase-tools`
2.  Log in to your Firebase account: `firebase login`
3.  Deploy the predefined index from the `firestore.indexes.json` file:
    ```bash
    firebase deploy --only firestore:indexes
    ```

### 6. Run the Project

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.


