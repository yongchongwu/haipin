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
 * 项目经验
 * @author wuyongchong.
 */
@ApiModel(description = "项目经验 @author wuyongchong.")
@Entity
@Table(name = "haipin_resume_project")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ResumeProject implements Serializable {

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
     * 项目名称
     */
    @NotNull
    @Size(min = 2, max = 100)
    @ApiModelProperty(value = "项目名称", required = true)
    @Column(name = "project_name", length = 100, nullable = false)
    private String projectName;

    /**
     * 你的职责
     */
    @NotNull
    @Size(max = 100)
    @ApiModelProperty(value = "你的职责", required = true)
    @Column(name = "position_name", length = 100, nullable = false)
    private String positionName;

    /**
     * 项目起止时间
     */
    @NotNull
    @ApiModelProperty(value = "项目起止时间", required = true)
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    /**
     * 项目起止时间
     */
    @NotNull
    @ApiModelProperty(value = "项目起止时间", required = true)
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    /**
     * 项目描述
     */
    @NotNull
    @ApiModelProperty(value = "项目描述", required = true)
    @Column(name = "project_remark", nullable = false)
    private String projectRemark;

    /**
     * 项目链接
     */
    @ApiModelProperty(value = "项目链接")
    @Column(name = "project_url")
    private String projectUrl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public ResumeProject resumeId(Long resumeId) {
        this.resumeId = resumeId;
        return this;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public String getProjectName() {
        return projectName;
    }

    public ResumeProject projectName(String projectName) {
        this.projectName = projectName;
        return this;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getPositionName() {
        return positionName;
    }

    public ResumeProject positionName(String positionName) {
        this.positionName = positionName;
        return this;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public ResumeProject startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public ResumeProject endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getProjectRemark() {
        return projectRemark;
    }

    public ResumeProject projectRemark(String projectRemark) {
        this.projectRemark = projectRemark;
        return this;
    }

    public void setProjectRemark(String projectRemark) {
        this.projectRemark = projectRemark;
    }

    public String getProjectUrl() {
        return projectUrl;
    }

    public ResumeProject projectUrl(String projectUrl) {
        this.projectUrl = projectUrl;
        return this;
    }

    public void setProjectUrl(String projectUrl) {
        this.projectUrl = projectUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ResumeProject resumeProject = (ResumeProject) o;
        if (resumeProject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resumeProject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResumeProject{" +
            "id=" + getId() +
            ", resumeId='" + getResumeId() + "'" +
            ", projectName='" + getProjectName() + "'" +
            ", positionName='" + getPositionName() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", projectRemark='" + getProjectRemark() + "'" +
            ", projectUrl='" + getProjectUrl() + "'" +
            "}";
    }
}
