package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ifuture.haipin.domain.ResumeBasic;
import com.ifuture.haipin.domain.ResumeShowcase;

import com.ifuture.haipin.repository.ResumeBasicRepository;
import com.ifuture.haipin.repository.ResumeShowcaseRepository;
import com.ifuture.haipin.security.SecurityUtils;
import com.ifuture.haipin.service.UploadService;
import com.ifuture.haipin.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
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
 * REST controller for managing ResumeShowcase.
 */
@RestController
@RequestMapping("/api")
public class ResumeShowcaseResource {

    private final Logger log = LoggerFactory.getLogger(ResumeShowcaseResource.class);

    private static final String ENTITY_NAME = "resumeShowcase";

    private final ResumeShowcaseRepository resumeShowcaseRepository;

    @Autowired
    private ResumeBasicRepository resumeBasicRepository;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private UploadService uploadService;

    public ResumeShowcaseResource(ResumeShowcaseRepository resumeShowcaseRepository) {
        this.resumeShowcaseRepository = resumeShowcaseRepository;
    }

    /**
     * POST  /resume/showcases : Create a new resumeShowcase.
     *
     * @param resumeShowcase the resumeShowcase to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resumeShowcase, or
     * with status 400 (Bad Request) if the resumeShowcase has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resume/showcases")
    @Timed
    public ResponseEntity<ResumeShowcase> createResumeShowcase(
        @Valid @RequestBody ResumeShowcase resumeShowcase) throws URISyntaxException {
        log.debug("REST request to save ResumeShowcase : {}", resumeShowcase);
        if (resumeShowcase.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil
                .createFailureAlert(ENTITY_NAME, "idexists",
                    "A new resumeShowcase cannot already have an ID")).body(null);
        }
        ResumeShowcase result = resumeShowcaseRepository.save(resumeShowcase);
        return ResponseEntity.created(new URI("/api/resume/showcases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resume/showcases : Updates an existing resumeShowcase.
     *
     * @param resumeShowcase the resumeShowcase to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resumeShowcase, or
     * with status 400 (Bad Request) if the resumeShowcase is not valid, or with status 500 (Internal
     * Server Error) if the resumeShowcase couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resume/showcases")
    @Timed
    public ResponseEntity<ResumeShowcase> updateResumeShowcase(
        @Valid @RequestBody ResumeShowcase resumeShowcase) throws URISyntaxException {
        log.debug("REST request to update ResumeShowcase : {}", resumeShowcase);
        if (resumeShowcase.getId() == null) {
            return createResumeShowcase(resumeShowcase);
        }
        ResumeShowcase result = resumeShowcaseRepository.save(resumeShowcase);
        return ResponseEntity.ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resumeShowcase.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resume/showcases : get all the resumeShowcases.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resumeShowcases in body
     */
    @GetMapping("/resume/showcases")
    @Timed
    public List<ResumeShowcase> getAllResumeShowcases() {
        log.debug("REST request to get all ResumeShowcases");
        return resumeShowcaseRepository.findAll();
    }

    /**
     * GET  /resume/showcases/:id : get the "id" resumeShowcase.
     *
     * @param id the id of the resumeShowcase to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resumeShowcase, or with
     * status 404 (Not Found)
     */
    @GetMapping("/resume/showcases/{id}")
    @Timed
    public ResponseEntity<ResumeShowcase> getResumeShowcase(@PathVariable Long id) {
        log.debug("REST request to get ResumeShowcase : {}", id);
        ResumeShowcase resumeShowcase = resumeShowcaseRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resumeShowcase));
    }

    /**
     * DELETE  /resume/showcases/:id : delete the "id" resumeShowcase.
     *
     * @param id the id of the resumeShowcase to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resume/showcases/{id}")
    @Timed
    public ResponseEntity<Void> deleteResumeShowcase(@PathVariable Long id) {
        log.debug("REST request to delete ResumeShowcase : {}", id);
        resumeShowcaseRepository.delete(id);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @PostMapping("/resume/showcases/upload")
    public ResponseEntity<String> uploadImage(
        @RequestParam(value = "resume_id", required = true) Long resume_id,
        @RequestParam(value = "image_file", required = true) MultipartFile image_file)
        throws URISyntaxException {

        if (image_file.isEmpty()) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME,
                "image_file", "must select a file to upload")).body(null);
        }
        ResumeBasic resumeBasic=resumeBasicRepository.findOne(resume_id);
        if(null==resumeBasic){
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME,
                "resumeBasic", "not found the resume info")).body(null);
        }
        if(!resumeBasic.getUserId().equals(SecurityUtils.getCurrentUserId())){
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME,
                "user", "can not operate other data")).body(null);
        }
        String rootPath = request.getServletContext().getRealPath("/");
        String uploadDir = "uploads/resume/showcases/" + resume_id;

        String imageUrl="";
        try {
            uploadService.withBaseLocation(rootPath+"/"+uploadDir);
            String file_name = uploadService.uploadFile(image_file);
            imageUrl=uploadDir+"/"+file_name;

            return ResponseEntity.ok().body(imageUrl);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }

}
