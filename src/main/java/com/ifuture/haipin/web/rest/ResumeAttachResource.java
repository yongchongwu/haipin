package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ifuture.haipin.domain.ResumeAttach;

import com.ifuture.haipin.repository.ResumeAttachRepository;
import com.ifuture.haipin.security.SecurityUtils;
import com.ifuture.haipin.service.UploadService;
import com.ifuture.haipin.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.io.File;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;

/**
 * REST controller for managing ResumeAttach.
 */
@RestController
@RequestMapping("/api")
public class ResumeAttachResource {

    private final Logger log = LoggerFactory.getLogger(ResumeAttachResource.class);

    private static final String ENTITY_NAME = "resumeAttach";

    private final ResumeAttachRepository resumeAttachRepository;

    @Autowired
    private UploadService uploadService;

    @Autowired
    private HttpServletRequest request;

    public ResumeAttachResource(ResumeAttachRepository resumeAttachRepository) {
        this.resumeAttachRepository = resumeAttachRepository;
    }

    /**
     * POST  /resume/attaches : Create a new resumeAttach.
     *
     * @param resumeAttach the resumeAttach to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resumeAttach, or
     * with status 400 (Bad Request) if the resumeAttach has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resume/attaches")
    @Timed
    public ResponseEntity<ResumeAttach> createResumeAttach(
        @Valid @RequestBody ResumeAttach resumeAttach) throws URISyntaxException {
        log.debug("REST request to save ResumeAttach : {}", resumeAttach);
        if (resumeAttach.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil
                .createFailureAlert(ENTITY_NAME, "idexists",
                    "A new resumeAttach cannot already have an ID")).body(null);
        }

        ResumeAttach result = resumeAttachRepository.save(resumeAttach);
        return ResponseEntity.created(new URI("/api/resume/attaches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resume/attaches : Updates an existing resumeAttach.
     *
     * @param resumeAttach the resumeAttach to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resumeAttach, or with
     * status 400 (Bad Request) if the resumeAttach is not valid, or with status 500 (Internal Server
     * Error) if the resumeAttach couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resume/attaches")
    @Timed
    public ResponseEntity<ResumeAttach> updateResumeAttach(
        @Valid @RequestBody ResumeAttach resumeAttach) throws URISyntaxException {
        log.debug("REST request to update ResumeAttach : {}", resumeAttach);
        if (resumeAttach.getId() == null) {
            return createResumeAttach(resumeAttach);
        }
        ResumeAttach result = resumeAttachRepository.save(resumeAttach);
        return ResponseEntity.ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resumeAttach.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resume/attaches : get all the resumeAttaches.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resumeAttaches in body
     */
    @GetMapping("/resume/attaches")
    @Timed
    public List<ResumeAttach> getAllResumeAttaches() {
        log.debug("REST request to get all ResumeAttaches");
        return resumeAttachRepository.findAll();
    }

    /**
     * GET  /resume/attaches/:id : get the "id" resumeAttach.
     *
     * @param id the id of the resumeAttach to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resumeAttach, or with status
     * 404 (Not Found)
     */
    @GetMapping("/resume/attaches/{id}")
    @Timed
    public ResponseEntity<ResumeAttach> getResumeAttach(@PathVariable Long id) {
        log.debug("REST request to get ResumeAttach : {}", id);
        ResumeAttach resumeAttach = resumeAttachRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resumeAttach));
    }

    /**
     * DELETE  /resume/attaches/:id : delete the "id" resumeAttach.
     *
     * @param id the id of the resumeAttach to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resume/attaches/{id}")
    @Timed
    public ResponseEntity<Void> deleteResumeAttach(@PathVariable Long id) {
        log.debug("REST request to delete ResumeAttach : {}", id);
        if (resumeAttachRepository.exists(id)) {
            ResumeAttach resumeAttach = resumeAttachRepository.findOne(id);
            if (!resumeAttach.getUserId().equals(SecurityUtils.getCurrentUserId())) {
                return ResponseEntity.badRequest().build();
            }
            String rootPath = request.getServletContext().getRealPath("/");
            if (StringUtils.isNotBlank(resumeAttach.getAttachUrl())) {
                File oldFile = new File(rootPath + "/" + resumeAttach.getAttachUrl());
                if (oldFile.exists()) {
                    oldFile.delete();
                }
            }
            resumeAttachRepository.delete(resumeAttach);
        } else {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @PostMapping("/resume/attaches/upload")
    public ResponseEntity<ResumeAttach> uploadResumeAttach(
        @RequestParam(value = "attach_file", required = true) MultipartFile attach_file)
        throws URISyntaxException {

        if (attach_file.isEmpty()) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME,
                "headPic", "must select a file to upload")).body(null);
        }
        Long userId = SecurityUtils.getCurrentUserId();

        String rootPath = request.getServletContext().getRealPath("/");
        String uploadDir = "uploads/resume/attaches/" + userId;

        String attach_url = "";
        try {
            ResumeAttach resumeAttach = new ResumeAttach();
            resumeAttach.setAttachName(attach_file.getOriginalFilename());

            uploadService.withBaseLocation(rootPath + "/" + uploadDir);
            String file_name = uploadService.uploadFile(attach_file);
            attach_url = uploadDir + "/" + file_name;

            resumeAttach.setAttachUrl(attach_url);
            resumeAttach.setUserId(userId);

            return createResumeAttach(resumeAttach);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }

}
