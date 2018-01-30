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
 * 期望工作
 * @author wuyongchong.
 */
@ApiModel(description = "期望工作 @author wuyongchong.")
@Entity
@Table(name = "haipin_resume_expect")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ResumeExpect implements Serializable {

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
     * 期望职位
     */
    @NotNull
    @Size(max = 100)
    @ApiModelProperty(value = "期望职位", required = true)
    @Column(name = "position_name", length = 100, nullable = false)
    private String positionName;

    /**
     * 职位性质(全职,兼职,实习)
     */
    @NotNull
    @Size(max = 20)
    @ApiModelProperty(value = "职位性质(全职,兼职,实习)", required = true)
    @Column(name = "position_type", length = 20, nullable = false)
    private String positionType;

    /**
     * 期望城市
     */
    @NotNull
    @ApiModelProperty(value = "期望城市", required = true)
    @Column(name = "city", nullable = false)
    private String city;

    /**
     * 期望月薪
     */
    @NotNull
    @Size(max = 20)
    @ApiModelProperty(value = "期望月薪", required = true)
    @Column(name = "salarys", length = 20, nullable = false)
    private String salarys;

    /**
     * 补充说明
     */
    @Size(max = 200)
    @ApiModelProperty(value = "补充说明")
    @Column(name = "add_explain", length = 200)
    private String addExplain;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public ResumeExpect resumeId(Long resumeId) {
        this.resumeId = resumeId;
        return this;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public String getPositionName() {
        return positionName;
    }

    public ResumeExpect positionName(String positionName) {
        this.positionName = positionName;
        return this;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public String getPositionType() {
        return positionType;
    }

    public ResumeExpect positionType(String positionType) {
        this.positionType = positionType;
        return this;
    }

    public void setPositionType(String positionType) {
        this.positionType = positionType;
    }

    public String getCity() {
        return city;
    }

    public ResumeExpect city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getSalarys() {
        return salarys;
    }

    public ResumeExpect salarys(String salarys) {
        this.salarys = salarys;
        return this;
    }

    public void setSalarys(String salarys) {
        this.salarys = salarys;
    }

    public String getAddExplain() {
        return addExplain;
    }

    public ResumeExpect addExplain(String addExplain) {
        this.addExplain = addExplain;
        return this;
    }

    public void setAddExplain(String addExplain) {
        this.addExplain = addExplain;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ResumeExpect resumeExpect = (ResumeExpect) o;
        if (resumeExpect.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resumeExpect.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResumeExpect{" +
            "id=" + getId() +
            ", resumeId='" + getResumeId() + "'" +
            ", positionName='" + getPositionName() + "'" +
            ", positionType='" + getPositionType() + "'" +
            ", city='" + getCity() + "'" +
            ", salarys='" + getSalarys() + "'" +
            ", addExplain='" + getAddExplain() + "'" +
            "}";
    }
}
