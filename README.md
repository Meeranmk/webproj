# 🚀 Dynamic Product Catalog (React + Vite)

A highly responsive, single-page product catalog application structured inside a portable React component. This project demonstrates modern UI design principles alongside efficient React practices.

## 🛠️ Technical Architecture

This application simulates a modular architecture despite being predominantly a single-file application (`App.jsx`), prioritizing "drop-in" portability and zero external styling dependencies (no Tailwind, Bootstrap, etc.). 

### 1. State Management & Navigation
Routing between the "Catalog Home" and "Detail View" is handled purely via React state without needing an external router like `react-router-dom`:
- `view` state (\`'home'\` or \`'detail'\`) toggles the primary rendered component tree.
- `selectedIndex` tracks which item from the data array is currently active.

### 2. Performance Optimizations
- **Data Grouping via `useMemo`**: The raw \`CATALOG_DATA\` array is passed through a \`groupItemsByCategory\` utility function. This computation is wrapped in a \`useMemo\` hook with an empty dependency array \`[]\` so the grouping logic only executes **once** during the initial mount, preventing expensive array traversals on subsequent renders.
- **Lazy Image Loading**: Catalog cards use \`loading="lazy"\` natively in the browser to prevent fetching off-screen images, dramatically improving initial page load time and saving bandwidth. 
- **Image Fallbacks**: Robust \`onError\` synthetic event handlers fall back to an SVG placeholder if a remote image URL returns a 404 or fails to load.

### 3. Styling & "Portable" CSS Injection
To ensure maximum portability (the ability to copy-paste \`App.jsx\` into any React environment without needing to drag along an \`index.css\` or CSS Modules file), the styles are localized:
- The \`GLOBAL_CSS\` string holds the entire CSS logic.
- A \`useEffect\` hook fires on mount to dynamically create a \`<style>\` DOM element, populating it with the CSS string, and appending it to the document \`<head>\`. When the component unmounts, the cleanup function cleanly removes the injected styles.
- **CSS Grid & Flexbox**: Layouts heavily rely on modern CSS methodologies. The catalog grid utilizes \`grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))\` to provide a truly responsive layout that wraps implicitly without explicit media query breakpoints.

## 💻 Running Locally

1. Clone the repository
2. Install the dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the Vite development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:5173](http://localhost:5173) in your browser.
