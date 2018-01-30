package com.ifuture.haipin.repository;

import com.ifuture.haipin.domain.ResumeEducation;
import java.util.List;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResumeEducation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResumeEducationRepository extends JpaRepository<ResumeEducation,Long> {

    List<ResumeEducation> findByResumeId(Long resumeId);
}
