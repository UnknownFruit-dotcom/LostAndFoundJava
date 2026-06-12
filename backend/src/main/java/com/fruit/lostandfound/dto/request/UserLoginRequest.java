package com.fruit.lostandfound.dto.request;

public record UserLoginRequest(
        String login,
        String password
) {}
