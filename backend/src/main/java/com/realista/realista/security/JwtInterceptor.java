package com.realista.realista.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class JwtInterceptor implements HandlerInterceptor {
    
    private static final Logger log = LoggerFactory.getLogger(JwtInterceptor.class);
    private final JwtUtil jwtUtil;
    
    public JwtInterceptor(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Clear context at start of each request
        AuthContext.clear();
        
        // Only apply to methods with @Authenticated annotation
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }
        
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Authenticated authenticated = handlerMethod.getMethodAnnotation(Authenticated.class);
        
        if (authenticated == null) {
            // Endpoint doesn't require authentication
            return true;
        }
        
        // Extract Authorization header
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("Missing or invalid Authorization header for protected endpoint: {}", request.getRequestURI());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Missing or invalid Authorization header\"}");
            response.setContentType("application/json");
            return false;
        }
        
        // Extract token (remove "Bearer " prefix)
        String token = authHeader.substring(7);
        
        // Validate token
        if (!jwtUtil.validateToken(token)) {
            log.warn("Invalid or expired JWT token for endpoint: {}", request.getRequestURI());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Invalid or expired token\"}");
            response.setContentType("application/json");
            return false;
        }
        
        // Extract user info from token and populate context
        try {
            Long userId = jwtUtil.extractUserId(token);
            String email = jwtUtil.extractEmail(token);
            String provider = jwtUtil.extractClaim(token, claims -> claims.get("provider", String.class));
            
            AuthContext.setUser(userId, email, provider);
            log.debug("Authenticated user {} ({}) for endpoint: {}", email, userId, request.getRequestURI());
            
            return true;
        } catch (Exception e) {
            log.error("Error extracting user info from token", e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Invalid token claims\"}");
            response.setContentType("application/json");
            return false;
        }
    }
    
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // Clean up context after request completes
        AuthContext.clear();
    }
}
