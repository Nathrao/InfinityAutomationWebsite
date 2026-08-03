# Infinity Automation & Engineering — Corporate Website

Static HTML/CSS/Vanilla JS website built according to the Implementation Specification v3.2.

## Quick Start

1. Open `index.html` in a browser, or
2. Serve locally:
   ```bash
   npx serve .
   # or
   python -m http.server 8080
   ```

## Deployment

Works on:
- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel

Just connect the repository or upload the folder. No build step required.

### Form Handling

The contact form currently redirects to `thank-you.html` after client-side validation.
For production, integrate one of:
- Netlify Forms (add `netlify` attribute to the form)
- Formspree
- Getform

### Customization Checklist

- [ ] Replace logo and favicon
- [ ] Update contact details (address, phones, emails) in contact.html and footer
- [ ] Add Google Map embed on contact page
- [ ] Replace placeholder client names and testimonials
- [ ] Add real project images under `assets/images/`
- [ ] Update Privacy Policy and Terms with legal-approved content
- [ ] Configure form backend
- [ ] Update canonical URLs and domain in sitemap.xml / robots.txt
- [ ] Add Google Analytics or web-vitals monitoring if required

## Structure

```
/
├── index.html, about.html, services.html, ...
├── assets/css/main.css
├── assets/js/main.js
├── robots.txt, sitemap.xml, _headers
└── README.md
```

## Accessibility & Performance

- WCAG 2.2 AA oriented (skip link, focus states, semantic HTML, contrast)
- Mobile-first responsive design
- Core Web Vitals friendly patterns (lazy considerations, explicit dimensions where used)

## License

Proprietary — Infinity Automation & Engineering
