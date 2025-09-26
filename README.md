# Professional Course Selling App

A comprehensive platform for selling and managing online courses, built from scratch with modern web technologies.

## 🚀 Features

### For Course Creators
- **Course Management**: Create, edit, and organize courses with multimedia content
- **Content Upload**: Support for videos, documents, quizzes, and interactive materials
- **Student Analytics**: Track student progress and engagement metrics
- **Revenue Dashboard**: Monitor sales, earnings, and performance statistics
- **Marketing Tools**: Discount codes, promotional campaigns, and affiliate management

### For Students
- **Course Catalog**: Browse and search through available courses
- **Learning Dashboard**: Track progress and access enrolled courses
- **Interactive Learning**: Video playback, note-taking, and progress tracking
- **Certificates**: Downloadable completion certificates
- **Community Features**: Discussion forums and peer interaction

### Platform Features
- **Secure Payment Processing**: Multiple payment gateway integration
- **User Authentication**: Secure login/signup with email verification
- **Responsive Design**: Mobile-first approach for all devices
- **Search & Filtering**: Advanced course discovery features
- **Admin Panel**: Complete platform management and moderation tools

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js with Next.js for SSR/SSG
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Redux Toolkit / Zustand
- **UI Components**: Custom component library
- **Video Player**: Custom video player with DRM protection

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh token rotation
- **File Storage**: AWS S3 for course materials and videos
- **Payment**: Stripe/Razorpay integration
- **Email Service**: SendGrid/AWS SES

### DevOps & Tools
- **Version Control**: Git with GitHub
- **Deployment**: Docker containers on AWS/Vercel
- **CI/CD**: GitHub Actions
- **Monitoring**: Error tracking and performance monitoring
- **Testing**: Jest for unit tests, Cypress for E2E tests

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- PostgreSQL database
- AWS account for file storage
- Payment gateway accounts (Stripe/Razorpay)
- Email service provider account

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aniketyadav77/professional-course-selling-app.git
   cd professional-course-selling-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Fill in your environment variables in the `.env` file.

4. **Database Setup**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Admin Panel: http://localhost:3000/admin

## 📁 Project Structure

```
professional-course-selling-app/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Next.js pages
│   │   ├── hooks/         # Custom React hooks
│   │   ├── store/         # State management
│   │   ├── utils/         # Helper functions
│   │   └── styles/        # Global styles and Tailwind config
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── utils/         # Helper functions
├── docs/                  # Documentation
├── tests/                 # Test files
└── docker/                # Docker configuration
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/course_selling_app

# JWT Secrets
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret

# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your_s3_bucket_name

# Payment Gateways
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Email Service
SENDGRID_API_KEY=your_sendgrid_api_key
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Docker Deployment
```bash
docker build -t course-selling-app .
docker run -p 3000:3000 course-selling-app
```

## 📊 API Documentation

API documentation is available at `/api/docs` when the server is running in development mode.

### Key API Endpoints

- **Authentication**: `/api/auth/*`
- **Courses**: `/api/courses/*`
- **Users**: `/api/users/*`
- **Payments**: `/api/payments/*`
- **Analytics**: `/api/analytics/*`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aniket Yadav**
- GitHub: [@Aniketyadav77](https://github.com/Aniketyadav77)
- LinkedIn: [Connect with me](https://linkedin.com/in/aniketyadav77)

## 🙏 Acknowledgments

- Thanks to all contributors who help make this project better
- Special thanks to the open-source community for the amazing tools and libraries
- Inspired by the need for accessible and professional online education platforms

## 📞 Support

If you have any questions or need help with setup, please:
- Open an issue on GitHub
- Check the [documentation](./docs/)
- Contact: [your-email@domain.com]

---

**Built with ❤️ from scratch without AI assistance**