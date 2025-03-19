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
git clone https://github.com/sameerbk201/win-audio-manager-server.git
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

The API will be running at **`http://localhost:3000`**.

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
GET http://localhost:3000/api/audio/list
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
GET http://localhost:3000/api/audio/default
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
POST http://localhost:3000/api/audio/set
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

After running the executable, the API will be available at **`http://localhost:3000`**.

---

## **📌 Environment Configuration**

By default, the API runs on **port 3000**.  
To change the port, create a `.env` file:

```bash
PORT=5000
```

Then start the server:

```bash
npm start
```

Now the API will be available at **`http://localhost:5000`**.

---

## **📌 Logging & Debugging**

This server uses **morgan** for logging requests.  
To see logs, start the server in **verbose mode**:

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
🔹 Uses [`win-audio-manager`](https://www.npmjs.com/package/win-audio-manager) for audio management  
🔹 Licensed under **ISC**  
