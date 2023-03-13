package com.example.CarForU.repository;

import com.example.CarForU.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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
}
