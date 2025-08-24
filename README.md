
# 🎵 Spotify Favs

Spotify Favs is an Angular application that integrates with the **Spotify Web API** to let users explore their favorite tracks, playlists, and top artists.
It demonstrates how to authenticate with Spotify using **OAuth 2.0 Authorization Code Flow** and consume Spotify’s REST API in a modern frontend.

---
![Login Page](assets/demo-spotify-favs.gif)

---
## 📌 Features

* 🔐 Spotify authentication (OAuth2 with PKCE flow)
* 🎶 Access to user profile & email
* 🎧 Fetch user’s top tracks and artists
* 📂 Read and manage playlists (private and public)
* ⚡ Built with Angular

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/spotify-favs.git
cd spotify-favs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Update `src/environments/environment.ts` with your own Spotify credentials:

```ts
export const environment = {
  production: false,
  spotifyClientId: 'YOUR_CLIENT_ID',
  spotifyClientSecret: 'YOUR_CLIENT_SECRET', // ⚠️ not recommended in frontend
  spotifyReadScope: 'user-read-private user-read-email user-top-read playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative',
  spotifyRedirectURI: 'http://localhost:4200/callback',
};
```

👉 **Where to get these values**:

* **Client ID / Client Secret / Redirect URI** → from [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
* **Scopes** → from [Authorization Scopes Documentation](https://developer.spotify.com/documentation/web-api/concepts/scopes)

⚠️ **Important**: For production, never expose your **Client Secret** in Angular. Instead, use a backend service to handle token exchange securely.

---

### 4. Run the App

```bash
npm start
```

The app will run at:

```
http://localhost:4200
```

---

## 🛠️ Project Structure

* `src/app/` → Angular components, services, and modules
* `src/environments/` → Environment configuration (Spotify credentials, API config)
* `auth.service.ts` → Handles authentication with Spotify API
* `spotify.service.ts` → Interacts with Spotify endpoints

---

## 📖 Concept: Spotify API & OAuth2

The **Spotify Web API** uses **OAuth 2.0** for authentication.

Flow:

1. User logs in via Spotify and grants permissions (scopes).
2. Spotify redirects back with an **authorization code**.
3. Code is exchanged for an **access token** (usually via backend).
4. Access token is used to call Spotify endpoints (e.g., get top artists, playlists).

### 🔄 OAuth Flowchart

![OAuth Flowchart](./docs/oauth-flowchart.png)


---

## 📬 Contact

👤 **Wellington Macena**
📧 [wellington.macena.23@gmail.com](mailto:wellington.macena.23@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/wellington-macena-dev/)

---

## 🔗 References

* 📺 [YouTube – How OAuth2 Works](https://www.youtube.com/watch?v=RjO2AH8JmV8)
* 📝 [Spotify Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization/)
* 📝 [Spotify Web API Reference](https://developer.spotify.com/documentation/web-api)

---

👉 Do you want me to **generate the flowchart image (`docs/oauth-flowchart.png`)** for you right now (like I did with the Outbox diagram), so you just need to drop it in your repo?
