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
 * 自定义板块
 * @author wuyongchong.
 */
@ApiModel(description = "自定义板块 @author wuyongchong.")
@Entity
@Table(name = "haipin_resume_block")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ResumeBlock implements Serializable {

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
     * 标题
     */
    @NotNull
    @Size(max = 100)
    @ApiModelProperty(value = "标题", required = true)
    @Column(name = "title_name", length = 100, nullable = false)
    private String titleName;

    /**
     * 内容
     */
    @NotNull
    @ApiModelProperty(value = "内容", required = true)
    @Column(name = "title_content", nullable = false)
    private String titleContent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public ResumeBlock resumeId(Long resumeId) {
        this.resumeId = resumeId;
        return this;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public String getTitleName() {
        return titleName;
    }

    public ResumeBlock titleName(String titleName) {
        this.titleName = titleName;
        return this;
    }

    public void setTitleName(String titleName) {
        this.titleName = titleName;
    }

    public String getTitleContent() {
        return titleContent;
    }

    public ResumeBlock titleContent(String titleContent) {
        this.titleContent = titleContent;
        return this;
    }

    public void setTitleContent(String titleContent) {
        this.titleContent = titleContent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ResumeBlock resumeBlock = (ResumeBlock) o;
        if (resumeBlock.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resumeBlock.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResumeBlock{" +
            "id=" + getId() +
            ", resumeId='" + getResumeId() + "'" +
            ", titleName='" + getTitleName() + "'" +
            ", titleContent='" + getTitleContent() + "'" +
            "}";
    }
}
