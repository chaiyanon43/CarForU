package com.example.CarForU.repository;

import com.example.CarForU.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(
            value = "SELECT u FROM User u WHERE u.userId =:userId")
    User findUserById(@Param("userId") int userId);
    @Query(
            value = "SELECT u FROM User u WHERE u.username =:username")
    User findUserByUsernameForProfile(@Param("username") String username);
    @Query(
            value = "SELECT u FROM User u WHERE u.username =:username")
    Optional<User> findUserByUsername(@Param("username") String username);
    @Modifying
    @Transactional
    @Query(value = "update User u set u.username=:username, u.name=:name,u.phoneNumber=:phoneNumber,u.address=:address,u.image=:image where u.userId=:userId")
    void updateUser(@Param("username") String username,
                    @Param("name") String name,
                    @Param("phoneNumber") String phoneNumber,
                    @Param("address") String address,
                    @Param("image") String image,
                    @Param("userId") int userId);
    @Modifying
    @Transactional
    @Query(value = "update User u set u.username=:username, u.name=:name,u.phoneNumber=:phoneNumber,u.address=:address where u.userId=:userId")
    void updateUserWithOutImage(@Param("username") String username,
                    @Param("name") String name,
                    @Param("phoneNumber") String phoneNumber,
                    @Param("address") String address,
                    @Param("userId") int userId);
}
