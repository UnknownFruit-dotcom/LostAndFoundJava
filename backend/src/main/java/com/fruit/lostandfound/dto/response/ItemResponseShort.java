package com.fruit.lostandfound.dto.response;

import java.time.LocalDateTime;

public record ItemResponseShort(
        Long id,
        String title,
        String description,
        LocalDateTime foundAt,
        LocalDateTime createdAt
) {}