package com.ifuture.haipin.repository;

import com.ifuture.haipin.domain.ResumeSetting;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResumeSetting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResumeSettingRepository extends JpaRepository<ResumeSetting,Long> {

    ResumeSetting findTopByUserId(Long userId);
}
