package com.ifuture.haipin.repository;

import com.ifuture.haipin.domain.ResumeWork;
import java.util.List;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResumeWork entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResumeWorkRepository extends JpaRepository<ResumeWork,Long> {

    List<ResumeWork> findByResumeId(Long resumeId);
}
