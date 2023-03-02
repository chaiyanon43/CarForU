package com.example.CarForU.repository;

import com.example.CarForU.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(
            value = "SELECT * FROM user u WHERE u.user_id =:userId",
            nativeQuery = true)
    User findUserById(@Param("userId") int userId);
}
