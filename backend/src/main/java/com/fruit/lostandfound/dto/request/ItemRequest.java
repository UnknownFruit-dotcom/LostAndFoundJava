package com.fruit.lostandfound.dto.request;

import java.time.LocalDateTime;

public record ItemRequest(
        String title,
        String description,
        LocalDateTime foundAt
) {}