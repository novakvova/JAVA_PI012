package shop.dto.category;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryCreateDTO {
    @NotEmpty
    @Size(min = 2, message = "мінімальний розмір імені 2 символа")
    private String name;
    private String base64;
    private String description;
}
