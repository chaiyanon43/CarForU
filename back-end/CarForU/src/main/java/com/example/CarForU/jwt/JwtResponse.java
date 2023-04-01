package com.example.CarForU.jwt;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String role;


    public JwtResponse(String accessToken,String role) {
        this.token = accessToken;
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }
}