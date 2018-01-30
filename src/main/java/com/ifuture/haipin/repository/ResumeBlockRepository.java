package com.ifuture.haipin.repository;

import com.ifuture.haipin.domain.ResumeBlock;
import java.util.List;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResumeBlock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResumeBlockRepository extends JpaRepository<ResumeBlock,Long> {

    List<ResumeBlock> findByResumeId(Long resumeId);
}
