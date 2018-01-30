package com.ifuture.haipin.repository;

import com.ifuture.haipin.domain.ResumeSkill;
import java.util.List;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResumeSkill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResumeSkillRepository extends JpaRepository<ResumeSkill,Long> {

    List<ResumeSkill> findByResumeId(Long resumeId);
}
