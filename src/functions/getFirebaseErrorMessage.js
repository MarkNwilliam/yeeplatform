export function getErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/user-disabled':
        return 'This user has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful login attempts. Please try again later.';
      case 'auth/email-already-in-use':
        return 'The email address is already in use by another account.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/operation-not-allowed':
        return 'Signing in with this method is not allowed.';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with the same email address but different sign-in credentials.';
      case 'auth/auth-domain-config-required':
        return 'An auth domain configuration is required.';
      case 'auth/credential-already-in-use':
        return 'This credential is already associated with a different user account.';
      case 'auth/operation-not-supported-in-this-environment':
        return 'This operation is not supported in the environment this application is running on.';
      case 'auth/timeout':
        return 'The operation has timed out.';
      case 'auth/missing-android-pkg-name':
        return 'An Android Package Name must be provided if the Android App is required to be installed.';
      case 'auth/missing-continue-uri':
        return 'A continue URL must be provided in the request.';
      case 'auth/missing-ios-bundle-id':
        return 'An iOS Bundle ID must be provided if an App Store ID is provided.';
      case 'auth/invalid-continue-uri':
        return 'The continue URL provided in the request is invalid.';
      case 'auth/unauthorized-continue-uri':
        return 'The domain of the continue URL is not whitelisted.';
      case 'auth/invalid-dynamic-link-domain':
        return 'The dynamic link domain is not valid.';
      default:
        return 'An unknown error occurred.';
    }
  }