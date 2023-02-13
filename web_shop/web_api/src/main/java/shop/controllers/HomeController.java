package shop.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import shop.dto.CategoryDTO;

import java.util.ArrayList;
import java.util.List;

@RestController
public class HomeController {
    private static List<CategoryDTO> categoryDTOList = new ArrayList<>();
    @GetMapping("/")
    public List<CategoryDTO> index() {
        categoryDTOList.add(new CategoryDTO("Сало"));
        return categoryDTOList;
    }
}
