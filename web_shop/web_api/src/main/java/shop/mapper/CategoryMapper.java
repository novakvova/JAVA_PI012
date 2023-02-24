package shop.mapper;

import org.mapstruct.Mapper;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.entities.CategoryEntity;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryItemDTO categoryItemDTO(CategoryEntity category);
    List<CategoryItemDTO> categoryItemDTOList(List<CategoryEntity> categories);
    CategoryEntity categoryEntityByCategoryCreateDTO(CategoryCreateDTO category);
}
