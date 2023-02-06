package program;

import models.Role;
import org.hibernate.Session;
import org.hibernate.query.Query;
import utils.HiberSessionUtil;

import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        Session context = HiberSessionUtil.getSessionFactory().openSession();
//        Role role = new Role();
//        System.out.println("Вкажіть назву ролі:");
//        String name = in.nextLine();
//        role.setName(name);
//        context.save(role);
        Query query = context.createQuery("FROM Role");
        List<Role> list = query.list();
        for (Role role : list)
            System.out.println("Role: "+ role.getName());
        context.close();
    }
}
