package com.fruit.lostandfound.dto.response;

import java.time.LocalDateTime;

public record ItemResponse(
        Long id,
        String title,
        String description,
        LocalDateTime foundAt,
        LocalDateTime createdAt,
        Boolean isActive,
        Boolean isOwner,
        UserSummary foundBy
) {}
