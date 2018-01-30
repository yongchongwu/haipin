package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ifuture.haipin.domain.ResumeWork;

import com.ifuture.haipin.repository.ResumeWorkRepository;
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
 * REST controller for managing ResumeWork.
 */
@RestController
@RequestMapping("/api")
public class ResumeWorkResource {

    private final Logger log = LoggerFactory.getLogger(ResumeWorkResource.class);

    private static final String ENTITY_NAME = "resumeWork";

    private final ResumeWorkRepository resumeWorkRepository;

    public ResumeWorkResource(ResumeWorkRepository resumeWorkRepository) {
        this.resumeWorkRepository = resumeWorkRepository;
    }

    /**
     * POST  /resume/works : Create a new resumeWork.
     *
     * @param resumeWork the resumeWork to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resumeWork, or with status 400 (Bad Request) if the resumeWork has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resume/works")
    @Timed
    public ResponseEntity<ResumeWork> createResumeWork(@Valid @RequestBody ResumeWork resumeWork) throws URISyntaxException {
        log.debug("REST request to save ResumeWork : {}", resumeWork);
        if (resumeWork.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new resumeWork cannot already have an ID")).body(null);
        }
        ResumeWork result = resumeWorkRepository.save(resumeWork);
        return ResponseEntity.created(new URI("/api/resume/works/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resume/works : Updates an existing resumeWork.
     *
     * @param resumeWork the resumeWork to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resumeWork,
     * or with status 400 (Bad Request) if the resumeWork is not valid,
     * or with status 500 (Internal Server Error) if the resumeWork couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resume/works")
    @Timed
    public ResponseEntity<ResumeWork> updateResumeWork(@Valid @RequestBody ResumeWork resumeWork) throws URISyntaxException {
        log.debug("REST request to update ResumeWork : {}", resumeWork);
        if (resumeWork.getId() == null) {
            return createResumeWork(resumeWork);
        }
        ResumeWork result = resumeWorkRepository.save(resumeWork);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resumeWork.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resume/works : get all the resumeWorks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resumeWorks in body
     */
    @GetMapping("/resume/works")
    @Timed
    public List<ResumeWork> getAllResumeWorks() {
        log.debug("REST request to get all ResumeWorks");
        return resumeWorkRepository.findAll();
    }

    /**
     * GET  /resume/works/:id : get the "id" resumeWork.
     *
     * @param id the id of the resumeWork to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resumeWork, or with status 404 (Not Found)
     */
    @GetMapping("/resume/works/{id}")
    @Timed
    public ResponseEntity<ResumeWork> getResumeWork(@PathVariable Long id) {
        log.debug("REST request to get ResumeWork : {}", id);
        ResumeWork resumeWork = resumeWorkRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resumeWork));
    }

    /**
     * DELETE  /resume/works/:id : delete the "id" resumeWork.
     *
     * @param id the id of the resumeWork to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resume/works/{id}")
    @Timed
    public ResponseEntity<Void> deleteResumeWork(@PathVariable Long id) {
        log.debug("REST request to delete ResumeWork : {}", id);
        resumeWorkRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
