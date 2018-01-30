package com.ifuture.haipin.repository;

import com.ifuture.haipin.domain.ResumeExpect;
import java.util.List;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResumeExpect entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResumeExpectRepository extends JpaRepository<ResumeExpect,Long> {

    List<ResumeExpect> findByResumeId(Long resumeId);
}
