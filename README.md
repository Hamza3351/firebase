# Firebase + React Native Google Sign-In

## Setup

### Dependencies
- Install dependencies:  
  `npx expo install` 

### Prebuild & Build
- Generate native code (for bare/custom workflow):  
  `npx expo prebuild`  

### Run & Development
- Run on Android:  
  `npx expo run android` 

### Build for Release
- Go inside android directory:  
  `cd android`
  
- Build:  
  `./gradlew assembleRelease`

- The APK will be generated at:
  `android/app/build/outputs/apk/release/app-release.apk`
