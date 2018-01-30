package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DemoResource {

    private final Logger log = LoggerFactory.getLogger(DemoResource.class);

    @GetMapping("/demos/test")
    @Timed
    public ResponseEntity<String> test() throws IOException {
        log.debug("REST request to test demos");

        return ResponseEntity.ok().body("ok");
    }
}
