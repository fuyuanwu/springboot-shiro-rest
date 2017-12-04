package com.pobo.dao.repository;

import com.pobo.dao.entity.CodeEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CodeRepository extends PagingAndSortingRepository<CodeEntity, Long> {
}
