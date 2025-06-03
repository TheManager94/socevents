# 🚀 SOC Events Website - Setup Guide

## Problem: Admin Changes Don't Appear on Website

The admin panel currently stores data in localStorage (browser storage) and a JSON file, but the main website still loads hardcoded events. Here are **3 solutions** to make the admin panel actually update your live website:

---

## ✅ **Solution 1: PHP + JSON File (Easiest)**

### What You Need:
- **PHP-enabled web hosting** (most shared hosting supports this)
- **All project files** uploaded to your server

### Steps:
1. **Upload ALL files** including `api.php` to your web hosting
2. **Set file permissions** for `api.php` to 755
3. **Access admin panel** at `yoursite.com/admin.html`
4. **Login** with: admin / socevents2025
5. **Add/edit events** - changes will appear on main website immediately!

### How It Works:
- Admin panel saves events to `events-data.json` file via `api.php`
- Main website loads events from `api.php` instead of hardcoded data
- No database needed - uses JSON file for storage

---

## ✅ **Solution 2: MySQL Database (Professional)**

### What You Need:
- **MySQL database** (most hosting providers offer this)
- **PHP hosting**
- **Database access** (phpMyAdmin or similar)

### Setup Steps:

#### 1. Create Database Tables
```sql
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    venue VARCHAR(255),
    date VARCHAR(100),
    price VARCHAR(50),
    status VARCHAR(100),
    image VARCHAR(500),
    card_type ENUM('blue', 'green', 'red'),
    button_style ENUM('default', 'dark', 'light'),
    description TEXT,
    full_date VARCHAR(255),
    start_time VARCHAR(20),
    end_time VARCHAR(20),
    category VARCHAR(100),
    age_restriction VARCHAR(50),
    tickets_available INT,
    event_type ENUM('upcoming', 'past') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO events (title, subtitle, venue, date, price, status, image, card_type, button_style, description, full_date, start_time, end_time, category, age_restriction, tickets_available, event_type) VALUES
('Booster', '2025', 'S12', 'Juho 1.22', '553', 'Art', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80', 'blue', 'default', 'Ein unvergessliches Konzert-Erlebnis mit internationalen Künstlern.', '1. Juli 2022', '20:00', '02:00', 'Konzert', '18+', 1250, 'upcoming');
```

#### 2. Create Database Config
Create `config.php`:
```php
<?php
$host = 'localhost';
$dbname = 'your_database_name';
$username = 'your_db_username';
$password = 'your_db_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
```

#### 3. Create Database API
Create `api-db.php`:
```php
<?php
require_once 'config.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM events ORDER BY created_at DESC");
        $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $result = [
            'upcoming' => array_filter($events, fn($e) => $e['event_type'] === 'upcoming'),
            'past' => array_filter($events, fn($e) => $e['event_type'] === 'past')
        ];

        echo json_encode($result);
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);

        // Handle single event creation
        if (isset($input['title'])) {
            $stmt = $pdo->prepare("INSERT INTO events (title, subtitle, venue, date, price, status, image, card_type, button_style, description, full_date, start_time, end_time, category, age_restriction, tickets_available, event_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

            $stmt->execute([
                $input['title'], $input['subtitle'], $input['venue'], $input['date'],
                $input['price'], $input['status'], $input['image'], $input['cardType'],
                $input['buttonStyle'], $input['description'], $input['fullDate'],
                $input['startTime'], $input['endTime'], $input['category'],
                $input['ageRestriction'], $input['ticketsAvailable'], $input['eventType']
            ]);

            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        }
        break;
}
?>
```

### Advantages:
- **Scalable** for many events
- **Backup and restore** capabilities
- **User management** possible
- **Search and filtering** features
- **Analytics** tracking

---

## ✅ **Solution 3: Modern Backend (Advanced)**

### Option A: Node.js + Express + SQLite
Perfect for VPS or dedicated servers:

```javascript
// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());
app.use(express.static('public'));

const db = new sqlite3.Database('events.db');

// Initialize database
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT, subtitle TEXT, venue TEXT,
        date TEXT, price TEXT, status TEXT,
        image TEXT, card_type TEXT, button_style TEXT,
        description TEXT, full_date TEXT,
        start_time TEXT, end_time TEXT,
        category TEXT, age_restriction TEXT,
        tickets_available INTEGER, event_type TEXT
    )`);
});

// API endpoints
app.get('/api/events', (req, res) => {
    db.all("SELECT * FROM events", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        const upcoming = rows.filter(r => r.event_type === 'upcoming');
        const past = rows.filter(r => r.event_type === 'past');

        res.json({ upcoming, past });
    });
});

app.post('/api/events', (req, res) => {
    const event = req.body;
    db.run(`INSERT INTO events (title, subtitle, venue, date, price, status, image, card_type, button_style, description, full_date, start_time, end_time, category, age_restriction, tickets_available, event_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [event.title, event.subtitle, event.venue, event.date, event.price, event.status, event.image, event.cardType, event.buttonStyle, event.description, event.fullDate, event.startTime, event.endTime, event.category, event.ageRestriction, event.ticketsAvailable, event.eventType],
    function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### Option B: Supabase (Cloud Database)
1. **Create free Supabase account**
2. **Create events table** with SQL editor
3. **Get API URL and key**
4. **Update JavaScript** to use Supabase client

---

## 🎯 **Recommended Setup by Hosting Type**

### **Shared Hosting (Most Common)**
- ✅ **Use Solution 1** (PHP + JSON)
- Simple, works immediately
- No database management needed

### **VPS/Dedicated Server**
- ✅ **Use Solution 2** (MySQL)
- Full control and scalability
- Professional setup

### **Modern Cloud Hosting**
- ✅ **Use Solution 3** (Node.js or Supabase)
- Latest technology
- Best performance

---

## 🔧 **Quick Fix for Your Current Setup**

If you want the **fastest solution right now**:

1. **Upload `api.php`** to your web hosting
2. **Update `index.html`** to change this line:
   ```javascript
   // Change from:
   document.addEventListener('DOMContentLoaded', initializeEvents);

   // To:
   document.addEventListener('DOMContentLoaded', loadEventsFromAPI);
   ```
3. **Test admin panel** - changes should now appear on main website!

---

## 📞 **Need Help?**

**Can't set up the database?** Here are options:
1. **Use the JSON file solution** (Solution 1) - works for most cases
2. **Hire a developer** to set up MySQL properly
3. **Use a CMS** like WordPress with events plugin
4. **Contact your hosting provider** for database setup help

The admin panel is fully functional - it just needs the right backend to connect to your live website! 🚀
