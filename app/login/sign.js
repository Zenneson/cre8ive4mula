import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";

// Initialize Firebase Authentication
const auth = getAuth();

// Function to handle sign-in with any provider
const signInWithProvider = (provider) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token or a Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the respective API.
      const credential =
        provider.providerId === "google.com"
          ? GoogleAuthProvider.credentialFromResult(result)
          : TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // For Twitter, you also get a secret
      const secret = credential.secret; // This will be undefined for GoogleAuthProvider

      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential =
        provider.providerId === "google.com"
          ? GoogleAuthProvider.credentialFromError(error)
          : TwitterAuthProvider.credentialFromError(error);
      // ...
    });
};

// Create provider instances
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// TODO: Add a function to handle sign-in with email and password
// Example usage
// For Google sign-in
signInWithProvider(googleProvider);

// For Twitter sign-in
signInWithProvider(twitterProvider);
