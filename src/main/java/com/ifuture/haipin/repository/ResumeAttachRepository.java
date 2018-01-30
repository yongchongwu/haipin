package com.ifuture.haipin.repository;

import com.ifuture.haipin.domain.ResumeAttach;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResumeAttach entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResumeAttachRepository extends JpaRepository<ResumeAttach,Long> {

    ResumeAttach findTopByUserId(Long userId);
}
