ALTER TABLE items
    ADD is_active BOOLEAN;

ALTER TABLE items
    ALTER COLUMN is_active SET NOT NULL;