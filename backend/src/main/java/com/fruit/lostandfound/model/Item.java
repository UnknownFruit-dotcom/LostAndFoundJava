package com.fruit.lostandfound.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(name = "found_at", nullable = false)
    private LocalDateTime foundAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "found_by_user_id", nullable = false)
    private User foundBy;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    public Item(String title, String description, LocalDateTime foundAt, User foundBy) {
        this.title = title;
        this.description = description;
        this.foundAt = foundAt;
        this.createdAt = LocalDateTime.now();
        this.foundBy = foundBy;
    }

    public Item(String title, String description, LocalDateTime foundAt) {
        this.title = title;
        this.description = description;
        this.foundAt = foundAt;
        this.createdAt = LocalDateTime.now();
    }
}
