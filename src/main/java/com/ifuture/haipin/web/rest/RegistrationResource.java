package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ifuture.haipin.domain.Registration;
import com.ifuture.haipin.repository.RegistrationRepository;
import com.ifuture.haipin.service.UploadService;
import com.ifuture.haipin.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * REST controller for managing Registration.
 */
@RestController
@RequestMapping("/api")
public class RegistrationResource {

    private final Logger log = LoggerFactory.getLogger(RegistrationResource.class);

    private static final String ENTITY_NAME = "registration";

    private final RegistrationRepository registrationRepository;

    @Autowired
    private UploadService uploadService;

    @Autowired
    private HttpServletRequest request;

    public RegistrationResource(RegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    /**
     * POST  /registrations : Create a new registration.
     *
     * @return the ResponseEntity with status 201 (Created) and with body the new registration, or
     * with status 400 (Bad Request) if the registration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping(value = "/registrations")
    @Timed
    public ResponseEntity<Registration> createRegistration(
        @RequestPart("registration") Registration registration,
        @RequestPart("resume_file") MultipartFile resume_file)
        throws URISyntaxException, IOException {

        //ObjectMapper objectMapper = new ObjectMapper();
        //Registration registration = objectMapper.readValue(jsonStr, Registration.class);

        if (registration.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME,
                "idexists", "A new registration cannot already have an ID")).body(null);
        }

        if (resume_file.isEmpty()) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME,
                "resume_file", "must select a file to upload")).body(null);
        }
        String uploadDir = "uploads/resume/registrations/"+registration.getRecruitmentUuid();
        String file_name = "";
        try {
            uploadService.withBaseLocation(request.getServletContext().getRealPath("/")+"/"+uploadDir);
            file_name = uploadService.uploadFile(resume_file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        registration.setResumeUrl(uploadDir + "/" + file_name);

        Registration result = registrationRepository.save(registration);

        return ResponseEntity.created(new URI("/api/registrations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /registrations : Updates an existing registration.
     *
     * @param registration the registration to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated registration, or with
     * status 400 (Bad Request) if the registration is not valid, or with status 500 (Internal Server
     * Error) if the registration couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/registrations")
    @Timed
    public ResponseEntity<Registration> updateRegistration(
        @Valid @RequestBody Registration registration) throws URISyntaxException {
        log.debug("REST request to update Registration : {}", registration);
        if (registration.getId() == null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME,
                "idexists", "Update a registration must have an ID")).body(null);
        }
        Registration result = registrationRepository.save(registration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, registration.getId()
                .toString()))
            .body(result);
    }

    /**
     * GET  /registrations : get all the registrations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of registrations in body
     */
    @GetMapping("/registrations")
    @Timed
    public List<Registration> getAllRegistrations() {
        log.debug("REST request to get all Registrations");
        return registrationRepository.findAll();
    }

    /**
     * GET  /registrations/:id : get the "id" registration.
     *
     * @param id the id of the registration to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the registration, or with status
     * 404 (Not Found)
     */
    @GetMapping("/registrations/{id}")
    @Timed
    public ResponseEntity<Registration> getRegistration(@PathVariable Long id) {
        log.debug("REST request to get Registration : {}", id);
        Registration registration = registrationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(registration));
    }

    /**
     * DELETE  /registrations/:id : delete the "id" registration.
     *
     * @param id the id of the registration to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/registrations/{id}")
    @Timed
    public ResponseEntity<Void> deleteRegistration(@PathVariable Long id) {
        log.debug("REST request to delete Registration : {}", id);
        registrationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id
            .toString())).build();
    }
}
