package com.ifuture.haipin.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * 工作经历
 * @author wuyongchong.
 */
@ApiModel(description = "工作经历 @author wuyongchong.")
@Entity
@Table(name = "haipin_resume_work")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ResumeWork implements Serializable {

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
     * 公司名称
     */
    @NotNull
    @Size(min = 2, max = 100)
    @ApiModelProperty(value = "公司名称", required = true)
    @Column(name = "company_name", length = 100, nullable = false)
    private String companyName;

    /**
     * 公司LOGO
     */
    @Size(max = 100)
    @ApiModelProperty(value = "公司LOGO")
    @Column(name = "company_logo", length = 100)
    private String companyLogo;

    /**
     * 职位
     */
    @Size(max = 100)
    @ApiModelProperty(value = "职位")
    @Column(name = "position_name", length = 100)
    private String positionName;

    /**
     * 在职开始日期
     */
    @ApiModelProperty(value = "在职开始日期")
    @Column(name = "start_date")
    private LocalDate startDate;

    /**
     * 在职结束日期
     */
    @ApiModelProperty(value = "在职结束日期")
    @Column(name = "end_date")
    private LocalDate endDate;

    /**
     * 工作内容
     */
    @ApiModelProperty(value = "工作内容")
    @Column(name = "work_content")
    private String workContent;

    /**
     * 是否上传公司LOGO
     */
    @ApiModelProperty(value = "是否上传公司LOGO")
    @Column(name = "is_upload_logo")
    private Boolean isUploadLogo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public ResumeWork resumeId(Long resumeId) {
        this.resumeId = resumeId;
        return this;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public ResumeWork companyName(String companyName) {
        this.companyName = companyName;
        return this;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyLogo() {
        return companyLogo;
    }

    public ResumeWork companyLogo(String companyLogo) {
        this.companyLogo = companyLogo;
        return this;
    }

    public void setCompanyLogo(String companyLogo) {
        this.companyLogo = companyLogo;
    }

    public String getPositionName() {
        return positionName;
    }

    public ResumeWork positionName(String positionName) {
        this.positionName = positionName;
        return this;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public ResumeWork startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public ResumeWork endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getWorkContent() {
        return workContent;
    }

    public ResumeWork workContent(String workContent) {
        this.workContent = workContent;
        return this;
    }

    public void setWorkContent(String workContent) {
        this.workContent = workContent;
    }

    public Boolean isIsUploadLogo() {
        return isUploadLogo;
    }

    public ResumeWork isUploadLogo(Boolean isUploadLogo) {
        this.isUploadLogo = isUploadLogo;
        return this;
    }

    public void setIsUploadLogo(Boolean isUploadLogo) {
        this.isUploadLogo = isUploadLogo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ResumeWork resumeWork = (ResumeWork) o;
        if (resumeWork.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resumeWork.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResumeWork{" +
            "id=" + getId() +
            ", resumeId='" + getResumeId() + "'" +
            ", companyName='" + getCompanyName() + "'" +
            ", companyLogo='" + getCompanyLogo() + "'" +
            ", positionName='" + getPositionName() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", workContent='" + getWorkContent() + "'" +
            ", isUploadLogo='" + isIsUploadLogo() + "'" +
            "}";
    }
}
