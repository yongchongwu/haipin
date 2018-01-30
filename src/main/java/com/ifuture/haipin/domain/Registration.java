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
 * 招聘会报名表.
 * @author wuyongchong.
 */
@ApiModel(description = "招聘会报名表. @author wuyongchong.")
@Entity
@Table(name = "haipin_registration")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Registration implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 招聘会UUID
     */
    @NotNull
    @ApiModelProperty(value = "招聘会UUID", required = true)
    @Column(name = "recruitment_uuid", nullable = false)
    private String recruitmentUuid;

    /**
     * 姓名
     */
    @NotNull
    @Size(min = 2)
    @ApiModelProperty(value = "姓名", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * 出生年份
     */
    @NotNull
    @ApiModelProperty(value = "出生年份", required = true)
    @Column(name = "birth_year", nullable = false)
    private Integer birthYear;

    /**
     * 最高学历
     */
    @NotNull
    @ApiModelProperty(value = "最高学历", required = true)
    @Column(name = "highest_degree", nullable = false)
    private String highestDegree;

    /**
     * 研究领域
     */
    @NotNull
    @ApiModelProperty(value = "研究领域", required = true)
    @Column(name = "research_field", nullable = false)
    private String researchField;

    /**
     * 工作单位
     */
    @NotNull
    @Size(min = 2, max = 100)
    @ApiModelProperty(value = "工作单位", required = true)
    @Column(name = "work_unit", length = 100, nullable = false)
    private String workUnit;

    /**
     * 职位
     */
    @NotNull
    @Size(min = 2, max = 50)
    @ApiModelProperty(value = "职位", required = true)
    @Column(name = "position", length = 50, nullable = false)
    private String position;

    /**
     * 电子邮箱
     */
    @NotNull
    @Pattern(regexp = "^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$")
    @ApiModelProperty(value = "电子邮箱", required = true)
    @Column(name = "email", nullable = false)
    private String email;

    /**
     * 电话
     */
    @NotNull
    @Size(max = 30)
    @ApiModelProperty(value = "电话", required = true)
    @Column(name = "phone", length = 30, nullable = false)
    private String phone;

    /**
     * 个人主页
     */
    @Size(max = 100)
    @ApiModelProperty(value = "个人主页")
    @Column(name = "home_page", length = 100)
    private String homePage;

    /**
     * 简历上传路径
     */
    @ApiModelProperty(value = "简历上传路径")
    @Column(name = "resume_url")
    private String resumeUrl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRecruitmentUuid() {
        return recruitmentUuid;
    }

    public Registration recruitmentUuid(String recruitmentUuid) {
        this.recruitmentUuid = recruitmentUuid;
        return this;
    }

    public void setRecruitmentUuid(String recruitmentUuid) {
        this.recruitmentUuid = recruitmentUuid;
    }

    public String getName() {
        return name;
    }

    public Registration name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBirthYear() {
        return birthYear;
    }

    public Registration birthYear(Integer birthYear) {
        this.birthYear = birthYear;
        return this;
    }

    public void setBirthYear(Integer birthYear) {
        this.birthYear = birthYear;
    }

    public String getHighestDegree() {
        return highestDegree;
    }

    public Registration highestDegree(String highestDegree) {
        this.highestDegree = highestDegree;
        return this;
    }

    public void setHighestDegree(String highestDegree) {
        this.highestDegree = highestDegree;
    }

    public String getResearchField() {
        return researchField;
    }

    public Registration researchField(String researchField) {
        this.researchField = researchField;
        return this;
    }

    public void setResearchField(String researchField) {
        this.researchField = researchField;
    }

    public String getWorkUnit() {
        return workUnit;
    }

    public Registration workUnit(String workUnit) {
        this.workUnit = workUnit;
        return this;
    }

    public void setWorkUnit(String workUnit) {
        this.workUnit = workUnit;
    }

    public String getPosition() {
        return position;
    }

    public Registration position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getEmail() {
        return email;
    }

    public Registration email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public Registration phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getHomePage() {
        return homePage;
    }

    public Registration homePage(String homePage) {
        this.homePage = homePage;
        return this;
    }

    public void setHomePage(String homePage) {
        this.homePage = homePage;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public Registration resumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
        return this;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Registration registration = (Registration) o;
        if (registration.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), registration.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Registration{" +
            "id=" + getId() +
            ", recruitmentUuid='" + getRecruitmentUuid() + "'" +
            ", name='" + getName() + "'" +
            ", birthYear='" + getBirthYear() + "'" +
            ", highestDegree='" + getHighestDegree() + "'" +
            ", researchField='" + getResearchField() + "'" +
            ", workUnit='" + getWorkUnit() + "'" +
            ", position='" + getPosition() + "'" +
            ", email='" + getEmail() + "'" +
            ", phone='" + getPhone() + "'" +
            ", homePage='" + getHomePage() + "'" +
            ", resumeUrl='" + getResumeUrl() + "'" +
            "}";
    }
}
