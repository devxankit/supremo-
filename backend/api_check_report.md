# API Check Results

Tested on: 2026-06-28T06:51:36.615Z
Base URL: http://localhost:5001

| Route File | Method | Declared Path | Resolved Path | Status Code | Status Text | Result | Notes |
|---|---|---|---|---|---|---|---|
| aboutRoutes.js | **GET** | `/` | `/api/about` | 200 | OK | ✅ Working (2xx) | - |
| aboutRoutes.js | **PUT** | `/` | `/api/about` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| authRoutes.js | **POST** | `/login` | `/api/auth/login` | 400 | Bad Request | ✅ Working (Auth/Validation: 400) | - |
| authRoutes.js | **GET** | `/me` | `/api/auth/me` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| authRoutes.js | **PUT** | `/profile` | `/api/auth/profile` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| authRoutes.js | **PUT** | `/password` | `/api/auth/password` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| blogRoutes.js | **GET** | `/` | `/api/blogs` | 200 | OK | ✅ Working (2xx) | - |
| blogRoutes.js | **GET** | `/:slug` | `/api/blogs/pvc-pipe-maintenance-7-tips-to-prevent-leaks-and-extend-life` | 200 | OK | ✅ Working (2xx) | - |
| blogRoutes.js | **POST** | `/` | `/api/blogs` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| blogRoutes.js | **PUT** | `/:id` | `/api/blogs/6a3798c7abb9b98033e47b84` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| blogRoutes.js | **DELETE** | `/:id` | `/api/blogs/6a3798c7abb9b98033e47b84` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| careerApplicationRoutes.js | **POST** | `/` | `/api/career-applications` | 400 | Bad Request | ✅ Working (Auth/Validation: 400) | - |
| careerApplicationRoutes.js | **GET** | `/` | `/api/career-applications` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| careerApplicationRoutes.js | **POST** | `/:id/send-email` | `/api/career-applications/60d21b4667d0d8992e610c85/send-email` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| careerApplicationRoutes.js | **PUT** | `/:id` | `/api/career-applications/60d21b4667d0d8992e610c85` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| careerApplicationRoutes.js | **DELETE** | `/:id` | `/api/career-applications/60d21b4667d0d8992e610c85` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| careersRoutes.js | **GET** | `/` | `/api/careers` | 200 | OK | ✅ Working (2xx) | - |
| careersRoutes.js | **PUT** | `/` | `/api/careers` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| categoryRoutes.js | **GET** | `/` | `/api/categories` | 200 | OK | ✅ Working (2xx) | - |
| categoryRoutes.js | **POST** | `/` | `/api/categories` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| categoryRoutes.js | **PUT** | `/:id` | `/api/categories/60d21b4667d0d8992e610c85` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| categoryRoutes.js | **DELETE** | `/:id` | `/api/categories/60d21b4667d0d8992e610c85` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| contactApplicationRoutes.js | **POST** | `/` | `/api/contact-applications` | 400 | Bad Request | ✅ Working (Auth/Validation: 400) | - |
| contactApplicationRoutes.js | **GET** | `/` | `/api/contact-applications` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| contactApplicationRoutes.js | **POST** | `/:id/send-email` | `/api/contact-applications/60d21b4667d0d8992e610c85/send-email` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| contactApplicationRoutes.js | **PUT** | `/:id` | `/api/contact-applications/60d21b4667d0d8992e610c85` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| contactApplicationRoutes.js | **DELETE** | `/:id` | `/api/contact-applications/60d21b4667d0d8992e610c85` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| contactRoutes.js | **GET** | `/` | `/api/contact` | 200 | OK | ✅ Working (2xx) | - |
| contactRoutes.js | **PUT** | `/` | `/api/contact` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| dealerNetworkRoutes.js | **GET** | `/` | `/api/dealer-network` | 200 | OK | ✅ Working (2xx) | - |
| dealerNetworkRoutes.js | **PUT** | `/` | `/api/dealer-network` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| dealershipRoutes.js | **GET** | `/` | `/api/dealership` | 200 | OK | ✅ Working (2xx) | - |
| dealershipRoutes.js | **PUT** | `/` | `/api/dealership` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| galleryRoutes.js | **GET** | `/` | `/api/gallery` | 200 | OK | ✅ Working (2xx) | - |
| galleryRoutes.js | **GET** | `/youtube-duration` | `/api/gallery/youtube-duration` | 400 | Bad Request | ✅ Working (Auth/Validation: 400) | - |
| galleryRoutes.js | **PUT** | `/` | `/api/gallery` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| heroRoutes.js | **GET** | `/` | `/api/hero` | 200 | OK | ✅ Working (2xx) | - |
| heroRoutes.js | **PUT** | `/` | `/api/hero` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| homepageRoutes.js | **GET** | `/` | `/api/homepage-sections` | 200 | OK | ✅ Working (2xx) | - |
| homepageRoutes.js | **PUT** | `/` | `/api/homepage-sections` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| inquiryRoutes.js | **POST** | `/` | `/api/inquiries` | 400 | Bad Request | ✅ Working (Auth/Validation: 400) | - |
| inquiryRoutes.js | **POST** | `/visit` | `/api/inquiries/visit` | 400 | Bad Request | ✅ Working (Auth/Validation: 400) | - |
| inquiryRoutes.js | **GET** | `/sidebar-counts` | `/api/inquiries/sidebar-counts` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| inquiryRoutes.js | **GET** | `/notifications` | `/api/inquiries/notifications` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| inquiryRoutes.js | **GET** | `/analytics` | `/api/inquiries/analytics` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| inquiryRoutes.js | **GET** | `/stats` | `/api/inquiries/stats` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| inquiryRoutes.js | **GET** | `/` | `/api/inquiries` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| inquiryRoutes.js | **POST** | `/:id/send-email` | `/api/inquiries/60d21b4667d0d8992e610c85/send-email` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| inquiryRoutes.js | **PUT** | `/:id` | `/api/inquiries/60d21b4667d0d8992e610c85` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| inquiryRoutes.js | **DELETE** | `/:id` | `/api/inquiries/60d21b4667d0d8992e610c85` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| journeyRoutes.js | **GET** | `/` | `/api/journey` | 200 | OK | ✅ Working (2xx) | - |
| journeyRoutes.js | **PUT** | `/` | `/api/journey` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| mediaRoutes.js | **POST** | `/upload` | `/api/media/upload` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| mediaRoutes.js | **POST** | `/upload-public` | `/api/media/upload-public` | 400 | Bad Request | ✅ Working (Auth/Validation: 400) | - |
| mediaRoutes.js | **POST** | `/upload-public-resume` | `/api/media/upload-public-resume` | 400 | Bad Request | ✅ Working (Auth/Validation: 400) | - |
| mediaRoutes.js | **GET** | `/download` | `/api/media/download` | 400 | Bad Request | ✅ Working (Auth/Validation: 400) | - |
| privacyRoutes.js | **GET** | `/` | `/api/privacy` | 200 | OK | ✅ Working (2xx) | - |
| privacyRoutes.js | **PUT** | `/` | `/api/privacy` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| productRoutes.js | **GET** | `/` | `/api/products` | 200 | OK | ✅ Working (2xx) | - |
| productRoutes.js | **GET** | `/:slug` | `/api/products/six-layer-500l-water-tank` | 200 | OK | ✅ Working (2xx) | - |
| productRoutes.js | **POST** | `/` | `/api/products` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| productRoutes.js | **PUT** | `/:id` | `/api/products/6a35422bf1be3e73d40f9de6` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| productRoutes.js | **DELETE** | `/:id` | `/api/products/6a35422bf1be3e73d40f9de6` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| reachRoutes.js | **GET** | `/` | `/api/reach` | 200 | OK | ✅ Working (2xx) | - |
| reachRoutes.js | **PUT** | `/` | `/api/reach` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| reviewRoutes.js | **GET** | `/:productSlug` | `/api/reviews/six-layer-500l-water-tank` | 200 | OK | ✅ Working (2xx) | - |
| reviewRoutes.js | **POST** | `/:productSlug` | `/api/reviews/six-layer-500l-water-tank` | 403 | Forbidden | ✅ Working (Auth/Validation: 403) | - |
| settingsRoutes.js | **GET** | `/` | `/api/settings` | 200 | OK | ✅ Working (2xx) | - |
| settingsRoutes.js | **PUT** | `/` | `/api/settings` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| termsRoutes.js | **GET** | `/` | `/api/terms` | 200 | OK | ✅ Working (2xx) | - |
| termsRoutes.js | **PUT** | `/` | `/api/terms` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| warrantyRoutes.js | **GET** | `/` | `/api/warranty` | 200 | OK | ✅ Working (2xx) | - |
| warrantyRoutes.js | **PUT** | `/` | `/api/warranty` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
| whyUsRoutes.js | **GET** | `/` | `/api/why-us` | 200 | OK | ✅ Working (2xx) | - |
| whyUsRoutes.js | **PUT** | `/` | `/api/why-us` | 401 | Unauthorized | ✅ Working (Auth/Validation: 401) | - |
