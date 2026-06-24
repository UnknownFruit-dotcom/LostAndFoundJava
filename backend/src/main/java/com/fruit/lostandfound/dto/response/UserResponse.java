package com.fruit.lostandfound.dto.response;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.fruit.lostandfound.model.User}
 */
public record UserResponse(Long id, String login, String role, LocalDateTime createdAt) implements Serializable {
}