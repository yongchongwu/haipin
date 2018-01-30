package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ifuture.haipin.domain.ResumeSkill;

import com.ifuture.haipin.repository.ResumeSkillRepository;
import com.ifuture.haipin.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ResumeSkill.
 */
@RestController
@RequestMapping("/api")
public class ResumeSkillResource {

    private final Logger log = LoggerFactory.getLogger(ResumeSkillResource.class);

    private static final String ENTITY_NAME = "resumeSkill";

    private final ResumeSkillRepository resumeSkillRepository;

    public ResumeSkillResource(ResumeSkillRepository resumeSkillRepository) {
        this.resumeSkillRepository = resumeSkillRepository;
    }

    /**
     * POST  /resume/skills : Create a new resumeSkill.
     *
     * @param resumeSkill the resumeSkill to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resumeSkill, or with status 400 (Bad Request) if the resumeSkill has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resume/skills")
    @Timed
    public ResponseEntity<ResumeSkill> createResumeSkill(@Valid @RequestBody ResumeSkill resumeSkill) throws URISyntaxException {
        log.debug("REST request to save ResumeSkill : {}", resumeSkill);
        if (resumeSkill.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new resumeSkill cannot already have an ID")).body(null);
        }
        ResumeSkill result = resumeSkillRepository.save(resumeSkill);
        return ResponseEntity.created(new URI("/api/resume/skills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resume/skills : Updates an existing resumeSkill.
     *
     * @param resumeSkill the resumeSkill to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resumeSkill,
     * or with status 400 (Bad Request) if the resumeSkill is not valid,
     * or with status 500 (Internal Server Error) if the resumeSkill couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resume/skills")
    @Timed
    public ResponseEntity<ResumeSkill> updateResumeSkill(@Valid @RequestBody ResumeSkill resumeSkill) throws URISyntaxException {
        log.debug("REST request to update ResumeSkill : {}", resumeSkill);
        if (resumeSkill.getId() == null) {
            return createResumeSkill(resumeSkill);
        }
        ResumeSkill result = resumeSkillRepository.save(resumeSkill);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resumeSkill.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resume/skills : get all the resumeSkills.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resumeSkills in body
     */
    @GetMapping("/resume/skills")
    @Timed
    public List<ResumeSkill> getAllResumeSkills() {
        log.debug("REST request to get all ResumeSkills");
        return resumeSkillRepository.findAll();
    }

    /**
     * GET  /resume/skills/:id : get the "id" resumeSkill.
     *
     * @param id the id of the resumeSkill to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resumeSkill, or with status 404 (Not Found)
     */
    @GetMapping("/resume/skills/{id}")
    @Timed
    public ResponseEntity<ResumeSkill> getResumeSkill(@PathVariable Long id) {
        log.debug("REST request to get ResumeSkill : {}", id);
        ResumeSkill resumeSkill = resumeSkillRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resumeSkill));
    }

    /**
     * DELETE  /resume/skills/:id : delete the "id" resumeSkill.
     *
     * @param id the id of the resumeSkill to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resume/skills/{id}")
    @Timed
    public ResponseEntity<Void> deleteResumeSkill(@PathVariable Long id) {
        log.debug("REST request to delete ResumeSkill : {}", id);
        resumeSkillRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
