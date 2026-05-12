package com.realista.realista.security;

/**
 * Thread-local context to store authenticated user information.
 * Available to controllers after JWT validation.
 */
public class AuthContext {
    
    private static final ThreadLocal<AuthenticatedUser> context = new ThreadLocal<>();
    
    public static void setUser(Long userId, String email, String provider) {
        context.set(new AuthenticatedUser(userId, email, provider));
    }
    
    public static AuthenticatedUser getUser() {
        return context.get();
    }
    
    public static Long getUserId() {
        AuthenticatedUser user = context.get();
        return user != null ? user.getUserId() : null;
    }
    
    public static void clear() {
        context.remove();
    }
    
    public static class AuthenticatedUser {
        private final Long userId;
        private final String email;
        private final String provider;
        
        public AuthenticatedUser(Long userId, String email, String provider) {
            this.userId = userId;
            this.email = email;
            this.provider = provider;
        }
        
        public Long getUserId() {
            return userId;
        }
        
        public String getEmail() {
            return email;
        }
        
        public String getProvider() {
            return provider;
        }
    }
}
