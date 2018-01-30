package com.ifuture.haipin.web.rest;

import com.ifuture.haipin.security.SecurityUtils;
import com.ifuture.haipin.service.UploadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by wuyongchong on 2017/7/14.
 */
@RestController
@RequestMapping("/api")
public class UploaderResource {
    private final Logger log = LoggerFactory.getLogger(UploaderResource.class);

    @Autowired
    private UploadService uploadService;

    @Autowired
    private HttpServletRequest request;

    @PostMapping("/uploader")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) throws Exception {
        String uploadPath =  request.getServletContext().getRealPath("/uploads/resume/"+ SecurityUtils.getCurrentUserLogin());
        uploadService.withBaseLocation(uploadPath);
        uploadService.uploadFile(file);
        return ResponseEntity.ok().build();
    }

}
