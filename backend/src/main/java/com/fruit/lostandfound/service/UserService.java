package com.fruit.lostandfound.service;

import com.fruit.lostandfound.dto.request.UserRegistrationRequest;
import com.fruit.lostandfound.dto.response.UserResponse;
import com.fruit.lostandfound.exception.ResourceNotFoundException;
import com.fruit.lostandfound.exception.UserAlreadyExistsException;
import com.fruit.lostandfound.mapper.UserMapper;
import com.fruit.lostandfound.model.User;
import com.fruit.lostandfound.repository.UserRepository;
import com.fruit.lostandfound.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return userMapper.toResponseList(users);
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return userMapper.toResponse(user);
    }

    public UserResponse getUserByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with login: " + login));
        return userMapper.toResponse(user);
    }

    @Transactional
    public UserResponse registerUser(UserRegistrationRequest request) {
        if (userRepository.existsByLogin(request.login())) {
            throw new UserAlreadyExistsException("User with login '" + request.login() + "' already exists");
        }

        User user = userMapper.toEntity(request);
        user.setCreatedAt(LocalDateTime.now());

        String hashedPassword = passwordEncoder.encode(request.password());
        user.setPasswordHash(hashedPassword);

        User saved = userRepository.save(user);
        return userMapper.toResponse(saved);
    }

    public String login(String login, String password) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new BadCredentialsException("Неверный логин или пароль"));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new BadCredentialsException("Неверный логин или пароль");
        }

        return jwtService.generateToken(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}
