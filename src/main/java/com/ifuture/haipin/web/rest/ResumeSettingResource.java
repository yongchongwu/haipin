package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ifuture.haipin.domain.ResumeSetting;

import com.ifuture.haipin.repository.ResumeSettingRepository;
import com.ifuture.haipin.security.SecurityUtils;
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
 * REST controller for managing ResumeSetting.
 */
@RestController
@RequestMapping("/api")
public class ResumeSettingResource {

    private final Logger log = LoggerFactory.getLogger(ResumeSettingResource.class);

    private static final String ENTITY_NAME = "resumeSetting";

    private final ResumeSettingRepository resumeSettingRepository;

    public ResumeSettingResource(ResumeSettingRepository resumeSettingRepository) {
        this.resumeSettingRepository = resumeSettingRepository;
    }

    /**
     * POST  /resume/settings : Create a new resumeSetting.
     *
     * @param resumeSetting the resumeSetting to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resumeSetting, or with status 400 (Bad Request) if the resumeSetting has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resume/settings")
    @Timed
    public ResponseEntity<ResumeSetting> createResumeSetting(@Valid @RequestBody ResumeSetting resumeSetting) throws URISyntaxException {
        log.debug("REST request to save ResumeSetting : {}", resumeSetting);
        if (resumeSetting.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new resumeSetting cannot already have an ID")).body(null);
        }

        resumeSetting.setUserId(SecurityUtils.getCurrentUserId());

        ResumeSetting result = resumeSettingRepository.save(resumeSetting);
        return ResponseEntity.created(new URI("/api/resume/settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resume/settings : Updates an existing resumeSetting.
     *
     * @param resumeSetting the resumeSetting to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resumeSetting,
     * or with status 400 (Bad Request) if the resumeSetting is not valid,
     * or with status 500 (Internal Server Error) if the resumeSetting couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resume/settings")
    @Timed
    public ResponseEntity<ResumeSetting> updateResumeSetting(@Valid @RequestBody ResumeSetting resumeSetting) throws URISyntaxException {
        log.debug("REST request to update ResumeSetting : {}", resumeSetting);
        if (resumeSetting.getId() == null) {
            return createResumeSetting(resumeSetting);
        }
        if(null==resumeSetting.getUserId()){
            resumeSetting.setUserId(SecurityUtils.getCurrentUserId());
        }

        ResumeSetting result = resumeSettingRepository.save(resumeSetting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resumeSetting.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resume/settings : get all the resumeSettings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resumeSettings in body
     */
    @GetMapping("/resume/settings")
    @Timed
    public List<ResumeSetting> getAllResumeSettings() {
        log.debug("REST request to get all ResumeSettings");
        return resumeSettingRepository.findAll();
    }

    /**
     * GET  /resume/settings/:id : get the "id" resumeSetting.
     *
     * @param id the id of the resumeSetting to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resumeSetting, or with status 404 (Not Found)
     */
    @GetMapping("/resume/settings/{id}")
    @Timed
    public ResponseEntity<ResumeSetting> getResumeSetting(@PathVariable Long id) {
        log.debug("REST request to get ResumeSetting : {}", id);
        ResumeSetting resumeSetting = resumeSettingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resumeSetting));
    }

    /**
     * DELETE  /resume/settings/:id : delete the "id" resumeSetting.
     *
     * @param id the id of the resumeSetting to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resume/settings/{id}")
    @Timed
    public ResponseEntity<Void> deleteResumeSetting(@PathVariable Long id) {
        log.debug("REST request to delete ResumeSetting : {}", id);
        resumeSettingRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
