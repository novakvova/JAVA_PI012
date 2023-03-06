package shop.dto.category;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CategoryCreateDTO {
    @NotEmpty
    @Size(min = 2, message = "мінімальний розмір імені 2 символа")
    private String name;
    private MultipartFile file;
    private String description;
}
