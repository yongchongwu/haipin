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
 * 技能评价
 * @author wuyongchong.
 */
@ApiModel(description = "技能评价 @author wuyongchong.")
@Entity
@Table(name = "haipin_resume_skill")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ResumeSkill implements Serializable {

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
     * 技能名称
     */
    @NotNull
    @Size(max = 20)
    @ApiModelProperty(value = "技能名称", required = true)
    @Column(name = "skill_name", length = 20, nullable = false)
    private String skillName;

    /**
     * 掌握程度名称(了解,熟悉,掌握,精通,专家)
     */
    @Size(max = 20)
    @ApiModelProperty(value = "掌握程度名称(了解,熟悉,掌握,精通,专家)")
    @Column(name = "master_level", length = 20)
    private String masterLevel;

    /**
     * 掌握程度值(0-20,21-40,41-60,61-80,81-100)
     */
    @NotNull
    @ApiModelProperty(value = "掌握程度值(0-20,21-40,41-60,61-80,81-100)", required = true)
    @Column(name = "skill_percent", nullable = false)
    private Integer skillPercent;

    /**
     * 技能描述
     */
    @Size(max = 100)
    @ApiModelProperty(value = "技能描述")
    @Column(name = "skill_remark", length = 100)
    private String skillRemark;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public ResumeSkill resumeId(Long resumeId) {
        this.resumeId = resumeId;
        return this;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public String getSkillName() {
        return skillName;
    }

    public ResumeSkill skillName(String skillName) {
        this.skillName = skillName;
        return this;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getMasterLevel() {
        return masterLevel;
    }

    public ResumeSkill masterLevel(String masterLevel) {
        this.masterLevel = masterLevel;
        return this;
    }

    public void setMasterLevel(String masterLevel) {
        this.masterLevel = masterLevel;
    }

    public Integer getSkillPercent() {
        return skillPercent;
    }

    public ResumeSkill skillPercent(Integer skillPercent) {
        this.skillPercent = skillPercent;
        return this;
    }

    public void setSkillPercent(Integer skillPercent) {
        this.skillPercent = skillPercent;
    }

    public String getSkillRemark() {
        return skillRemark;
    }

    public ResumeSkill skillRemark(String skillRemark) {
        this.skillRemark = skillRemark;
        return this;
    }

    public void setSkillRemark(String skillRemark) {
        this.skillRemark = skillRemark;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ResumeSkill resumeSkill = (ResumeSkill) o;
        if (resumeSkill.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resumeSkill.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResumeSkill{" +
            "id=" + getId() +
            ", resumeId='" + getResumeId() + "'" +
            ", skillName='" + getSkillName() + "'" +
            ", masterLevel='" + getMasterLevel() + "'" +
            ", skillPercent='" + getSkillPercent() + "'" +
            ", skillRemark='" + getSkillRemark() + "'" +
            "}";
    }
}
