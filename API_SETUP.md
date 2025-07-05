# Google Maps API Setup Guide

This guide will help you set up Google Maps and Places API for the React Native Location Search app.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" or create a new one
3. Give your project a name (e.g., "React Native Location Search")
4. Click "Create"

## Step 2: Enable Required APIs

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for and enable these APIs:
   - **Google Maps API for iOS**
   - **Google Maps API for Android**
   - **Places API**

## Step 3: Create API Keys

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. Click "Restrict Key" to secure it:
   - **Application restrictions**: Select "iOS apps" and "Android apps"
   - **API restrictions**: Select "Restrict key" and choose the APIs you enabled

## Step 4: Configure the App

### 1. Update TypeScript Configuration

Edit `src/config/api.ts`:
```typescript
export const API_CONFIG = {
  GOOGLE_MAPS_API_KEY: 'YOUR_ACTUAL_API_KEY_HERE',
  GOOGLE_PLACES_API_KEY: 'YOUR_ACTUAL_API_KEY_HERE',
  GOOGLE_PLACES_BASE_URL: 'https://maps.googleapis.com/maps/api/place',
};
```

### 2. Configure iOS

Edit `ios/AsfandRNTest/AppDelegate.swift`:
```swift
import GoogleMaps

// In didFinishLaunchingWithOptions method:
GMSServices.provideAPIKey("YOUR_ACTUAL_API_KEY_HERE")
```

### 3. Configure Android

Edit `android/app/src/main/AndroidManifest.xml`:
```xml
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="YOUR_ACTUAL_API_KEY_HERE" />
```

## Step 5: Test the Setup

1. Run the app: `npm run ios` or `npm run android`
2. Try searching for a location
3. Verify that the map displays correctly
4. Check that search results appear

## Troubleshooting

### Common Issues

1. **"This API project is not authorized"**
   - Ensure you've enabled the required APIs
   - Check that your API key is correct
   - Verify API restrictions are set correctly

2. **"API key not found"**
   - Double-check the API key in all configuration files
   - Ensure the key is not restricted to specific apps

3. **"Quota exceeded"**
   - Check your Google Cloud billing
   - Monitor API usage in the Google Cloud Console

4. **iOS build errors**
   - Run `cd ios && pod install && cd ..`
   - Clean build: `cd ios && xcodebuild clean && cd ..`

5. **Android build errors**
   - Clean build: `cd android && ./gradlew clean && cd ..`
   - Check that Google Play Services is installed on the device/emulator

### API Quotas and Billing

- Google Maps API has a free tier with generous limits
- Monitor usage in Google Cloud Console
- Set up billing alerts to avoid unexpected charges
- Consider setting up API key restrictions for security

## Security Best Practices

1. **Restrict API Keys**: Always restrict your API keys to specific apps and APIs
2. **Monitor Usage**: Regularly check API usage in Google Cloud Console
3. **Rotate Keys**: Consider rotating API keys periodically
4. **Environment Variables**: For production, use environment variables instead of hardcoded keys

## Support

If you encounter issues:
1. Check the [Google Maps API documentation](https://developers.google.com/maps/documentation)
2. Review the [React Native Maps documentation](https://github.com/react-native-maps/react-native-maps)
3. Check the troubleshooting section in the main README.md 