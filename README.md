<<<<<<< HEAD
# CampusCrate - Campus Lost & Found Platform

A modern, responsive web application for managing lost and found items on university campuses. Built with React, TypeScript, and shadcn/ui components.

## 🚀 Features

### Core Features
- **Lost & Found Management**: Post and search for lost or found items
- **User Authentication**: Secure login with role-based access
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Instant notifications and status updates

### 🔐 Admin Features
- **Protected Admin Dashboard**: Comprehensive admin interface with role-based access
- **Items Management**: Approve, reject, and moderate all posted items
- **User Management**: Suspend, activate, and monitor user accounts
- **Claims Management**: Process and verify item claim requests
- **Spam Detection**: AI-powered content moderation and spam detection
- **Analytics Dashboard**: Real-time statistics and platform insights

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context + Hooks
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ishan-arc/final-project.git
   cd final-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8081` (or the URL shown in your terminal)

## 🎯 Usage

### For Regular Users
1. **Login**: Use the "Continue with Google" button (mocked for demo)
2. **Browse Items**: View lost and found items on the dashboard
3. **Post Items**: Create new lost or found item listings
4. **Claim Items**: Submit claims for found items

### For Administrators
1. **Access Admin Panel**: Click the "Admin" link in the navigation
2. **Manage Items**: Approve/reject pending items, monitor spam
3. **Manage Users**: Suspend problematic users, view activity
4. **Process Claims**: Review and approve item claim requests

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx      # Route protection component
│   ├── forms/
│   │   └── SearchFilter.tsx        # Search and filter components
│   ├── items/
│   │   ├── ItemCard.tsx           # Item display component
│   │   └── StatusBadge.tsx        # Status indicator component
│   ├── layout/
│   │   └── Navbar.tsx             # Navigation component
│   ├── modals/
│   │   └── ClaimModal.tsx         # Claim request modal
│   └── ui/                        # shadcn/ui components
├── hooks/
│   ├── use-auth.tsx               # Authentication context
│   └── use-mobile.tsx             # Mobile detection hook
├── lib/
│   ├── spam-detection.ts          # Spam detection utilities
│   └── utils.ts                   # Utility functions
├── pages/
│   ├── Admin.tsx                  # Admin dashboard
│   ├── DashboardFound.tsx         # Found items dashboard
│   ├── DashboardLost.tsx          # Lost items dashboard
│   ├── Index.tsx                  # Landing page
│   ├── ItemDetail.tsx             # Item details page
│   ├── Login.tsx                  # Login page
│   ├── NotFound.tsx               # 404 page
│   ├── PostFound.tsx              # Post found item
│   └── PostLost.tsx               # Post lost item
└── App.tsx                        # Main application component
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛡️ Security Features

- **Protected Routes**: Admin routes require authentication and admin privileges
- **Role-based Access**: Different features for regular users and administrators
- **Input Validation**: Comprehensive form validation and sanitization
- **Spam Detection**: Automated content moderation with configurable rules

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with side-by-side layouts
- **Tablet**: Optimized layouts with collapsible sections
- **Mobile**: Touch-friendly interface with mobile navigation

## 🎨 UI/UX Features

- **Modern Design**: Clean, intuitive interface using shadcn/ui
- **Dark/Light Mode**: Theme support (configurable)
- **Loading States**: Smooth loading indicators and skeleton screens
- **Toast Notifications**: Real-time feedback for user actions
- **Confirmation Dialogs**: Prevent accidental actions with confirmation prompts

## 🔍 Admin Dashboard Features

### Items Management
- View all items with detailed information
- Filter by status (pending, approved, rejected, reported, spam)
- Search across titles, descriptions, and submitter emails
- Approve/reject items with confirmation dialogs
- Spam detection indicators

### User Management
- Monitor user activity and behavior
- Suspend/activate user accounts
- View spam risk scores
- Track user statistics

### Claims Management
- Process item claim requests
- Verify claim authenticity
- Approve/reject claims
- Track claim history

### Analytics
- Real-time platform statistics
- Pending items count
- Active users monitoring
- Spam risk assessment

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the icon library
- [React Router](https://reactrouter.com/) for client-side routing

## 📞 Support

For support, email support@campuscrate.com or create an issue in this repository.

---

**Built with ❤️ for campus communities**
=======
# final-project
>>>>>>> 2236039004a322d039c6dd36f290b256047b75f2
