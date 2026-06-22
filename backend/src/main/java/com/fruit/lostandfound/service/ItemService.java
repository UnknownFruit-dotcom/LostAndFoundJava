package com.fruit.lostandfound.service;

import com.fruit.lostandfound.dto.request.ItemRequest;
import com.fruit.lostandfound.dto.response.ItemResponse;
import com.fruit.lostandfound.dto.response.ItemResponseShort;
import com.fruit.lostandfound.exception.ResourceNotFoundException;
import com.fruit.lostandfound.exception.UnauthorizedAccessException;
import com.fruit.lostandfound.model.Item;
import com.fruit.lostandfound.mapper.ItemMapper;
import com.fruit.lostandfound.model.User;
import com.fruit.lostandfound.repository.ItemRepository;
import com.fruit.lostandfound.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final ItemMapper itemMapper;

    public List<ItemResponse> getAllItems(Boolean status, Long requestingUserId) {
        List<Item> items;

        if (status == null) {
            items = itemRepository.findAllByOrderByFoundAtDesc();
        } else if (status) {
            items = itemRepository.findByIsActiveTrueOrderByFoundAtDesc();
        } else {
            items = itemRepository.findByIsActiveFalseOrderByFoundAtDesc();
        }

        List<ItemResponse> responses = itemMapper.toResponseList(items);

        if (requestingUserId != null) {
            for (ItemResponse response : responses) {
                boolean isOwner = response.foundBy() != null &&
                        response.foundBy().id().equals(requestingUserId);

                responses.set(responses.indexOf(response),
                        new ItemResponse(
                                response.id(),
                                response.title(),
                                response.description(),
                                response.foundAt(),
                                response.createdAt(),
                                response.isActive(),
                                isOwner,
                                response.foundBy()
                        ));
            }
        } else {
            responses.replaceAll(r -> new ItemResponse(
                    r.id(), r.title(), r.description(), r.foundAt(), r.createdAt(), r.isActive(), false, r.foundBy()));
        }

        return responses;
    }

    public ItemResponse getItemById(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));
        return itemMapper.toResponse(item);
    }

    public List<ItemResponse> searchItems(String search, Boolean status, Long requestingUserId) {
        List<Item> items;

        if (status == null) {
            items = itemRepository.findByTitleContainingOrDescriptionContaining(search, search);
        } else if (status) {
            items = itemRepository.findByIsActiveTrueAndTitleContainingOrDescriptionContaining(search, search);
        } else {
            items = itemRepository.findByIsActiveFalseAndTitleContainingOrDescriptionContaining(search, search);
        }

        List<ItemResponse> responses = itemMapper.toResponseList(items);

        if (requestingUserId != null) {
            for (ItemResponse response : responses) {
                boolean isOwner = response.foundBy() != null &&
                        response.foundBy().id().equals(requestingUserId);

                responses.set(responses.indexOf(response),
                        new ItemResponse(
                                response.id(),
                                response.title(),
                                response.description(),
                                response.foundAt(),
                                response.createdAt(),
                                response.isActive(),
                                isOwner,
                                response.foundBy()
                        ));
            }
        } else {
            responses.replaceAll(r -> new ItemResponse(
                    r.id(), r.title(), r.description(), r.foundAt(), r.createdAt(), r.isActive(), false, r.foundBy()));
        }

        return responses;
    }

    public List<ItemResponseShort> getItemsFoundByUser(Long userId) {
        List<Item> items = itemRepository.findByFoundByIdOrderByFoundAtDesc(userId);
        return itemMapper.toShortResponseList(items);
    }

    @Transactional
    public ItemResponse createItem(ItemRequest request, Long userId) {
        Item item = itemMapper.toEntity(request);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id:" + userId));
        item.setFoundBy(user);

        item.setCreatedAt(LocalDateTime.now());
        Item saved = itemRepository.save(item);
        return itemMapper.toResponse(saved);
    }

    @Transactional
    public void deleteItem(Long id, Long requestingUserId) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));

        if (!item.getFoundBy().getId().equals(requestingUserId)) {
            throw new UnauthorizedAccessException("You are not the owner of this item");
        }

        itemRepository.deleteById(id);
    }

    @Transactional
    public ItemResponse toggleItemStatus(Long id, Long finderId) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));

        if (!item.getFoundBy().getId().equals(finderId)) {
            throw new UnauthorizedAccessException("You are not the owner of this item");
        }

        item.setIsActive(!item.getIsActive());

        return itemMapper.toResponse(item);
    }
}
