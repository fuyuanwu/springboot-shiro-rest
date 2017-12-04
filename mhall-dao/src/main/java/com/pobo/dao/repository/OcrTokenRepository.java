package com.pobo.dao.repository;

import com.pobo.dao.entity.OcrTokenEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface OcrTokenRepository extends PagingAndSortingRepository<OcrTokenEntity, Long> {
}
