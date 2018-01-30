package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ifuture.haipin.domain.ResumeIntro;

import com.ifuture.haipin.repository.ResumeIntroRepository;
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
 * REST controller for managing ResumeIntro.
 */
@RestController
@RequestMapping("/api")
public class ResumeIntroResource {

    private final Logger log = LoggerFactory.getLogger(ResumeIntroResource.class);

    private static final String ENTITY_NAME = "resumeIntro";

    private final ResumeIntroRepository resumeIntroRepository;

    public ResumeIntroResource(ResumeIntroRepository resumeIntroRepository) {
        this.resumeIntroRepository = resumeIntroRepository;
    }

    /**
     * POST  /resume/intros : Create a new resumeIntro.
     *
     * @param resumeIntro the resumeIntro to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resumeIntro, or with status 400 (Bad Request) if the resumeIntro has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resume/intros")
    @Timed
    public ResponseEntity<ResumeIntro> createResumeIntro(@Valid @RequestBody ResumeIntro resumeIntro) throws URISyntaxException {
        log.debug("REST request to save ResumeIntro : {}", resumeIntro);
        if (resumeIntro.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new resumeIntro cannot already have an ID")).body(null);
        }
        ResumeIntro result = resumeIntroRepository.save(resumeIntro);
        return ResponseEntity.created(new URI("/api/resume/intros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resume/intros : Updates an existing resumeIntro.
     *
     * @param resumeIntro the resumeIntro to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resumeIntro,
     * or with status 400 (Bad Request) if the resumeIntro is not valid,
     * or with status 500 (Internal Server Error) if the resumeIntro couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resume/intros")
    @Timed
    public ResponseEntity<ResumeIntro> updateResumeIntro(@Valid @RequestBody ResumeIntro resumeIntro) throws URISyntaxException {
        log.debug("REST request to update ResumeIntro : {}", resumeIntro);
        if (resumeIntro.getId() == null) {
            return createResumeIntro(resumeIntro);
        }
        ResumeIntro result = resumeIntroRepository.save(resumeIntro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resumeIntro.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resume/intros : get all the resumeIntros.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resumeIntros in body
     */
    @GetMapping("/resume/intros")
    @Timed
    public List<ResumeIntro> getAllResumeIntros() {
        log.debug("REST request to get all ResumeIntros");
        return resumeIntroRepository.findAll();
    }

    /**
     * GET  /resume/intros/:id : get the "id" resumeIntro.
     *
     * @param id the id of the resumeIntro to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resumeIntro, or with status 404 (Not Found)
     */
    @GetMapping("/resume/intros/{id}")
    @Timed
    public ResponseEntity<ResumeIntro> getResumeIntro(@PathVariable Long id) {
        log.debug("REST request to get ResumeIntro : {}", id);
        ResumeIntro resumeIntro = resumeIntroRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resumeIntro));
    }

    /**
     * DELETE  /resume/intros/:id : delete the "id" resumeIntro.
     *
     * @param id the id of the resumeIntro to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resume/intros/{id}")
    @Timed
    public ResponseEntity<Void> deleteResumeIntro(@PathVariable Long id) {
        log.debug("REST request to delete ResumeIntro : {}", id);
        resumeIntroRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
