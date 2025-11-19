# 🛠️ Setup & Installation Guide

## Persyaratan Sistem

- Browser modern (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Text editor (VS Code, Sublime Text, atau IDE lainnya)
- Web server (untuk production, bisa menggunakan nginx, Apache, atau Node.js)

## Instalasi Lokal

### Option 1: Buka File Langsung
1. Extract/download semua file
2. Double-click `index.html` untuk membuka di browser default

### Option 2: Gunakan Local Server (Recommended)

#### Dengan Python (sudah terinstall di Windows)
```powershell
# Python 3
python -m http.server 8000

# Atau Python 2
python -m SimpleHTTPServer 8000
```

Buka browser ke `http://localhost:8000`

#### Dengan Node.js
```powershell
# Install http-server global
npm install -g http-server

# Run server
http-server

# Atau gunakan npx langsung
npx http-server
```

#### Dengan VS Code
1. Install extension "Live Server"
2. Right-click pada `index.html`
3. Pilih "Open with Live Server"

## Struktur Project

```
project-web-gabut2/
├── index.html              # File HTML utama
├── styles.css              # CSS dengan 3000+ lines
├── script.js               # JavaScript interaktif
├── package.json            # NPM configuration
├── manifest.json           # PWA manifest
├── sitemap.xml             # SEO sitemap
├── robots.txt              # SEO robots
├── .htaccess               # Apache configuration
├── README.md               # Main documentation
├── SETUP.md                # File ini (setup guide)
└── LICENSE                 # MIT License
```

## Konfigurasi

### 1. Mengubah Domain
Edit HTML meta tags di `index.html`:
```html
<meta property="og:url" content="https://yourdomain.com">
<link rel="canonical" href="https://yourdomain.com">
```

### 2. Mengubah Branding
Edit di `styles.css`:
```css
:root {
    --primary-color: #YOUR_COLOR;
    --secondary-color: #YOUR_COLOR;
}
```

### 3. Mengubah Konten
Semua konten bisa diubah di `index.html` - search and replace nama perusahaan, email, dll.

## Deployment

### Deploy ke Netlify
```bash
# 1. Create account di netlify.com
# 2. Drag & drop folder project
# 3. Deploy automatically
```

### Deploy ke GitHub Pages
```bash
# 1. Create repo di GitHub
# 2. Push files
# 3. Go to Settings > Pages
# 4. Select Main branch
# 5. Done!
```

### Deploy ke Vercel
```bash
npm install -g vercel
vercel
# Follow prompts dan selesai
```

### Deploy ke Web Hosting (FTP)
1. Upload semua file via FTP client (FileZilla, WinSCP, dll)
2. Set `index.html` sebagai default document
3. Ensure `.htaccess` di-upload juga

## Development

### Struktur Kode HTML
```html
<section class="section-name">
    <div class="container">
        <!-- Content -->
    </div>
</section>
```

### CSS Naming Convention
```css
.element-name { }
.element-name__child { }
.element-name--modifier { }
```

### JavaScript Modules
Semua functions sudah modular dan mudah di-extend di `script.js`

## Performance Optimization

### 1. Minify Files (Production)
```bash
# Install tools
npm install -g cssnano terser

# Minify CSS
cssnano styles.css > styles.min.css

# Minify JS
terser script.js > script.min.js
```

### 2. Image Optimization
```bash
# Gunakan online tools seperti:
# - tinypng.com
# - imageoptim.com
# - webp-converter.com
```

### 3. Lazy Loading
```html
<img src="image.jpg" loading="lazy" alt="Description">
```

## Testing

### Browser Testing
- Chrome DevTools (F12)
- Firefox DevTools (F12)
- Safari DevTools
- Edge DevTools

### Mobile Testing
- Chrome DevTools > Device Toolbar
- Firefox Responsive Design Mode
- Online tools: BrowserStack, LambdaTest

### Performance Testing
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse (built-in DevTools)

### SEO Testing
- Google Search Console
- SEMrush
- Ahrefs
- Moz

## Troubleshooting

### Issue: Dark mode tidak tersimpan
**Solution**: Clear localStorage atau check browser privacy settings
```javascript
localStorage.clear();
```

### Issue: Form tidak berfungsi
**Solution**: Check console (F12) untuk error messages
- Pastikan JavaScript enabled
- Check form field names

### Issue: Images tidak muncul
**Solution**: Check console untuk 404 errors
- Pastikan path image benar
- Use relative paths, bukan absolute

### Issue: Slow loading
**Solution**: 
- Optimize images
- Minify CSS/JS
- Enable gzip compression
- Use CDN

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Grid | ✅ | ✅ | ✅ | ✅ |
| CSS Variables | ✅ | ✅ | ✅ | ✅ |
| Intersection Observer | ✅ | ✅ | ✅ | ✅ |
| LocalStorage | ✅ | ✅ | ✅ | ✅ |
| Smooth Scroll | ✅ | ✅ | ⚠️ | ✅ |

## Tips & Tricks

### 1. Membuat Sub-domain
```
api.techflow.com -> API
blog.techflow.com -> Blog
admin.techflow.com -> Admin Panel
```

### 2. Redirect HTTP ke HTTPS
Tambah di `.htaccess`:
```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 3. Custom 404 Page
```apache
ErrorDocument 404 /404.html
```

### 4. Enable CORS (jika perlu)
```apache
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
</IfModule>
```

## Maintenance

### Regular Backups
- Backup files setiap minggu
- Backup database (jika ada)
- Use GitHub untuk version control

### Security Updates
- Update dependencies
- Monitor security advisories
- Use HTTPS
- Keep software updated

### Analytics Setup
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## Contacts & Support

- **Email**: support@techflow.com
- **Website**: https://techflow.com
- **Issues**: GitHub Issues
- **Discord**: [Join Community]

## License

MIT License - Bebas untuk digunakan komersial maupun personal

---

**Last Updated**: November 2024
**Version**: 1.0.0
