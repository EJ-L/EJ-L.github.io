# Personal Website

This is my personal academic website. Below are instructions for common updates and maintenance.

## File Structure

```
├── components/          # HTML components for each section
├── css/                # CSS styles
├── js/                # JavaScript files
└── index.html         # Main HTML file
```

## How to Update Content

### 1. Recent News
- Edit `js/news.js`
- Add new entries to the `newsData` array
- Format:
```javascript
{
    date: 'YYYY-MM-DD',
    content: 'Your news content with <a href="URL" target="_blank">links</a>'
}
```
- News items are automatically sorted by date
- Items within 3 months are considered "recent"

### 2. Module Order and Visibility
- Edit `js/scripts.js`
- Current order:
```javascript
const components = [
    'profile',  // Profile should always be first
    'news',
    'education',
    'experience',
    'awards'
    // Add more by uncommenting
    // 'publications',
    // 'projects',
    // 'services',
    // 'talks'
];
```
- Note: The profile component is always loaded first and not shown in navigation
- To show/hide modules:
  1. Uncomment/comment the component in `js/scripts.js`
  2. Uncomment/comment the corresponding link in `components/navigation.html`

### 3. Navigation Links
- Edit `components/navigation.html`
- Make sure navigation links match visible modules (except profile)
- Format: `<a href="#section-id">Section Name</a>`

### 4. Styling
- Main styles: `css/styles.css`
- Section-specific styles:
  - Profile: `css/profile.css`
  - News: `css/news.css`
  - Experience: `css/experience.css`
  etc.

## Common Tasks

### Adding a New Section
1. Create new HTML file in `components/`
2. Add corresponding CSS in `css/`
3. Add to component list in `js/scripts.js`
4. Add navigation link in `components/navigation.html` (if it should be in navigation)

### Updating Links
Common institutional links:
- CUHK: `https://www.cuhk.edu.hk/english/index.html`
- CSE: `https://www.cse.cuhk.edu.hk/`
- United College: `https://www.uc.cuhk.edu.hk/`

### Theme Colors
The website uses CSS variables for theming:
```css
:root {
    --bg-primary: #ffffff;
    --text-primary: #333333;
    --link-color: #0066cc;
    /* etc. */
}
```

## Testing Guide

### Local Development
1. Start a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   # Or using Node.js
   npx http-server
   ```
2. Open `http://localhost:8000` in your browser

### Cross-browser Testing
Test the website in different browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

### Responsive Design Testing
Test the layout at different screen sizes:
1. Desktop (1920px and above)
2. Laptop (1366px)
3. Tablet (768px)
4. Mobile (375px)

Use Chrome DevTools (F12):
- Toggle device toolbar (Ctrl+Shift+M)
- Test different device presets
- Test both portrait and landscape orientations

### Functionality Checklist
- [ ] Navigation links work correctly
- [ ] Theme toggle (light/dark mode) functions properly
- [ ] News items display correctly with proper dates
- [ ] All external links open in new tabs
- [ ] Images load properly
- [ ] Scrolling behavior is smooth
- [ ] No horizontal scrollbars appear
- [ ] All animations work smoothly

### Performance Testing
1. Lighthouse Audit (in Chrome DevTools):
   - Performance
   - Accessibility
   - Best Practices
   - SEO

2. Check page load time:
   - Network tab in DevTools
   - Simulate different network conditions

### Accessibility Testing
1. Keyboard navigation:
   - Tab through all interactive elements
   - Ensure focus states are visible
2. Screen reader compatibility:
   - Use VoiceOver (Mac) or NVDA (Windows)
   - Check heading structure
3. Color contrast:
   - Use DevTools color contrast checker
   - Test in both light and dark modes

### Common Issues to Check
1. Dark/Light Mode:
   - All text is readable in both modes
   - No unintended color inversions
   - Smooth transition between modes

2. Links and Buttons:
   - Hover states work
   - Click areas are large enough
   - No broken links

3. Content:
   - No spelling errors
   - Consistent formatting
   - Proper spacing and alignment

4. Mobile:
   - No touch target too small
   - No overlapping elements
   - Proper text wrapping

## Notes
- All external links should have `target="_blank"`
- Keep news items in reverse chronological order
- Use semantic HTML for better accessibility
- Test in both light and dark modes after updates
- Profile section is always loaded first and not shown in navigation 