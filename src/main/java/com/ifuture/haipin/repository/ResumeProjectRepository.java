package com.ifuture.haipin.repository;

import com.ifuture.haipin.domain.ResumeProject;
import java.util.List;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResumeProject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResumeProjectRepository extends JpaRepository<ResumeProject,Long> {

    List<ResumeProject> findByResumeId(Long resumeId);
}
