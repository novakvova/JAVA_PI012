package shop.services;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CategoryUpdateDTO;
import shop.entities.CategoryEntity;
import shop.iterfaces.CategoryService;
import shop.mapper.CategoryMapper;
import shop.repositories.CategoryRepository;
import shop.storage.StorageService;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final StorageService storageService;
    @Override
    public List<CategoryItemDTO> get() {
        var data = categoryRepository.findAll();
        var list = categoryMapper.categoryItemDTOList(data);
        return list;
    }

    @Override
    public CategoryItemDTO create(CategoryCreateDTO model) {
        var file = storageService.save(model.getBase64());
        var category = categoryMapper.categoryEntityByCategoryCreateDTO(model);
        category.setImage(file);
        categoryRepository.save(category);
        return categoryMapper.categoryItemDTO(category);
    }

    @Override
    public CategoryItemDTO getById(int id) {
        var categoryOptinal = categoryRepository.findById(id);
        if(categoryOptinal.isPresent())
        {
            var data = categoryMapper.categoryItemDTO(categoryOptinal.get());
            return data;
        }
        return null;
    }

    @Override
    public CategoryItemDTO update(int id, CategoryUpdateDTO model) {
        var categoryOptinal = categoryRepository.findById(id);
        if(categoryOptinal.isPresent())
        {
            var category = categoryOptinal.get();
            category.setName(model.getName());
            categoryRepository.save(category);
            var result = categoryMapper.categoryItemDTO(category);
            return result;
        }
        return null;
    }

    @Override
    public void delete(int id) {
        CategoryEntity category = categoryRepository.findById(id).get();
        storageService.removeFile(category.getImage());
        categoryRepository.deleteById(id);
    }
}
