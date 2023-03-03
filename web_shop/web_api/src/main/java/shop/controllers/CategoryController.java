package shop.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.category.CategoryCreateDTO;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CategoryUpdateDTO;
import shop.iterfaces.CategoryService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryItemDTO>> index() {
        return new ResponseEntity<>(categoryService.get(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<CategoryItemDTO> create(@Valid @RequestBody CategoryCreateDTO model) {
        var result = categoryService.create(model);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<CategoryItemDTO> getCagegoryById(@PathVariable("id") int categoryId) {
        var category = categoryService.getById(categoryId);
        if(category!=null)
        {
            return new ResponseEntity<>(category, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    @PutMapping("{id}")
    public ResponseEntity<CategoryItemDTO> update(@PathVariable("id") int categoryId,
                                                 @RequestBody CategoryUpdateDTO model) {
        var category = categoryService.update(categoryId, model);
        if(category!=null)
        {
            return new ResponseEntity<>(category, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int categoryId) {
        categoryService.delete(categoryId);
        return new ResponseEntity<>("Катагорія знищена.", HttpStatus.OK);
    }
}
