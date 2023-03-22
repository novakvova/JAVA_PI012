package shop.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="tbl_user_roles")
@IdClass(UserRolePK.class)
public class UserRoleEntity {
    @Id
    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private UserEntity user;
    @Id
    @ManyToOne
    @JoinColumn(name="role_id", nullable = false)
    private RoleEntity role;
}
