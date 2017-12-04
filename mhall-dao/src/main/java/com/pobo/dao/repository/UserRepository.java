package com.pobo.dao.repository;

import com.pobo.dao.entity.UserEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends PagingAndSortingRepository<UserEntity, Long> {

    UserEntity findByLoginName(String loginName);
}
