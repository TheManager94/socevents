# SOC Events Website - Complete HTML/PHP Version

A modern, fully responsive events website with all subpages that works on any web hosting service.

## 🚀 Quick Start

### Option 1: HTML Version (Recommended for Static Hosting)
1. Upload all files (index.html, tickets.html, faq.html, contact.html) to your web hosting root directory
2. Your website is ready! No server configuration needed.

### Option 2: PHP Version (For PHP-enabled Hosting)
1. Upload all files (replace index.html with index.php) to your web hosting root directory
2. Your website is ready! Works with any PHP hosting.

## 📄 Complete Website Structure

- **index.html/index.php** - Main page with events
- **tickets.html** - Ticket sales with Eventim integration
- **faq.html** - Interactive FAQ with search and categories
- **contact.html** - Complete contact information and form

## ✨ Features

### Main Page (index.html/index.php)
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **Modern Design** - Dark theme with beautiful gradients and animations
- **Event Management** - Upcoming and past events with detailed information
- **Interactive Popups** - Detailed event information in modal windows
- **Smooth Scrolling** - Hero button scrolls to events section

### Tickets Page (tickets.html)
- **Eventim Integration** - Ready placeholder for ticket shop
- **Category Grid** - Different event types with icons
- **Security Features** - SSL, mobile tickets, payment options
- **Interactive Navigation** - Smooth scrolling to sections

### FAQ Page (faq.html)
- **Innovative Accordion** - Questions expand/collapse with animations
- **Real-time Search** - Find answers instantly
- **Category Filtering** - Filter by Tickets, Events, Payment, Technical
- **Smart Interactions** - Auto-close other answers when opening new ones

### Contact Page (contact.html)
- **Working Contact Form** - Name, email, subject, message with validation
- **Complete Info** - Phone, email, address, opening hours
- **Social Media** - Links to all major platforms
- **Interactive Elements** - Current day highlighting, form validation

## 📱 Event Features

### Upcoming Events
- ✅ Buy Tickets functionality (ready for integration)
- ✅ Detailed event information
- ✅ Event images and descriptions
- ✅ Venue and timing details
- ✅ Pricing information

### Past Events
- ✅ Grayed out design to show they're finished
- ✅ "Event Finished" disabled buttons
- ✅ Historical information still accessible
- ✅ Same detailed information as upcoming events

## 🛠 Customization

### Adding New Events
Edit the JavaScript arrays in the HTML/PHP file:

```javascript
// Add to upcomingEvents array
{
    id: 4,
    title: "Your Event",
    subtitle: "2025",
    venue: "Your Venue",
    date: "Date",
    price: "Price",
    status: "Status",
    image: "https://your-image-url.jpg",
    cardType: 'blue', // 'blue', 'green', or 'red'
    buttonStyle: 'default',
    description: "Event description...",
    fullDate: "Full date",
    startTime: "Start time",
    endTime: "End time",
    category: "Category",
    ageRestriction: "Age restriction",
    ticketsAvailable: 100
}
```

### Changing Colors
The website uses CSS custom properties. Main colors:
- Background: `#0a0a0a`
- Primary Green: `#a3e635`
- Card Blue: `#3b82f6` to `#1d4ed8`
- Card Green: `#10b981` to `#059669`
- Card Red: `#ef4444` to `#dc2626`

### Adding Ticket Integration
Replace the `buyTickets()` function with your ticket system:

```javascript
function buyTickets(title, subtitle) {
    // Replace with your ticket system
    window.location.href = `https://your-ticket-system.com/event/${title}`;
}
```

## 🔧 Technical Requirements

### Minimum Requirements
- **Any web hosting** (shared hosting, VPS, dedicated server)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **No special server requirements** for HTML version

### PHP Version Requirements
- **PHP 5.4+** (works with all modern PHP versions)
- **Any PHP-enabled web hosting**

## 📂 File Structure

```
html-version/
├── index.html          # Pure HTML version
├── index.php           # PHP version
└── README.md           # This file
```

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Features

- Touch-friendly buttons and navigation
- Responsive image loading
- Optimized modal dialogs for mobile
- Swipe gestures supported
- Mobile-optimized typography

## 🔒 Security Features

- No external dependencies (works offline)
- No database connections required
- XSS protection through proper escaping
- HTTPS ready

## ⚡ Performance Features

- Lazy loading images
- Optimized CSS (embedded for faster loading)
- Minimal JavaScript (no external libraries)
- Fast loading times
- Mobile-optimized assets

## 🚀 Deployment Instructions

### cPanel/Shared Hosting
1. Log into your cPanel
2. Open File Manager
3. Navigate to `public_html` or `www` folder
4. Upload `index.html` or `index.php`
5. Visit your domain - website is live!

### FTP Upload
1. Connect to your server via FTP
2. Navigate to your web root directory
3. Upload `index.html` or `index.php`
4. Set file permissions to 644
5. Visit your domain

### Direct Upload
1. Use your hosting provider's file upload interface
2. Upload to the root web directory
3. Rename to `index.html` or `index.php` if needed

## 🎨 Design Features

- **Hero Section** with concert background image
- **Gradient Cards** for different event types
- **Smooth Animations** on hover and interactions
- **Professional Typography** using system fonts
- **Dark Theme** optimized for events/entertainment
- **Lime Green Accents** for call-to-action buttons

## 🆘 Support

If you need help customizing or deploying this website:

1. Check that your file is named `index.html` or `index.php`
2. Ensure it's in your web root directory (`public_html`, `www`, etc.)
3. Check browser console for any JavaScript errors
4. Verify images are loading (check image URLs)

## 📄 License

This website template is ready for commercial use. Customize as needed for your events.

---

**Ready to go live!** Just upload and your SOC Events website is ready! 🎉
