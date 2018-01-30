package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ifuture.haipin.domain.ResumeEducation;

import com.ifuture.haipin.repository.ResumeEducationRepository;
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
 * REST controller for managing ResumeEducation.
 */
@RestController
@RequestMapping("/api")
public class ResumeEducationResource {

    private final Logger log = LoggerFactory.getLogger(ResumeEducationResource.class);

    private static final String ENTITY_NAME = "resumeEducation";

    private final ResumeEducationRepository resumeEducationRepository;

    public ResumeEducationResource(ResumeEducationRepository resumeEducationRepository) {
        this.resumeEducationRepository = resumeEducationRepository;
    }

    /**
     * POST  /resume/educations : Create a new resumeEducation.
     *
     * @param resumeEducation the resumeEducation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resumeEducation, or with status 400 (Bad Request) if the resumeEducation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resume/educations")
    @Timed
    public ResponseEntity<ResumeEducation> createResumeEducation(@Valid @RequestBody ResumeEducation resumeEducation) throws URISyntaxException {
        log.debug("REST request to save ResumeEducation : {}", resumeEducation);
        if (resumeEducation.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new resumeEducation cannot already have an ID")).body(null);
        }
        ResumeEducation result = resumeEducationRepository.save(resumeEducation);
        return ResponseEntity.created(new URI("/api/resume/educations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resume/educations : Updates an existing resumeEducation.
     *
     * @param resumeEducation the resumeEducation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resumeEducation,
     * or with status 400 (Bad Request) if the resumeEducation is not valid,
     * or with status 500 (Internal Server Error) if the resumeEducation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resume/educations")
    @Timed
    public ResponseEntity<ResumeEducation> updateResumeEducation(@Valid @RequestBody ResumeEducation resumeEducation) throws URISyntaxException {
        log.debug("REST request to update ResumeEducation : {}", resumeEducation);
        if (resumeEducation.getId() == null) {
            return createResumeEducation(resumeEducation);
        }
        ResumeEducation result = resumeEducationRepository.save(resumeEducation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resumeEducation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resume/educations : get all the resumeEducations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resumeEducations in body
     */
    @GetMapping("/resume/educations")
    @Timed
    public List<ResumeEducation> getAllResumeEducations() {
        log.debug("REST request to get all ResumeEducations");
        return resumeEducationRepository.findAll();
    }

    /**
     * GET  /resume/educations/:id : get the "id" resumeEducation.
     *
     * @param id the id of the resumeEducation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resumeEducation, or with status 404 (Not Found)
     */
    @GetMapping("/resume/educations/{id}")
    @Timed
    public ResponseEntity<ResumeEducation> getResumeEducation(@PathVariable Long id) {
        log.debug("REST request to get ResumeEducation : {}", id);
        ResumeEducation resumeEducation = resumeEducationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resumeEducation));
    }

    /**
     * DELETE  /resume/educations/:id : delete the "id" resumeEducation.
     *
     * @param id the id of the resumeEducation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resume/educations/{id}")
    @Timed
    public ResponseEntity<Void> deleteResumeEducation(@PathVariable Long id) {
        log.debug("REST request to delete ResumeEducation : {}", id);
        resumeEducationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
