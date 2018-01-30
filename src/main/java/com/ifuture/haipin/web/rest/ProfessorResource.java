package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ifuture.haipin.service.ProfessorService;
import com.ifuture.haipin.service.dto.BucketDTO;
import com.ifuture.haipin.service.dto.ProfessorDTO;
import io.searchbox.core.SearchResult;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProfessorResource {

    private final Logger log = LoggerFactory.getLogger(ProfessorResource.class);

    @Autowired
    private ProfessorService professorService;

    @PostMapping("/professors/entry")
    @Timed
    public ResponseEntity<String> entry(@RequestBody ProfessorDTO professorDTO) throws IOException {
        log.debug("REST request to entry professors");
        SearchResult result = professorService.getProfessorsBySearch(professorDTO, true);
        return ResponseEntity.ok().body(result.getJsonString());
    }

    @PostMapping("/professors/bucket")
    @Timed
    public ResponseEntity<String> bucket(@RequestBody BucketDTO bucketDTO) throws IOException {
        log.debug("REST request to bucket aggs");
        SearchResult result = professorService.getBucketsByParent(bucketDTO);
        return ResponseEntity.ok().body(result.getJsonString());
    }

    @PostMapping("/professors/search")
    @Timed
    public ResponseEntity<String> search(@RequestBody ProfessorDTO professorDTO)
        throws IOException {
        log.debug("REST request to search professors");
        SearchResult result = professorService.getProfessorsBySearch(professorDTO, false);
        return ResponseEntity.ok().body(result.getJsonString());
    }

    @GetMapping("/professors/detail/{id}")
    @Timed
    public ResponseEntity<String> detail(@PathVariable Long id) throws IOException {
        log.debug("REST request to detail professor");
        SearchResult result = professorService.getProfessorDetailById(id);
        return ResponseEntity.ok().body(result.getJsonString());
    }
}
