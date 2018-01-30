package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ifuture.haipin.domain.ResumeBlock;

import com.ifuture.haipin.repository.ResumeBlockRepository;
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
 * REST controller for managing ResumeBlock.
 */
@RestController
@RequestMapping("/api")
public class ResumeBlockResource {

    private final Logger log = LoggerFactory.getLogger(ResumeBlockResource.class);

    private static final String ENTITY_NAME = "resumeBlock";

    private final ResumeBlockRepository resumeBlockRepository;

    public ResumeBlockResource(ResumeBlockRepository resumeBlockRepository) {
        this.resumeBlockRepository = resumeBlockRepository;
    }

    /**
     * POST  /resume/blocks : Create a new resumeBlock.
     *
     * @param resumeBlock the resumeBlock to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resumeBlock, or with status 400 (Bad Request) if the resumeBlock has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resume/blocks")
    @Timed
    public ResponseEntity<ResumeBlock> createResumeBlock(@Valid @RequestBody ResumeBlock resumeBlock) throws URISyntaxException {
        log.debug("REST request to save ResumeBlock : {}", resumeBlock);
        if (resumeBlock.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new resumeBlock cannot already have an ID")).body(null);
        }
        ResumeBlock result = resumeBlockRepository.save(resumeBlock);
        return ResponseEntity.created(new URI("/api/resume/blocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resume/blocks : Updates an existing resumeBlock.
     *
     * @param resumeBlock the resumeBlock to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resumeBlock,
     * or with status 400 (Bad Request) if the resumeBlock is not valid,
     * or with status 500 (Internal Server Error) if the resumeBlock couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resume/blocks")
    @Timed
    public ResponseEntity<ResumeBlock> updateResumeBlock(@Valid @RequestBody ResumeBlock resumeBlock) throws URISyntaxException {
        log.debug("REST request to update ResumeBlock : {}", resumeBlock);
        if (resumeBlock.getId() == null) {
            return createResumeBlock(resumeBlock);
        }
        ResumeBlock result = resumeBlockRepository.save(resumeBlock);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resumeBlock.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resume/blocks : get all the resumeBlocks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resumeBlocks in body
     */
    @GetMapping("/resume/blocks")
    @Timed
    public List<ResumeBlock> getAllResumeBlocks() {
        log.debug("REST request to get all ResumeBlocks");
        return resumeBlockRepository.findAll();
    }

    /**
     * GET  /resume/blocks/:id : get the "id" resumeBlock.
     *
     * @param id the id of the resumeBlock to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resumeBlock, or with status 404 (Not Found)
     */
    @GetMapping("/resume/blocks/{id}")
    @Timed
    public ResponseEntity<ResumeBlock> getResumeBlock(@PathVariable Long id) {
        log.debug("REST request to get ResumeBlock : {}", id);
        ResumeBlock resumeBlock = resumeBlockRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resumeBlock));
    }

    /**
     * DELETE  /resume/blocks/:id : delete the "id" resumeBlock.
     *
     * @param id the id of the resumeBlock to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resume/blocks/{id}")
    @Timed
    public ResponseEntity<Void> deleteResumeBlock(@PathVariable Long id) {
        log.debug("REST request to delete ResumeBlock : {}", id);
        resumeBlockRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
