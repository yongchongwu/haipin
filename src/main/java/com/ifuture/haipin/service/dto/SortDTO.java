package com.ifuture.haipin.service.dto;

import java.io.Serializable;

public class SortDTO implements Serializable {

    private String sort_name;
    private String sort_type;

    public String getSort_name() {
        return sort_name;
    }

    public void setSort_name(String sort_name) {
        this.sort_name = sort_name;
    }

    public String getSort_type() {
        return sort_type;
    }

    public void setSort_type(String sort_type) {
        this.sort_type = sort_type;
    }
}
