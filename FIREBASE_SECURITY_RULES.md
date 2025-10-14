# Firebase Security Rules

## Firestore Security Rules

Add these rules to your Firebase Console under Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if user owns the resource
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Helper function to check email verification
    function isEmailVerified() {
      return isAuthenticated() && request.auth.token.email_verified == true;
    }
    
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      // Allow read if user owns the document
      allow read: if isOwner(userId);
      
      // Allow create only if authenticated and creating own document
      allow create: if isAuthenticated() && request.auth.uid == userId;
      
      // Allow update only if user owns the document and email is verified
      allow update: if isOwner(userId) && isEmailVerified();
      
      // Prevent deletion of user profiles
      allow delete: if false;
    }
    
    // Products collection - public read, admin-only write
    match /products/{productId} {
      allow read: if true;
      allow write: if false; // Only admins via Admin SDK
    }
    
    // Songs collection - public read, admin-only write
    match /songs/{songId} {
      allow read: if true;
      allow write: if false; // Only admins via Admin SDK
    }
    
    // Orders collection - users can only access their own orders
    match /orders/{orderId} {
      allow read: if isOwner(resource.data.userId) && isEmailVerified();
      allow create: if isAuthenticated() && isEmailVerified() 
                    && request.resource.data.userId == request.auth.uid;
      allow update: if false; // Orders should not be updated by users
      allow delete: if false; // Orders should not be deleted
    }
    
    // Donations collection - users can only access their own donations
    match /donations/{donationId} {
      allow read: if isOwner(resource.data.userId) && isEmailVerified();
      allow create: if isAuthenticated() && isEmailVerified() 
                    && request.resource.data.userId == request.auth.uid;
      allow update: if false;
      allow delete: if false;
    }
    
    // Adverts collection - public read, admin-only write
    match /adverts/{advertId} {
      allow read: if true;
      allow write: if false;
    }
    
    // Default deny all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Storage Security Rules

Add these rules to your Firebase Console under Storage > Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isEmailVerified() {
      return request.auth.token.email_verified == true;
    }
    
    function isValidImageType() {
      return request.resource.contentType.matches('image/.*');
    }
    
    function isValidFileSize() {
      return request.resource.size < 5 * 1024 * 1024; // 5MB
    }
    
    // User profile images
    match /users/{userId}/profile/{fileName} {
      allow read: if true; // Public read
      allow write: if isAuthenticated() 
                   && isEmailVerified()
                   && request.auth.uid == userId
                   && isValidImageType()
                   && isValidFileSize();
    }
    
    // Order receipts - private to user
    match /orders/{orderId}/receipts/{fileName} {
      allow read: if isAuthenticated() 
                  && isEmailVerified();
      allow write: if false; // Only server-side
    }
    
    // Public assets
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if false; // Only admins
    }
    
    // Default deny
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

## Security Best Practices

1. **Enable Email Verification**: Always verify user emails before allowing access to sensitive data
2. **Use HTTPS**: Firebase automatically uses HTTPS for all connections
3. **Token Refresh**: Firebase Auth automatically refreshes tokens
4. **Rate Limiting**: Implement rate limiting on sensitive operations
5. **Input Validation**: Always validate and sanitize user inputs
6. **Audit Logs**: Monitor Firebase console for suspicious activities

## Implementation Checklist

- [ ] Deploy Firestore Security Rules
- [ ] Deploy Storage Security Rules
- [ ] Enable email verification in Firebase Console
- [ ] Configure authorized domains
- [ ] Enable audit logging
- [ ] Set up monitoring alerts
- [ ] Review and test rules regularly
