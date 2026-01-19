# Dashboard Application

A modern, responsive admin dashboard with product management features built with React, Vite, and Tailwind CSS.

## ✨ Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Git Workflow](#git-workflow)
- [Responsive Design](#responsive-design)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Features

### ✅ Product Management
- **Add Product Form** — Create new products with multiple attributes
- **Product Name & Price** — Input fields with validation
- **Multiple Colors** — Add/remove unlimited color options
- **Predefined Sizes** — Dropdown with XS, S, M, L, XL, XXL, XXXL
- **Image Upload** — Upload and preview product images
- **Confirmation Modal** — Review product details before saving

### ✅ Tab Navigation
- **Tab Toggle** — Click tabs to show/hide content
- **Click to Hide** — Click again to toggle content off
- **Smooth Transitions** — Professional animations

### ✅ Responsive Design
- **Mobile-First** — Optimized for all screen sizes
- **Grid System** — 1 column on mobile, 2 columns on tablets+
- **Touch-Friendly** — Easy to use on any device
- **Professional UI** — Modern gradient backgrounds and shadows

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework with hooks |
| **Vite** | Fast build tool & dev server |
| **Tailwind CSS** | Utility-first CSS styling |
| **Material-UI** | Pre-built components (Button, Table, etc.) |
| **Redux** | State management (optional) |
| **JavaScript ES6+** | Modern JavaScript |

---

## 📦 Installation

### Prerequisites
- **Node.js** 16.0.0 or higher
- **npm** 7.0.0 or higher (or yarn)

### Setup Steps

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/dashboard.git
cd dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:5173
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build locally
npm run preview

# Start production server
npm run start
```

---

## 🚀 Usage

### Running the Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173` with hot module replacement (HMR).

### Project Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm start        # Start production server
npm run lint     # Run ESLint
```

### Using Components

```javascript
import AddTabProduct from './Component/AddTabProduct'
import UploadImage from './Component/UploadImage'
import Tabs from './Screens/Tabs'

function App() {
  return (
    <>
      <Tabs toggle={true} />
      <AddTabProduct />
    </>
  )
}
```

---

## 📁 Project Structure

```
dashboard/
├── public/                          # Static assets
│
├── src/
│   ├── Component/                   # Reusable components
│   │   ├── AddTabProduct.jsx        # 🆕 Product form with modal
│   │   ├── ColorInput.jsx           # Color selection component
│   │   ├── SizeInput.jsx            # Size dropdown component
│   │   ├── UploadImage.jsx          # Image upload with preview
│   │   ├── Buttons.jsx              # Custom button wrapper
│   │   ├── Card.jsx                 # Card component
│   │   ├── Container.jsx            # Layout container
│   │   ├── Navbar.jsx               # Navigation bar
│   │   ├── Sidebar.jsx              # Sidebar navigation
│   │   └── Table.jsx                # Data table
│   │
│   ├── Screens/                     # Page components
│   │   ├── Dashboard.jsx            # Main dashboard
│   │   ├── Layout.jsx               # App layout wrapper
│   │   ├── Tabs.jsx                 # 🆕 Tab toggle component
│   │   ├── Orders.jsx               # Orders page
│   │   ├── Products.jsx             # Products page
│   │   └── Users.jsx                # Users page
│   │
│   ├── Charts/                      # Chart components
│   │   ├── BasicBarChart.jsx
│   │   ├── BasicLineChart.jsx
│   │   ├── PyramidFunnel.jsx
│   │   └── TitaniPie.jsx
│   │
│   ├── Redux/                       # State management
│   │   ├── store.js
│   │   └── SidebarSlice.js
│   │
│   ├── assets/                      # Images, icons
│   │
│   ├── App.jsx                      # Root component
│   ├── main.jsx                     # Entry point
│   ├── App.css                      # App styles
│   └── index.css                    # Global styles
│
├── eslint.config.js                 # ESLint configuration
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS config
├── postcss.config.js                # PostCSS config
├── package.json                     # Dependencies
└── README.md                        # This file
```

---

## 🧩 Components

### **AddTabProduct** (New)
Main form for adding new products with responsive design.

**Features:**
- Product name input
- Price input with currency symbol
- Multiple color selection (add/remove)
- Size dropdown with predefined options
- Image upload with preview
- Confirmation modal before saving
- Form validation

**Props:** None (uses local state)

**State:**
```javascript
const [productName, setProductName] = useState('')
const [price, setPrice] = useState('')
const [colors, setColors] = useState([''])
const [sizes, setSizes] = useState([''])
const [showModal, setShowModal] = useState(false)
```

**Usage:**
```jsx
import AddTabProduct from './Component/AddTabProduct'

function App() {
  return <AddTabProduct />
}
```

---

### **ColorInput**
Reusable component for managing multiple color inputs.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `colors` | array | Array of color strings |
| `onAddColor` | function | Callback to add new color |
| `onUpdateColor` | function | Callback to update color at index |
| `onRemoveColor` | function | Callback to remove color at index |

**Usage:**
```jsx
<ColorInput 
  colors={colors}
  onAddColor={() => setColors([...colors, ''])}
  onUpdateColor={(i, v) => updateColorAtIndex(i, v)}
  onRemoveColor={(i) => removeColorAtIndex(i)}
/>
```

---

### **SizeInput**
Dropdown selector for predefined product sizes.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `sizes` | array | Array of selected sizes |
| `onAddSize` | function | Callback to add new size |
| `onUpdateSize` | function | Callback to update size at index |
| `onRemoveSize` | function | Callback to remove size at index |

**Available Sizes:** XS, S (Small), M (Medium), L (Large), XL, XXL, XXXL

---

### **UploadImage**
Image upload component with preview functionality.

**Features:**
- File input with image filter
- Live preview in circular frame
- Upload button
- Remove button
- File name display

---

### **Tabs** (Updated)
Navigation tabs with toggle functionality.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `toggle` | boolean | Sidebar toggle state |

**Behavior:**
- Click tab → Show content
- Click same tab again → Hide content
- Click different tab → Switch content

---

## 📱 Responsive Design

### Breakpoints

| Screen | Size | Grid | Padding |
|--------|------|------|---------|
| **Mobile** | < 768px | 1 column | `p-2` |
| **Tablet** | 768px - 1023px | 2 columns | `p-4` |
| **Desktop** | ≥ 1024px | 2 columns | `p-6` |

### Responsive Classes

```html
<!-- Text scales with screen -->
<h1 className="text-2xl sm:text-3xl">Title</h1>

<!-- Grid changes at breakpoints -->
<div className="grid grid-cols-1 md:grid-cols-2">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Padding adjusts responsively -->
<div className="p-2 sm:p-4 lg:p-6">Content</div>
```

---

## 🎨 Styling

**Color Palette:**
- Primary: Blue (from-blue-500 to-blue-600)
- Success: Green (bg-green-500)
- Danger: Red (bg-red-500)
- Background: Gray gradient (from-gray-50 to-gray-100)

**Tailwind Configuration:** See `tailwind.config.js`

---

## 🔄 Git Workflow

### Professional Commit Messages

**Format:** `<type>(<scope>): <subject>`

**Examples:**
```bash
git commit -m "feat(addproduct): add product form with colors and sizes"
git commit -m "fix(tabs): fix toggle not working on same tab click"
git commit -m "refactor(components): extract ColorInput component"
```

### Feature Branch Workflow

```bash
git checkout -b feat/feature-name
git add .
git commit -m "feat(scope): description"
git push origin feat/feature-name
# Create Pull Request
```

---

## 🚦 Performance Tips

1. **Use useCallback for event handlers**
2. **Use useMemo for expensive computations**
3. **Use stable keys in lists (not index)**
4. **Lazy load components with React.lazy**

---

## 🐛 Troubleshooting

### Port 5173 Already in Use
```bash
lsof -i :5173
kill -9 <PID>
npm run dev
```

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [Material-UI](https://mui.com)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feat/feature-name`
3. Commit changes: `git commit -m "feat(scope): description"`
4. Push: `git push origin feat/feature-name`
5. Open a Pull Request

---

## 📄 License

MIT License - see LICENSE file for details.

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

**Happy Coding! 🚀**
