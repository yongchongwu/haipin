package com.ifuture.haipin.repository;

import com.ifuture.haipin.domain.ResumeIntro;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResumeIntro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResumeIntroRepository extends JpaRepository<ResumeIntro,Long> {

    ResumeIntro findTopByResumeId(Long resumeId);
}
