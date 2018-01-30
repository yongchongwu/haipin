package com.ifuture.haipin.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * 简历设置
 * @author wuyongchong.
 */
@ApiModel(description = "简历设置 @author wuyongchong.")
@Entity
@Table(name = "haipin_resume_setting")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ResumeSetting implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 用户ID
     */
    @ApiModelProperty(value = "用户ID", required = true)
    @Column(name = "user_id", nullable = false)
    private Long userId;

    /**
     * 默认简历
     */
    @ApiModelProperty(value = "默认简历")
    @Column(name = "default_resume")
    private String defaultResume;

    /**
     * 隐私设置
     */
    @ApiModelProperty(value = "隐私设置")
    @Column(name = "resume_privacy")
    private String resumePrivacy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public ResumeSetting userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDefaultResume() {
        return defaultResume;
    }

    public ResumeSetting defaultResume(String defaultResume) {
        this.defaultResume = defaultResume;
        return this;
    }

    public void setDefaultResume(String defaultResume) {
        this.defaultResume = defaultResume;
    }

    public String getResumePrivacy() {
        return resumePrivacy;
    }

    public ResumeSetting resumePrivacy(String resumePrivacy) {
        this.resumePrivacy = resumePrivacy;
        return this;
    }

    public void setResumePrivacy(String resumePrivacy) {
        this.resumePrivacy = resumePrivacy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ResumeSetting resumeSetting = (ResumeSetting) o;
        if (resumeSetting.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resumeSetting.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResumeSetting{" +
            "id=" + getId() +
            ", userId='" + getUserId() + "'" +
            ", defaultResume='" + getDefaultResume() + "'" +
            ", resumePrivacy='" + getResumePrivacy() + "'" +
            "}";
    }
}
