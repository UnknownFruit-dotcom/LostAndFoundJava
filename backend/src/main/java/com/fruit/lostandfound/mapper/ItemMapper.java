package com.fruit.lostandfound.mapper;

import com.fruit.lostandfound.dto.request.ItemRequest;
import com.fruit.lostandfound.dto.response.ItemResponse;
import com.fruit.lostandfound.dto.response.ItemResponseShort;
import com.fruit.lostandfound.model.Item;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ItemMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "foundBy", ignore = true)
    Item toEntity(ItemRequest request);

    @Mapping(target = "isOwner", ignore = true)
    @Mapping(source = "foundBy", target = "foundBy")
    ItemResponse toResponse(Item item);

    ItemResponseShort toShortResponse(Item item);
    List<ItemResponseShort> toShortResponseList(List<Item> items);

    List<ItemResponse> toResponseList(List<Item> items);
}
