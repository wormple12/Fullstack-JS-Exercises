
# Period 3
An introduction to Cross-Platform App Development with React Native.

Mappestruktur og filnavne burde være tilstrækkeligt deskriptiv til at beskrive alt, om hvilke filer der hører til hvilke af periodens opgaver.

### Frontend Teamfinder App
Deployed at https://expo.io/@sn233/cph-sn233-teamfinder

**Important:** Still lacks a proper error handler for wrong usernames/passwords.

### Backend API
https://github.com/wormple12/Fullstack-JS-GameAPI

## Exam Questions
Note: This description is too big for a single exam-question. It will be divided up into separate questions for the exam.

- Explain Pros & Cons with React Native + Expo used to implement a Mobile App for Android and IOS, compared to using the Native Tools/languages for the two platforms.
  - React Native will speed the processes of development and maintenance up at a great scale, since you only need one developer instead of two. You have a single codebase for two platforms.
  - Automatic and fast rebuild and reload of app to see code changes in the real app instantly.
  - React Native is a relatively young and constantly emerging platform, therefore it has a lot of glitches and bugs. The framework doesn’t even a have 1.0 version yet. Moreover, no one can guarantee, that Facebook developers won’t shut down React Native’s support at some point, as they did with their backend-as-a-service Parse platform all of a sudden. So native tools are probably more reliable in the long term.
  - If the client says, that the only platform they are interested in is iOS, then it doesn’t make sense to make it in React Native. If they are expecting to utilize platform specific features then React is still not the best option here.
  - Your application will look absolutely identical on both platforms, for good or for worse.
  
- What is meant by the React Native Paradigm "Learn once, write anywhere" compared to for example the original (now dead) idea with Java "Write Once, run everywhere".
  - I DON'T GET THIS YET - LOOK MORE INTO IT BEFORE THE EXAM.
  - Different platforms have different looks, feels, and capabilities, and as such, we should be designing apps specifically for each platform, but the same set of engineers should still be able to build applications for whatever platform they choose, without needing to learn a fundamentally different set of technologies for each. This approach is called “learn once, write anywhere.” You need to write separate ui's for Android and iOS, for instance, but it interacts with the rest of your React code in the exact same way, making it very easy to shift between platforms.
  - (Not sure about this one. I have only written my app once, and I think it can run on both iOS and Android...)
  
- In React Native, which parts of your code gets compiled to Native Code (Widgets) and which parts do NOT?
  - Rendered elements (what's "returned" in a React Native component) compiles directly to native code. Javascript code does not.
  - React Native converts the same source code into different native components on both platforms.
  
- Explain the basic building block in a React Native Application and the difference(s) between a React Application and a React Native App.
  - The difference in the mobile environment is that instead of running React in the browser and rendering to divs and spans, we run it an embedded instance of JavaScriptCore inside our apps and render to higher-level platform-specific components (for Android and iOS). React Native instantiates real, native UI elements, they do not try to emulate them using DOM and CSS.
  
- Explain and demonstrate ways to handle User Input in a React Native Application
  - Exactly the same as normal React (with hooks) but with <TextInput> instead of <input> for example. See LoginInput.js in TeamfinderApp.
  
- Explain and demonstrate how to handle state in a React Native Application
  - Exactly the same as normal React (with hooks). You can use Modals to switch between different "windows" instead of React Router, bringing over state via props as usual. See App.js and LoginInput.js in TeamfinderApp.
  
- Explain and demonstrate how to communicate with external servers, in a React Native Application
  - Exactly the same as normal React (with fetch and async/await). See serverFacade.js in TeamfinderApp.
  
- Explain and demonstrate ways to debug a React Native Application
  - Using Expo to instantly bring your app to your mobile phone, and having it update the moment you edit the code.
  - Same, but with an Android Emulator (see Android Studio). This has additional testing functionalities that I have not tried out yet (like forcing the phone's specific location coordinates). There should be some way to use Chrome Developer Tools too, I've read somewhere?
  
- Explain and demonstrate how to use Native Device Features in a React Native/Expo app.
  - You can access many mobile functions via Expo plugins like "expo-location" and "react-native-apps" as seen in App.js in TeamfinderApp. Other examples are "react-native-camera" and "image-picker" (see "App.js" in Day1->MyFirstExpoProject).
  
- Explain and demonstrate a React Native Client that uses geo-components (Location, MapView, etc.)
  - See App.js in TeamfinderApp.
  
- Demonstrate both server and client-side, of the geo-related parts of your implementation of the ongoing semester case.
  - See App.js in TeamfinderApp, as well as gameFacade.ts in the Backend API linked to above.
