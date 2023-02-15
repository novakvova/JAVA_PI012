package shop.entities;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="tbl_categories")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 500, nullable = false)
    private String name;
}
