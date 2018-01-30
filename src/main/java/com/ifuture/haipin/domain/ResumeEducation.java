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
 * 教育经历
 * @author wuyongchong.
 */
@ApiModel(description = "教育经历 @author wuyongchong.")
@Entity
@Table(name = "haipin_resume_education")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ResumeEducation implements Serializable {

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
     * 学校名称
     */
    @NotNull
    @Size(min = 2, max = 100)
    @ApiModelProperty(value = "学校名称", required = true)
    @Column(name = "school_name", length = 100, nullable = false)
    private String schoolName;

    /**
     * 所学专业
     */
    @NotNull
    @Size(max = 50)
    @ApiModelProperty(value = "所学专业", required = true)
    @Column(name = "major", length = 50, nullable = false)
    private String major;

    /**
     * 学历
     */
    @NotNull
    @Size(max = 20)
    @ApiModelProperty(value = "学历", required = true)
    @Column(name = "jhi_degree", length = 20, nullable = false)
    private String degree;

    /**
     * 毕业年份
     */
    @NotNull
    @Size(min = 4, max = 4)
    @ApiModelProperty(value = "毕业年份", required = true)
    @Column(name = "end_year", length = 4, nullable = false)
    private String endYear;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public ResumeEducation resumeId(Long resumeId) {
        this.resumeId = resumeId;
        return this;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public ResumeEducation schoolName(String schoolName) {
        this.schoolName = schoolName;
        return this;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getMajor() {
        return major;
    }

    public ResumeEducation major(String major) {
        this.major = major;
        return this;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getDegree() {
        return degree;
    }

    public ResumeEducation degree(String degree) {
        this.degree = degree;
        return this;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getEndYear() {
        return endYear;
    }

    public ResumeEducation endYear(String endYear) {
        this.endYear = endYear;
        return this;
    }

    public void setEndYear(String endYear) {
        this.endYear = endYear;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ResumeEducation resumeEducation = (ResumeEducation) o;
        if (resumeEducation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resumeEducation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResumeEducation{" +
            "id=" + getId() +
            ", resumeId='" + getResumeId() + "'" +
            ", schoolName='" + getSchoolName() + "'" +
            ", major='" + getMajor() + "'" +
            ", degree='" + getDegree() + "'" +
            ", endYear='" + getEndYear() + "'" +
            "}";
    }
}
