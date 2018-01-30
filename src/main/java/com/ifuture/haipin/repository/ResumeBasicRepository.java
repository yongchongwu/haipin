package com.ifuture.haipin.repository;

import com.ifuture.haipin.domain.ResumeBasic;
import java.util.Optional;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResumeBasic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResumeBasicRepository extends JpaRepository<ResumeBasic,Long> {


    Optional<ResumeBasic> findTopByUserId(Long userId);
}
