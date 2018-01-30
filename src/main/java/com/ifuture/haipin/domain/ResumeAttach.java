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
 * 附件简历
 * @author wuyongchong.
 */
@ApiModel(description = "附件简历 @author wuyongchong.")
@Entity
@Table(name = "haipin_resume_attach")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ResumeAttach implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 用户ID
     */
    @NotNull
    @ApiModelProperty(value = "用户ID", required = true)
    @Column(name = "user_id", nullable = false)
    private Long userId;

    /**
     * 附件名称
     */
    @NotNull
    @Size(max = 100)
    @ApiModelProperty(value = "附件名称", required = true)
    @Column(name = "attach_name", length = 100, nullable = false)
    private String attachName;

    /**
     * 附件路径
     */
    @NotNull
    @ApiModelProperty(value = "附件路径", required = true)
    @Column(name = "attach_url", nullable = false)
    private String attachUrl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public ResumeAttach userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAttachName() {
        return attachName;
    }

    public ResumeAttach attachName(String attachName) {
        this.attachName = attachName;
        return this;
    }

    public void setAttachName(String attachName) {
        this.attachName = attachName;
    }

    public String getAttachUrl() {
        return attachUrl;
    }

    public ResumeAttach attachUrl(String attachUrl) {
        this.attachUrl = attachUrl;
        return this;
    }

    public void setAttachUrl(String attachUrl) {
        this.attachUrl = attachUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ResumeAttach resumeAttach = (ResumeAttach) o;
        if (resumeAttach.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resumeAttach.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResumeAttach{" +
            "id=" + getId() +
            ", userId='" + getUserId() + "'" +
            ", attachName='" + getAttachName() + "'" +
            ", attachUrl='" + getAttachUrl() + "'" +
            "}";
    }
}
