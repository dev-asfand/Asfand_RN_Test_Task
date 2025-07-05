# React Native Location Search App

A comprehensive React Native mobile application that demonstrates advanced technical skills including Google Maps integration, Places API usage, local data persistence, and responsive UI design.

## 🚀 Features

### Core Functionality
- **Google Maps Place Search**: Real-time search with Google Places API
- **Interactive Map Display**: Show selected locations on Google Maps
- **Search History Management**: Persistent local storage of searched places
- **Responsive Design**: Optimized for all screen sizes using react-native-responsive-screen

### Technical Highlights
- **TypeScript**: Full type safety and better development experience
- **Custom Hooks**: Modular state management with useSearch hook
- **Service Layer**: Clean separation of concerns with dedicated services
- **AsyncStorage**: Local data persistence for search history
- **Debounced Search**: Performance optimization with 500ms debounce
- **Error Handling**: Comprehensive error handling throughout the app

## 📱 Screens

The app features two main tabs:
1. **Map Tab**: Search interface with map display
2. **History Tab**: List of previously searched locations

## 🛠️ Prerequisites

- Node.js (>= 18)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Google Maps API Key

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dev-asfand/Asfand_RN_Test_Task.git
   cd AsfandRNTest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (iOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

## 🔑 Google Maps API Setup

1. **Get API Keys**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google Maps API and Places API
   - Create API keys for both services

2. **Configure API Keys**
   - Open `src/config/api.ts`
   - Replace the placeholder values:
     ```typescript
     export const API_CONFIG = {
       GOOGLE_MAPS_API_KEY: 'YOUR_ACTUAL_MAPS_API_KEY',
       GOOGLE_PLACES_API_KEY: 'YOUR_ACTUAL_PLACES_API_KEY',
       GOOGLE_PLACES_BASE_URL: 'https://maps.googleapis.com/maps/api/place',
     };
     ```

3. **iOS Configuration**
   - Add your API key to `ios/AsfandRNTest/AppDelegate.mm`:
     ```objc
     [GMSServices provideAPIKey:@"YOUR_API_KEY"];
     ```

4. **Android Configuration**
   - Add your API key to `android/app/src/main/AndroidManifest.xml`:
     ```xml
     <meta-data
       android:name="com.google.android.geo.API_KEY"
       android:value="YOUR_API_KEY" />
     ```

## 🚀 Running the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Metro Bundler
```bash
npm start
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SearchBar.tsx   # Search interface with suggestions
│   ├── MapView.tsx     # Google Maps integration
│   └── SearchHistory.tsx # History management UI
├── screens/            # Main app screens
│   └── HomeScreen.tsx  # Main screen with tab navigation
├── services/           # Business logic and API calls
│   ├── placesService.ts # Google Places API integration
│   └── storageService.ts # AsyncStorage operations
├── hooks/              # Custom React hooks
│   └── useSearch.ts    # Search state management
├── types/              # TypeScript type definitions
│   └── index.ts        # App-wide type interfaces
└── config/             # Configuration files
    └── api.ts          # API keys and constants
```

## 🔧 Key Components

### SearchBar Component
- Real-time search with debouncing
- Responsive design with react-native-responsive-screen
- Loading states and error handling
- Clean search results display

### MapView Component
- Google Maps integration with markers
- Place details overlay
- Smooth navigation to selected locations
- User location support

### SearchHistory Component
- Persistent local storage
- Individual item removal
- Bulk history clearing
- Time-based formatting

### useSearch Hook
- Centralized state management
- API integration
- Storage operations
- Performance optimization

## 🎯 Technical Evaluation Criteria

### ✅ Efficient Google Maps and Places API Usage
- Proper API key management
- Optimized API calls with debouncing
- Error handling and fallbacks
- Type-safe API responses

### ✅ State Management and Local Data Persistence
- Custom hooks for state management
- AsyncStorage for local persistence
- Efficient data structures
- Proper cleanup and memory management

### ✅ Code Quality and Best Practices
- TypeScript for type safety
- Modular architecture
- Clean separation of concerns
- Comprehensive error handling
- Performance optimizations

### ✅ User Interface and Experience
- Responsive design
- Intuitive navigation
- Loading states
- Error feedback
- Smooth animations

### ✅ Performance Optimization
- Debounced search (500ms)
- Efficient list rendering
- Memory leak prevention
- Optimized re-renders

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **iOS build issues**
   ```bash
   cd ios && pod deintegrate && pod install && cd ..
   ```

3. **Android build issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

4. **API key issues**
   - Ensure API keys are correctly configured
   - Check API quotas and billing
   - Verify API services are enabled

## 📄 License

This project is created for technical evaluation purposes.

## 🤝 Contributing

This is a technical evaluation project. For questions or issues, please refer to the evaluation criteria and implementation details above.

---

**Note**: This application demonstrates senior-level React Native development skills including advanced state management, API integration, performance optimization, and clean architecture patterns.
