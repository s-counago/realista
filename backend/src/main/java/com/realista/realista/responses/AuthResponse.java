package com.realista.realista.responses;

public class AuthResponse {
    private Long userId;
    private String email;
    private String token;
    private String provider;

    public AuthResponse(Long userId, String email, String token, String provider) {
        this.userId = userId;
        this.email = email;
        this.token = token;
        this.provider = provider;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }
}
