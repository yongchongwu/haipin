package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ifuture.haipin.domain.ResumeProject;

import com.ifuture.haipin.repository.ResumeProjectRepository;
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
 * REST controller for managing ResumeProject.
 */
@RestController
@RequestMapping("/api")
public class ResumeProjectResource {

    private final Logger log = LoggerFactory.getLogger(ResumeProjectResource.class);

    private static final String ENTITY_NAME = "resumeProject";

    private final ResumeProjectRepository resumeProjectRepository;

    public ResumeProjectResource(ResumeProjectRepository resumeProjectRepository) {
        this.resumeProjectRepository = resumeProjectRepository;
    }

    /**
     * POST  /resume/projects : Create a new resumeProject.
     *
     * @param resumeProject the resumeProject to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resumeProject, or with status 400 (Bad Request) if the resumeProject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resume/projects")
    @Timed
    public ResponseEntity<ResumeProject> createResumeProject(@Valid @RequestBody ResumeProject resumeProject) throws URISyntaxException {
        log.debug("REST request to save ResumeProject : {}", resumeProject);
        if (resumeProject.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new resumeProject cannot already have an ID")).body(null);
        }
        ResumeProject result = resumeProjectRepository.save(resumeProject);
        return ResponseEntity.created(new URI("/api/resume/projects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resume/projects : Updates an existing resumeProject.
     *
     * @param resumeProject the resumeProject to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resumeProject,
     * or with status 400 (Bad Request) if the resumeProject is not valid,
     * or with status 500 (Internal Server Error) if the resumeProject couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resume/projects")
    @Timed
    public ResponseEntity<ResumeProject> updateResumeProject(@Valid @RequestBody ResumeProject resumeProject) throws URISyntaxException {
        log.debug("REST request to update ResumeProject : {}", resumeProject);
        if (resumeProject.getId() == null) {
            return createResumeProject(resumeProject);
        }
        ResumeProject result = resumeProjectRepository.save(resumeProject);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resumeProject.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resume/projects : get all the resumeProjects.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resumeProjects in body
     */
    @GetMapping("/resume/projects")
    @Timed
    public List<ResumeProject> getAllResumeProjects() {
        log.debug("REST request to get all ResumeProjects");
        return resumeProjectRepository.findAll();
    }

    /**
     * GET  /resume/projects/:id : get the "id" resumeProject.
     *
     * @param id the id of the resumeProject to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resumeProject, or with status 404 (Not Found)
     */
    @GetMapping("/resume/projects/{id}")
    @Timed
    public ResponseEntity<ResumeProject> getResumeProject(@PathVariable Long id) {
        log.debug("REST request to get ResumeProject : {}", id);
        ResumeProject resumeProject = resumeProjectRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resumeProject));
    }

    /**
     * DELETE  /resume/projects/:id : delete the "id" resumeProject.
     *
     * @param id the id of the resumeProject to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resume/projects/{id}")
    @Timed
    public ResponseEntity<Void> deleteResumeProject(@PathVariable Long id) {
        log.debug("REST request to delete ResumeProject : {}", id);
        resumeProjectRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
