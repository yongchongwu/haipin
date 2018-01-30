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
 * 自我描述
 * @author wuyongchong.
 */
@ApiModel(description = "自我描述 @author wuyongchong.")
@Entity
@Table(name = "haipin_resume_intro")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ResumeIntro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 简历主表ID
     */
    @NotNull
    @ApiModelProperty(value = "简历主表ID", required = true)
    @Column(name = "resume_id", nullable = false)
    private Long resumeId;

    /**
     * 自我描述
     */
    @NotNull
    @ApiModelProperty(value = "自我描述", required = true)
    @Column(name = "content", nullable = false)
    private String content;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public ResumeIntro resumeId(Long resumeId) {
        this.resumeId = resumeId;
        return this;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public String getContent() {
        return content;
    }

    public ResumeIntro content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ResumeIntro resumeIntro = (ResumeIntro) o;
        if (resumeIntro.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resumeIntro.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResumeIntro{" +
            "id=" + getId() +
            ", resumeId='" + getResumeId() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
