package com.ifuture.haipin.repository;

import com.ifuture.haipin.domain.ResumeShowcase;
import java.util.List;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResumeShowcase entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResumeShowcaseRepository extends JpaRepository<ResumeShowcase,Long> {

    List<ResumeShowcase> findByResumeId(Long resumeId);
}
