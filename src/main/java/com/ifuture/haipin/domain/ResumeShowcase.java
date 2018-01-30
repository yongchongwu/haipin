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
 * 作品展示
 * @author wuyongchong.
 */
@ApiModel(description = "作品展示 @author wuyongchong.")
@Entity
@Table(name = "haipin_resume_showcase")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ResumeShowcase implements Serializable {

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
     * 作品标题
     */
    @NotNull
    @Size(max = 100)
    @ApiModelProperty(value = "作品标题", required = true)
    @Column(name = "title", length = 100, nullable = false)
    private String title;

    /**
     * 作品描述
     */
    @NotNull
    @ApiModelProperty(value = "作品描述", required = true)
    @Column(name = "content", nullable = false)
    private String content;

    /**
     * 作品图片
     */
    @ApiModelProperty(value = "作品图片")
    @Column(name = "image_url")
    private String imageUrl;

    /**
     * 作品剪切图片
     */
    @ApiModelProperty(value = "作品剪切图片")
    @Column(name = "cut_image_url")
    private String cutImageUrl;

    /**
     * 作品地址
     */
    @ApiModelProperty(value = "作品地址")
    @Column(name = "url")
    private String url;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public ResumeShowcase resumeId(Long resumeId) {
        this.resumeId = resumeId;
        return this;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public String getTitle() {
        return title;
    }

    public ResumeShowcase title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public ResumeShowcase content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public ResumeShowcase imageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCutImageUrl() {
        return cutImageUrl;
    }

    public ResumeShowcase cutImageUrl(String cutImageUrl) {
        this.cutImageUrl = cutImageUrl;
        return this;
    }

    public void setCutImageUrl(String cutImageUrl) {
        this.cutImageUrl = cutImageUrl;
    }

    public String getUrl() {
        return url;
    }

    public ResumeShowcase url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ResumeShowcase resumeShowcase = (ResumeShowcase) o;
        if (resumeShowcase.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resumeShowcase.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResumeShowcase{" +
            "id=" + getId() +
            ", resumeId='" + getResumeId() + "'" +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", cutImageUrl='" + getCutImageUrl() + "'" +
            ", url='" + getUrl() + "'" +
            "}";
    }
}
