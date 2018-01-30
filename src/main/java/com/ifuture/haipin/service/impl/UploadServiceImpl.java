package com.ifuture.haipin.service.impl;

import com.ifuture.haipin.service.UploadService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

/**
 * a class implementation of the UploadService.
 * Created by wuyongchong on 2017/7/14.
 */
@Service
public class UploadServiceImpl implements UploadService,InitializingBean {

    private static final Logger LOG = LoggerFactory.getLogger(UploadServiceImpl.class);

    private String baseLocation = null;

    @Override
    public void afterPropertiesSet() throws Exception {
        if (baseLocation == null) {
            return;
        }
        this.createBaseLocation();
    }

    @Override
    public String getBaseLocation() {
        return baseLocation;
    }

    public void setBaseLocation(String baseLocation) {
        this.baseLocation = baseLocation;
    }

    @Override
    public UploadServiceImpl withBaseLocation(String baseLocation) {
        this.baseLocation = baseLocation;
        return this;
    }

    private synchronized void createBaseLocation() throws IOException {
        createDirectory(baseLocation);
    }

    private synchronized void createDirectory(String directoryPath) throws IOException{
        File dir=new File(directoryPath);

        if(!dir.exists()){
            try {
                dir.mkdirs();
                return;
            }catch (SecurityException e){
                LOG.error(e.getMessage(),e);
                throw new IOException(e);
            }
        }else{
            if(!dir.isDirectory()){
                throw new IOException(String.format("File name exists and is not directory:%s",directoryPath));
            }
        }
    }

    private String getFileLocation(String file_name) {
        return baseLocation + File.separator + file_name;
    }

    private File getFile(String flowIdentifier) {
        return new File(getFileLocation(flowIdentifier));
    }

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        //1.check
        if(StringUtils.isBlank(getBaseLocation())){
            throw new IOException("the base location is empty.");
        }
        if (file.isEmpty()) {
            throw new IOException("the upload file is empty.");
        }
        //2.create dir by baseLocation
        createDirectory(getBaseLocation());

        //3.get the saved file name
        String originalFilename=file.getOriginalFilename();
        String file_name= UUID.randomUUID()+originalFilename.substring(originalFilename.lastIndexOf("."));

        //4.upload file
        File f =getFile(file_name);
        FileOutputStream output = new FileOutputStream(f, true);
        try {
            /*file.transferTo(f);*/
            output.write(file.getBytes());
            LOG.info("success to upload file:"+f.getAbsolutePath());
        }catch (IOException e){
            file_name=null;
            e.printStackTrace();
            throw new IOException("failed to upload file.");
        }finally{
            output.close();
        }
        return file_name;
    }




}
