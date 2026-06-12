package com.fruit.lostandfound.dto.request;

import java.io.Serializable;

/**
 * DTO for {@link com.fruit.lostandfound.model.User}
 */
public record UserRegistrationRequest(String login, String password) implements Serializable {
}