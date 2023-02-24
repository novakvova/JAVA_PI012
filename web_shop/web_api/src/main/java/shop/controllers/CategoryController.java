package shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CategoryUpdateDTO;
import shop.entities.CategoryEntity;
import shop.mapper.CategoryMapper;
import shop.repositories.CategoryRepository;
import shop.storage.StorageService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final StorageService storageService;

    @GetMapping
    public ResponseEntity<List<CategoryItemDTO>> index() {
        var data = categoryRepository.findAll();
        var list = categoryMapper.categoryItemDTOList(data);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<CategoryEntity> create(CategoryCreateDTO model) {
        var file = storageService.save(model.getBase64());
        var category = categoryMapper.categoryEntityByCategoryCreateDTO(model);
        category.setImage(file);
        categoryRepository.save(category);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<CategoryEntity> getCagegoryById(@PathVariable("id") int categoryId) {
        var categoryOptinal = categoryRepository.findById(categoryId);
        if(categoryOptinal.isPresent())
        {
            return new ResponseEntity<>(categoryOptinal.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    @PutMapping("{id}")
    public ResponseEntity<CategoryEntity> update(@PathVariable("id") int categoryId,
                                                 @RequestBody CategoryUpdateDTO model) {
        var categoryOptinal = categoryRepository.findById(categoryId);
        if(categoryOptinal.isPresent())
        {
            var category = categoryOptinal.get();
            category.setName(model.getName());
            categoryRepository.save(category);
            return new ResponseEntity<>(category, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int categoryId) {
        categoryRepository.deleteById(categoryId);
        return new ResponseEntity<>("Катагорія знищена.", HttpStatus.OK);
    }
}
