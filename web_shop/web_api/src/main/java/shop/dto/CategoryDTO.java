package shop.dto;

import lombok.Data;

@Data
public class CategoryDTO {
    private int id;
    private String name;

    public CategoryDTO(String name) {
        this.name = name;
    }
}
