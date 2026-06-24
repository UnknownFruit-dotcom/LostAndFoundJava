package com.fruit.lostandfound.controller;

import com.fruit.lostandfound.dto.request.ItemRequest;
import com.fruit.lostandfound.dto.response.ItemResponse;
import com.fruit.lostandfound.dto.response.ItemResponseShort;
import com.fruit.lostandfound.security.UserPrincipal;
import com.fruit.lostandfound.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService itemService;

    @GetMapping("/{itemId}")
    public ResponseEntity<ItemResponse> getItemById(@PathVariable Long itemId) {
        return ResponseEntity.ok(itemService.getItemById(itemId));
    }

    @GetMapping()
    public ResponseEntity<List<ItemResponse>> getItems(
            @RequestParam(required = false) Boolean status,
            @RequestParam(required = false) String search,
            @AuthenticationPrincipal UserPrincipal currentUser
    ) {
        Long userId = currentUser != null ? currentUser.getId() : null;

        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(itemService.searchItems(search, status, userId));
        }
        return ResponseEntity.ok(itemService.getAllItems(status, userId));
    }

    @GetMapping("/found-by/{userId}")
    public ResponseEntity<List<ItemResponseShort>> getItemsFoundByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(itemService.getItemsFoundByUser(userId));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ItemResponse> createItem(
            @RequestBody ItemRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(itemService.createItem(request, currentUser.getId()));
    }

    @DeleteMapping("/{itemId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Void> deleteItem(
            @PathVariable Long itemId,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        itemService.deleteItem(itemId, currentUser.getId());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("{itemId}/toggle")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ItemResponse> toggleItemStatus(
            @PathVariable Long itemId,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        Long userId = currentUser != null ? currentUser.getId() : null;
        return ResponseEntity.ok(itemService.toggleItemStatus(itemId, userId));
    }
}
