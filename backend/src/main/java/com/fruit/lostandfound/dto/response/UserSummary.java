package com.fruit.lostandfound.dto.response;

import java.io.Serializable;

/**
 * DTO for {@link com.fruit.lostandfound.model.User}
 */
public record UserSummary(Long id, String login) implements Serializable {
}