# **🎵 Win-Audio-Manager Backend**  

_A lightweight, easy-to-use backend for managing Windows audio devices via API._

---

## **📌 Overview**  

The **Win-Audio-Manager Backend** is an Express-based API that allows users to:  
✅ **List all available audio devices**  
✅ **Get the current default playback device**  
✅ **Set a new default playback device**  

It can be used **locally as a Node.js server** or **built as an executable** for Windows, Linux, and macOS.

---

## **📌 Installation & Setup**  

### **1️⃣ Clone the Repository**  

```bash
git clone https://github.com/truehear/win-audio-manager-server.git
cd win-audio-manager-server
```

### **2️⃣ Install Dependencies**  

```bash
npm install
```

### **3️⃣ Start the Server Locally**  

```bash
npm start
```

When starting the app, you will be prompted:

```text
Do you want to manually configure IP and Port? (y/N):
```

- If you choose `Y`, you'll be able to manually enter IP and Port.
- If the values are **invalid or empty**, defaults will be used.
- If you choose `N` or press enter, it will load defaults from `src/app-config.json`.

The API will be running at the configured address, e.g., **`http://127.0.0.1:8009`**.

---

## **📌 Configuration**

All configurable values like IP and PORT can be edited in:

```bash
/src/app-config.json
```

Example:

```json
{
  "IP": "127.0.0.1",
  "PORT": 8009
}
```

There’s **no need for a `.env` file** — all configuration is handled through this JSON file when running as a standalone executable.

---

## **📌 API Endpoints**

| **Method** | **Endpoint** | **Description** |
|-----------|------------|----------------|
| `GET` | `/api/audio/v1/list` | List all available audio devices |
| `GET` | `/api/audio/v1/default` | Get the default playback device |
| `POST` | `/api/audio/v1/set` | Set a new default playback device |

---

## **📌 Example API Calls**

### **🔹 List All Audio Devices**

```http
GET http://127.0.0.1:8009/api/audio/list
```

#### ✅ **Response**

```json
{
  "status": true,
  "message": "Audio devices retrieved successfully",
  "data": [
    { "Name": "Speakers", "Index": 0 },
    { "Name": "Headphones", "Index": 1 },
    { "Name": "Monitor Speakers", "Index": 2 }
  ]
}
```

### **🔹 Get Default Playback Device**

```http
GET http://127.0.0.1:8009/api/audio/default
```

#### ✅ **Response**

```json
{
  "status": true,
  "message": "Default playback device retrieved",
  "data": { "Name": "Headphones", "Index": 1 }
}
```

### **🔹 Set a New Default Playback Device**

```http
POST http://127.0.0.1:8009/api/audio/set
Content-Type: application/json

{
  "deviceIndex": 1
}
```

#### ✅ **Response**

```json
{
  "status": true,
  "message": "Default playback device set successfully",
  "data": { "Index": 1 }
}
```

---

## **📌 Running as an Executable**

### **1️⃣ Build the Executable**

To create a **standalone executable** for Windows, Linux, and macOS:

```bash
npm run build
```

This generates the binaries inside the **`dist/`** folder.

### **2️⃣ Run the Executable**

#### **🔹 On Windows**

```bash
dist/win-audio-manager-server-win-x64.exe
```

#### **🔹 On Linux**

```bash
./dist/win-audio-manager-server-linux-x64
```

#### **🔹 On macOS**

```bash
./dist/win-audio-manager-server-macos-x64
```

Upon launch, you'll be prompted to manually configure IP and Port or use defaults.

---

## **📌 Error Handling**

If an error occurs during launch or runtime, the application will display an error message and wait for you to **press Enter before exiting**. This is helpful when running it as an executable so the window doesn't close abruptly.

---

## **📌 Logging & Debugging**

This server uses **morgan** for logging HTTP requests.  
To enable verbose logging, start the server with debugging:

```bash
DEBUG=express:* npm start
```

---

## **📌 Uninstalling**

To remove the server from your system:

```bash
rm -rf win-audio-manager-server
```

If installed globally:

```bash
npm uninstall -g win-audio-manager-server
```

---

## **📌 Credits & License**

🔹 Built by **Sameer Karn** (@sameerbk201)  
