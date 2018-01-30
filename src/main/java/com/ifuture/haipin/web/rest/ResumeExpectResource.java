package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ifuture.haipin.domain.ResumeExpect;

import com.ifuture.haipin.repository.ResumeExpectRepository;
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
 * REST controller for managing ResumeExpect.
 */
@RestController
@RequestMapping("/api")
public class ResumeExpectResource {

    private final Logger log = LoggerFactory.getLogger(ResumeExpectResource.class);

    private static final String ENTITY_NAME = "resumeExpect";

    private final ResumeExpectRepository resumeExpectRepository;

    public ResumeExpectResource(ResumeExpectRepository resumeExpectRepository) {
        this.resumeExpectRepository = resumeExpectRepository;
    }

    /**
     * POST  /resume/expects : Create a new resumeExpect.
     *
     * @param resumeExpect the resumeExpect to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resumeExpect, or with status 400 (Bad Request) if the resumeExpect has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resume/expects")
    @Timed
    public ResponseEntity<ResumeExpect> createResumeExpect(@Valid @RequestBody ResumeExpect resumeExpect) throws URISyntaxException {
        log.debug("REST request to save ResumeExpect : {}", resumeExpect);
        if (resumeExpect.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new resumeExpect cannot already have an ID")).body(null);
        }
        ResumeExpect result = resumeExpectRepository.save(resumeExpect);
        return ResponseEntity.created(new URI("/api/resume/expects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resume/expects : Updates an existing resumeExpect.
     *
     * @param resumeExpect the resumeExpect to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resumeExpect,
     * or with status 400 (Bad Request) if the resumeExpect is not valid,
     * or with status 500 (Internal Server Error) if the resumeExpect couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resume/expects")
    @Timed
    public ResponseEntity<ResumeExpect> updateResumeExpect(@Valid @RequestBody ResumeExpect resumeExpect) throws URISyntaxException {
        log.debug("REST request to update ResumeExpect : {}", resumeExpect);
        if (resumeExpect.getId() == null) {
            return createResumeExpect(resumeExpect);
        }
        ResumeExpect result = resumeExpectRepository.save(resumeExpect);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resumeExpect.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resume/expects : get all the resumeExpects.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resumeExpects in body
     */
    @GetMapping("/resume/expects")
    @Timed
    public List<ResumeExpect> getAllResumeExpects() {
        log.debug("REST request to get all ResumeExpects");
        return resumeExpectRepository.findAll();
    }

    /**
     * GET  /resume/expects/:id : get the "id" resumeExpect.
     *
     * @param id the id of the resumeExpect to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resumeExpect, or with status 404 (Not Found)
     */
    @GetMapping("/resume/expects/{id}")
    @Timed
    public ResponseEntity<ResumeExpect> getResumeExpect(@PathVariable Long id) {
        log.debug("REST request to get ResumeExpect : {}", id);
        ResumeExpect resumeExpect = resumeExpectRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resumeExpect));
    }

    /**
     * DELETE  /resume/expects/:id : delete the "id" resumeExpect.
     *
     * @param id the id of the resumeExpect to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resume/expects/{id}")
    @Timed
    public ResponseEntity<Void> deleteResumeExpect(@PathVariable Long id) {
        log.debug("REST request to delete ResumeExpect : {}", id);
        resumeExpectRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
