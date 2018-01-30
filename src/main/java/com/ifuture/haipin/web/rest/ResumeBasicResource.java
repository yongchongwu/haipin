package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ifuture.haipin.domain.ResumeBasic;

import com.ifuture.haipin.domain.User;
import com.ifuture.haipin.repository.ResumeBasicRepository;
import com.ifuture.haipin.security.SecurityUtils;
import com.ifuture.haipin.service.UploadService;
import com.ifuture.haipin.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.io.File;
import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.io.FileUtils;
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
 * REST controller for managing ResumeBasic.
 */
@RestController
@RequestMapping("/api")
public class ResumeBasicResource {

    private final Logger log = LoggerFactory.getLogger(ResumeBasicResource.class);

    private static final String ENTITY_NAME = "resumeBasic";

    @Autowired
    private UploadService uploadService;

    @Autowired
    private HttpServletRequest request;

    private final ResumeBasicRepository resumeBasicRepository;

    public ResumeBasicResource(ResumeBasicRepository resumeBasicRepository) {
        this.resumeBasicRepository = resumeBasicRepository;
    }

    /**
     * POST  /resume/basics : Create a new resumeBasic.
     *
     * @param resumeBasic the resumeBasic to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resumeBasic, or with
     * status 400 (Bad Request) if the resumeBasic has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resume/basics")
    @Timed
    public ResponseEntity<ResumeBasic> createResumeBasic(
        @Valid @RequestBody ResumeBasic resumeBasic) throws URISyntaxException {
        log.debug("REST request to save ResumeBasic : {}", resumeBasic);
        if (resumeBasic.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil
                .createFailureAlert(ENTITY_NAME, "idexists",
                    "A new resumeBasic cannot already have an ID")).body(null);
        }
        resumeBasic.setUserId(SecurityUtils.getCurrentUserId());

        resumeBasic.setResumeName(resumeBasic.getName()+"的简历");
        resumeBasic.setResumeKey(UUID.randomUUID().toString().replace("-",""));

        resumeBasic.setStatus(1);

        resumeBasic.setCreateTime(ZonedDateTime.now());

        resumeBasic.setUpdateTime(null);

        ResumeBasic result = resumeBasicRepository.save(resumeBasic);
        return ResponseEntity.created(new URI("/api/resume/basics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resume/basics : Updates an existing resumeBasic.
     *
     * @param resumeBasic the resumeBasic to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resumeBasic, or with
     * status 400 (Bad Request) if the resumeBasic is not valid, or with status 500 (Internal Server
     * Error) if the resumeBasic couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resume/basics")
    @Timed
    public ResponseEntity<ResumeBasic> updateResumeBasic(
        @Valid @RequestBody ResumeBasic resumeBasic) throws URISyntaxException {
        log.debug("REST request to update ResumeBasic : {}", resumeBasic);
        if (resumeBasic.getId() == null) {
            return createResumeBasic(resumeBasic);
        }

        if(null==resumeBasic.getUserId()){
            resumeBasic.setUserId(SecurityUtils.getCurrentUserId());
        }

        resumeBasic.setResumeName(resumeBasic.getName()+"的简历");

        resumeBasic.setUpdateTime(ZonedDateTime.now());


        if(StringUtils.isNotBlank(resumeBasic.getBirthYear())&&StringUtils.isNotBlank(resumeBasic.getBirthMonth())){
            resumeBasic.setBirthDay(resumeBasic.getBirthYear()+"."+resumeBasic.getBirthMonth());
        }

        ResumeBasic result = resumeBasicRepository.save(resumeBasic);
        return ResponseEntity.ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resumeBasic.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resume/basics : get all the resumeBasics.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resumeBasics in body
     */
    @GetMapping("/resume/basics")
    @Timed
    public List<ResumeBasic> getAllResumeBasics() {
        log.debug("REST request to get all ResumeBasics");
        return resumeBasicRepository.findAll();
    }

    /**
     * GET  /resume/basics/:id : get the "id" resumeBasic.
     *
     * @param id the id of the resumeBasic to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resumeBasic, or with status
     * 404 (Not Found)
     */
    @GetMapping("/resume/basics/{id}")
    @Timed
    public ResponseEntity<ResumeBasic> getResumeBasic(@PathVariable Long id) {
        log.debug("REST request to get ResumeBasic : {}", id);
        ResumeBasic resumeBasic = resumeBasicRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resumeBasic));
    }

    /**
     * DELETE  /resume/basics/:id : delete the "id" resumeBasic.
     *
     * @param id the id of the resumeBasic to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resume/basics/{id}")
    @Timed
    public ResponseEntity<Void> deleteResumeBasic(@PathVariable Long id) {
        log.debug("REST request to delete ResumeBasic : {}", id);
        resumeBasicRepository.delete(id);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * upload resume headPic
     *
     * @return the ResponseEntity with status 200 (OK)
     */
    @PostMapping("/resume/basics/upload")
    public ResponseEntity<String> uploadHeadPic(
        @RequestParam(value = "resume_id", required = true) Long resume_id,
        @RequestParam(value = "headPic", required = true) MultipartFile headPic) {

        if (headPic.isEmpty()) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME,
                "headPic", "must select a file to upload")).body(null);
        }
        ResumeBasic resumeBasic=resumeBasicRepository.findOne(resume_id);
        if(null==resumeBasic){
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME,
                "resumeBasic", "not found the resume info")).body(null);
        }

        String rootPath=request.getServletContext().getRealPath("/");
        String uploadDir = "uploads/resume/headpics/"+resume_id;

        String result="";
        try {
            uploadService.withBaseLocation(rootPath+"/"+uploadDir);
            String file_name=uploadService.uploadFile(headPic);
            result=uploadDir+"/"+file_name;

            String oldPic=resumeBasic.getHeadPic();
            if(StringUtils.isNotBlank(oldPic)){
                File oldFile=new File(rootPath+"/"+oldPic);
                if(oldFile.exists()){
                    oldFile.delete();
                }
            }

            resumeBasic.setHeadPic(result);

            resumeBasicRepository.save(resumeBasic);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().body(result);
    }

}
