package shop.iterfaces;

import shop.dto.category.CategoryItemDTO;
import shop.dto.product.ProductCreateDTO;
import shop.dto.product.ProductEditDTO;
import shop.dto.product.ProductItemDTO;

import java.util.List;

public interface ProductService {
    ProductItemDTO create(ProductCreateDTO model);
    ProductItemDTO edit(int id, ProductEditDTO model);
    List<ProductItemDTO> get();
    ProductItemDTO getById(int id);
    void delete(int id);
}
