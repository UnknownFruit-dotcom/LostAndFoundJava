package com.fruit.lostandfound.mapper;

import com.fruit.lostandfound.dto.response.UserResponse;
import com.fruit.lostandfound.dto.request.UserRegistrationRequest;
import com.fruit.lostandfound.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(User user);

    List<UserResponse> toResponseList(List<User> users);

    @Mapping(target = "passwordHash", ignore = true)
    User toEntity(UserRegistrationRequest userRegistrationRequest);
}