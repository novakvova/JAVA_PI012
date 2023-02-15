package shop.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import shop.dto.CategoryDTO;
import shop.entities.CategoryEntity;
import shop.repositories.CategoryRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class HomeController {
    //private static List<CategoryDTO> categoryDTOList = new ArrayList<>();
    private final CategoryRepository categoryRepository;
    @GetMapping("/")
    public List<CategoryEntity> index() {
        //categoryDTOList.add(new CategoryDTO("Сало"));
        return categoryRepository.findAll();
    }
}
