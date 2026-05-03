**Prompt:**

> I have some basic knowledge about HTML, CSS and JavaScript.
> But I do not know how NodeJS works.
> Please explain to me how `frontend` is implemented in this project.

**Output:**

```text
Perfect! Now I have a complete picture. Let me explain how the frontend is implemented:

## Frontend Implementation Overview

The frontend in this ICU project is a **Node.js + Express** web application. Here's how it works:

### 1. **Backend Server (Node.js/Express)**
The server runs on `server.js` (frontend/server.js:1-40):
- **Framework**: Express.js - a lightweight Node.js web framework
- **Port**: Runs on port 3000 (or custom PORT environment variable)
- **Main job**: Serves static HTML/CSS/JS files to browsers and acts as a simple API gateway

```
Node.js runtime
    ↓
Express server (server.js)
    ├─ Serves static files (HTML, CSS, JS)
    ├─ Health check endpoint
    └─ Error handling
```

### 2. **Static Files in `public/` folder**
These are the actual web pages and styling:
- **index.html** - Homepage with navigation
- **items.html**, **purchases.html**, **reviews.html**, **providers.html** - Feature pages
- **app.js** - Shared JavaScript utilities (API calls, UI helpers)
- **style.css** - Styling for all pages

### 3. **How the Frontend Works - The Flow**

#### Step 1: Browser loads HTML
When you visit `http://localhost:3000/items.html`:
1. Express serves the HTML file from the `public/` folder
2. Browser renders the HTML structure
3. Browser loads the CSS (`style.css`) for styling
4. Browser loads JavaScript files (`app.js` and inline scripts)

#### Step 2: User Interaction
When a user clicks a button or submits a form:
```javascript
// Example from items.html (line 70)
document.getElementById('createItemForm').onsubmit = async (e) => {
    // Get form data
    const data = Object.fromEntries(new FormData(e.target));

    // Make API call
    const result = await API.fetchAPI(`${ITEMS_URL}/item`, {
        method: 'POST',
        body: JSON.stringify(data)
    });

    // Update UI based on response
    API.showMessage('Item created successfully!', 'success');
};
```

#### Step 3: Communicate with Backend Services
The frontend (browser) makes **direct HTTP calls** to other microservices:
- **Items Service** (Python/Flask) on port 5000
- **Reviews Service** (Java/Spring Boot) on port 8081
- **WireMock** (mock service) on port 8080

```
Browser
  ├→ Items Service (http://localhost:5000)
  ├→ Reviews Service (http://localhost:8081)
  └→ WireMock (http://localhost:8080)
```

### 4. **Key Technologies Used**

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Runtime** | Node.js | JavaScript execution outside the browser |
| **Web Framework** | Express | Handle HTTP requests, serve files |
| **Frontend UI** | HTML/CSS/JS | What users see and interact with |
| **HTTP Requests** | Fetch API | Browser's built-in way to call APIs |

### 5. **Important: Why Node.js on Frontend?**

You might think: "Why use Node.js if we're just serving HTML/CSS/JS?"

The answer: **Production readiness**
- Handles multiple concurrent browser requests
- Can add middleware for logging, authentication, routing
- Can proxy requests from browsers to backend services
- Can manage environment variables securely (in `server.js`, not exposed to browsers)

In development, you could open HTML files directly in a browser, but in production, you need a proper server.

### 6. **Example: Creating an Item**

```
┌─────────────┐
│   Browser   │ Step 1: User fills form & clicks "Create Item"
└──────┬──────┘
       │ Step 2: JavaScript event listener triggers
       │ (items.html:70)
       │
       ├─→ fetch('http://items-service:5000/item', {
       │      method: 'POST',
       │      body: JSON.stringify(itemData)
       │   })
       │
       │ Step 3: Items Service processes request
       │         (Python/Flask on port 5000)
       │
       ├─→ Returns JSON response
       │
       │ Step 4: JavaScript receives response
       │ Step 5: UI updates (showMessage, loadItems)
```

---

**Summary**: The frontend is a simple Node.js server that delivers HTML/CSS/JS to browsers. The actual interactivity happens in the browser using vanilla JavaScript that directly talks to the backend microservices. Node.js handles the server infrastructure, but the "work" is done by HTML, CSS, and JavaScript executing in the user's browser.
```

**Processing time:** 29s
