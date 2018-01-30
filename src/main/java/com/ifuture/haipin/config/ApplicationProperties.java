package com.ifuture.haipin.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to JHipster.
 * <p>
 * Properties are configured in the application.yml file.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private String defaultElasticsearchIndex;
    private String defaultElasticsearchType;
    private Integer defaultElasticsearchSize;

    public String getDefaultElasticsearchIndex() {
        return defaultElasticsearchIndex;
    }

    public void setDefaultElasticsearchIndex(String defaultElasticsearchIndex) {
        this.defaultElasticsearchIndex = defaultElasticsearchIndex;
    }

    public String getDefaultElasticsearchType() {
        return defaultElasticsearchType;
    }

    public void setDefaultElasticsearchType(String defaultElasticsearchType) {
        this.defaultElasticsearchType = defaultElasticsearchType;
    }

    public Integer getDefaultElasticsearchSize() {
        return defaultElasticsearchSize;
    }

    public void setDefaultElasticsearchSize(Integer defaultElasticsearchSize) {
        this.defaultElasticsearchSize = defaultElasticsearchSize;
    }
}
