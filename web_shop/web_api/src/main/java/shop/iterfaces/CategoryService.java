package shop.iterfaces;

import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CategoryUpdateDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryItemDTO> get();
    CategoryItemDTO create(CategoryCreateDTO model);
    CategoryItemDTO getById(int id);
    CategoryItemDTO update(int id, CategoryUpdateDTO model);
    void delete(int id);
}
