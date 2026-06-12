package com.fruit.lostandfound.repository;

import com.fruit.lostandfound.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByOrderByFoundAtDesc();
    List<Item> findByIsActiveTrueOrderByFoundAtDesc();
    List<Item> findByIsActiveFalseOrderByFoundAtDesc();

    List<Item> findByFoundByIdOrderByFoundAtDesc(Long userId);

    List<Item> findByTitleContainingOrDescriptionContaining(String search, String search1);
    List<Item> findByIsActiveTrueAndTitleContainingOrDescriptionContaining(String search, String search1);
    List<Item> findByIsActiveFalseAndTitleContainingOrDescriptionContaining(String search, String search1);
}
