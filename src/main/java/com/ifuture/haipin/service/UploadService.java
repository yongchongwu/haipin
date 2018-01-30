package com.ifuture.haipin.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Interface for upload file.
 * Created by wuyongchong on 2017/7/14.
 */
public interface UploadService {
    /**
     * set upload baseLocation
     * @param baseLocation
     * @return UploadService
     */
    UploadService withBaseLocation(String baseLocation);

    /**
     * get baseLocation
     * @return baseLocation
     */
    String getBaseLocation();
    /**
     *
     * @param file
     * @return true if the file upload success or false if the file upload failure
     * @throws IOException
     */
    String uploadFile(MultipartFile file) throws IOException;
}
