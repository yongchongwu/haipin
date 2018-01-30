package com.ifuture.haipin.service.dto;

import java.io.Serializable;

public class BucketDTO implements Serializable {

    private String parent_name;
    private String parent_value;
    private String bucket_name;

    public String getParent_name() {
        return parent_name;
    }

    public void setParent_name(String parent_name) {
        this.parent_name = parent_name;
    }

    public String getParent_value() {
        return parent_value;
    }

    public void setParent_value(String parent_value) {
        this.parent_value = parent_value;
    }

    public String getBucket_name() {
        return bucket_name;
    }

    public void setBucket_name(String bucket_name) {
        this.bucket_name = bucket_name;
    }
}
