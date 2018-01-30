package com.ifuture.haipin.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;
import org.hibernate.annotations.DynamicUpdate;

/**
 * 简历基本信息
 * @author wuyongchong.
 */
@ApiModel(description = "简历基本信息 @author wuyongchong.")
@Entity
@Table(name = "haipin_resume_basic")
@DynamicUpdate(true)
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ResumeBasic implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 用户ID
     */
    @ApiModelProperty(value = "用户ID", required = false)
    @Column(name = "user_id", nullable = false)
    private Long userId;

    /**
     * 姓名
     */
    @NotNull
    @Size(min = 2)
    @ApiModelProperty(value = "姓名", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * 性别
     */
    @NotNull
    @Size(min = 1, max = 20)
    @ApiModelProperty(value = "性别", required = true)
    @Column(name = "sex", length = 20, nullable = false)
    private String sex;

    /**
     * 出生年月
     */
    @Size(min = 7, max = 7)
    @ApiModelProperty(value = "出生年月")
    @Column(name = "birth_day", length = 7)
    private String birthDay;

    /**
     * 出生年份
     */
    @Size(min = 4, max = 4)
    @ApiModelProperty(value = "出生年份")
    @Column(name = "birth_year", length = 4)
    private String birthYear;

    /**
     * 出生月份
     */
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "出生月份")
    @Column(name = "birth_month", length = 2)
    private String birthMonth;

    /**
     * 电话区号
     */
    @NotNull
    @Size(max = 20)
    @ApiModelProperty(value = "电话区号", required = true)
    @Column(name = "dial_code", length = 20, nullable = false)
    private String dialCode;

    /**
     * 手机号码
     */
    @NotNull
    @Size(max = 20)
    @ApiModelProperty(value = "手机号码", required = true)
    @Column(name = "phone", length = 20, nullable = false)
    private String phone;

    /**
     * 联系邮箱
     */
    @NotNull
    @Size(max = 100)
    @Pattern(regexp = "^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$")
    @ApiModelProperty(value = "联系邮箱", required = true)
    @Column(name = "email", length = 100, nullable = false)
    private String email;

    /**
     * 所在城市
     */
    @NotNull
    @Size(max = 100)
    @ApiModelProperty(value = "所在城市", required = true)
    @Column(name = "live_city", length = 100, nullable = false)
    private String liveCity;

    /**
     * 最高学历
     */
    @NotNull
    @Size(max = 20)
    @ApiModelProperty(value = "最高学历", required = true)
    @Column(name = "highest_degree", length = 20, nullable = false)
    private String highestDegree;

    /**
     * 研究领域
     */
    @Size(max = 100)
    @ApiModelProperty(value = "研究领域")
    @Column(name = "research_field", length = 100)
    private String researchField;

    /**
     * 工作年限
     */
    @NotNull
    @Size(max = 20)
    @ApiModelProperty(value = "工作年限", required = true)
    @Column(name = "work_year", length = 20, nullable = false)
    private String workYear;

    /**
     * 头像
     */
    @Size(max = 100)
    @ApiModelProperty(value = "头像")
    @Column(name = "head_pic", length = 100)
    private String headPic;

    /**
     * 一句话介绍自己(我的优势)
     */
    @Size(max = 200)
    @ApiModelProperty(value = "一句话介绍自己(我的优势)")
    @Column(name = "one_word", length = 200)
    private String oneWord;

    /**
     * 显示身份
     */
    @Size(max = 100)
    @ApiModelProperty(value = "显示身份")
    @Column(name = "user_identity", length = 100)
    private String userIdentity;

    /**
     * 简历名称
     */
    @Size(max = 100)
    @ApiModelProperty(value = "简历名称")
    @Column(name = "resume_name", length = 100)
    private String resumeName;

    /**
     * 简历Key
     */
    @Size(max = 100)
    @ApiModelProperty(value = "简历Key")
    @Column(name = "resume_key", length = 100)
    private String resumeKey;

    /**
     * 简历得分
     */
    @ApiModelProperty(value = "简历得分")
    @Column(name = "resume_score")
    private Integer resumeScore;

    /**
     * 简历状态
     */
    @ApiModelProperty(value = "简历状态")
    @Column(name = "status")
    private Integer status;

    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间")
    @Column(name = "create_time")
    private ZonedDateTime createTime;

    /**
     * 更新时间
     */
    @ApiModelProperty(value = "更新时间")
    @Column(name = "update_time")
    private ZonedDateTime updateTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public ResumeBasic userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public ResumeBasic name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public ResumeBasic sex(String sex) {
        this.sex = sex;
        return this;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getBirthDay() {
        return birthDay;
    }

    public ResumeBasic birthDay(String birthDay) {
        this.birthDay = birthDay;
        return this;
    }

    public void setBirthDay(String birthDay) {
        this.birthDay = birthDay;
    }

    public String getBirthYear() {
        return birthYear;
    }

    public ResumeBasic birthYear(String birthYear) {
        this.birthYear = birthYear;
        return this;
    }

    public void setBirthYear(String birthYear) {
        this.birthYear = birthYear;
    }

    public String getBirthMonth() {
        return birthMonth;
    }

    public ResumeBasic birthMonth(String birthMonth) {
        this.birthMonth = birthMonth;
        return this;
    }

    public void setBirthMonth(String birthMonth) {
        this.birthMonth = birthMonth;
    }

    public String getDialCode() {
        return dialCode;
    }

    public ResumeBasic dialCode(String dialCode) {
        this.dialCode = dialCode;
        return this;
    }

    public void setDialCode(String dialCode) {
        this.dialCode = dialCode;
    }

    public String getPhone() {
        return phone;
    }

    public ResumeBasic phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public ResumeBasic email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLiveCity() {
        return liveCity;
    }

    public ResumeBasic liveCity(String liveCity) {
        this.liveCity = liveCity;
        return this;
    }

    public void setLiveCity(String liveCity) {
        this.liveCity = liveCity;
    }

    public String getHighestDegree() {
        return highestDegree;
    }

    public ResumeBasic highestDegree(String highestDegree) {
        this.highestDegree = highestDegree;
        return this;
    }

    public void setHighestDegree(String highestDegree) {
        this.highestDegree = highestDegree;
    }

    public String getResearchField() {
        return researchField;
    }

    public ResumeBasic researchField(String researchField) {
        this.researchField = researchField;
        return this;
    }

    public void setResearchField(String researchField) {
        this.researchField = researchField;
    }

    public String getWorkYear() {
        return workYear;
    }

    public ResumeBasic workYear(String workYear) {
        this.workYear = workYear;
        return this;
    }

    public void setWorkYear(String workYear) {
        this.workYear = workYear;
    }

    public String getHeadPic() {
        return headPic;
    }

    public ResumeBasic headPic(String headPic) {
        this.headPic = headPic;
        return this;
    }

    public void setHeadPic(String headPic) {
        this.headPic = headPic;
    }

    public String getOneWord() {
        return oneWord;
    }

    public ResumeBasic oneWord(String oneWord) {
        this.oneWord = oneWord;
        return this;
    }

    public void setOneWord(String oneWord) {
        this.oneWord = oneWord;
    }

    public String getUserIdentity() {
        return userIdentity;
    }

    public ResumeBasic userIdentity(String userIdentity) {
        this.userIdentity = userIdentity;
        return this;
    }

    public void setUserIdentity(String userIdentity) {
        this.userIdentity = userIdentity;
    }

    public String getResumeName() {
        return resumeName;
    }

    public ResumeBasic resumeName(String resumeName) {
        this.resumeName = resumeName;
        return this;
    }

    public void setResumeName(String resumeName) {
        this.resumeName = resumeName;
    }

    public String getResumeKey() {
        return resumeKey;
    }

    public ResumeBasic resumeKey(String resumeKey) {
        this.resumeKey = resumeKey;
        return this;
    }

    public void setResumeKey(String resumeKey) {
        this.resumeKey = resumeKey;
    }

    public Integer getResumeScore() {
        return resumeScore;
    }

    public ResumeBasic resumeScore(Integer resumeScore) {
        this.resumeScore = resumeScore;
        return this;
    }

    public void setResumeScore(Integer resumeScore) {
        this.resumeScore = resumeScore;
    }

    public Integer getStatus() {
        return status;
    }

    public ResumeBasic status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public ZonedDateTime getCreateTime() {
        return createTime;
    }

    public ResumeBasic createTime(ZonedDateTime createTime) {
        this.createTime = createTime;
        return this;
    }

    public void setCreateTime(ZonedDateTime createTime) {
        this.createTime = createTime;
    }

    public ZonedDateTime getUpdateTime() {
        return updateTime;
    }

    public ResumeBasic updateTime(ZonedDateTime updateTime) {
        this.updateTime = updateTime;
        return this;
    }

    public void setUpdateTime(ZonedDateTime updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ResumeBasic resumeBasic = (ResumeBasic) o;
        if (resumeBasic.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resumeBasic.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ResumeBasic{" +
            "id=" + getId() +
            ", userId='" + getUserId() + "'" +
            ", name='" + getName() + "'" +
            ", sex='" + getSex() + "'" +
            ", birthDay='" + getBirthDay() + "'" +
            ", birthYear='" + getBirthYear() + "'" +
            ", birthMonth='" + getBirthMonth() + "'" +
            ", dialCode='" + getDialCode() + "'" +
            ", phone='" + getPhone() + "'" +
            ", email='" + getEmail() + "'" +
            ", liveCity='" + getLiveCity() + "'" +
            ", highestDegree='" + getHighestDegree() + "'" +
            ", researchField='" + getResearchField() + "'" +
            ", workYear='" + getWorkYear() + "'" +
            ", headPic='" + getHeadPic() + "'" +
            ", oneWord='" + getOneWord() + "'" +
            ", userIdentity='" + getUserIdentity() + "'" +
            ", resumeName='" + getResumeName() + "'" +
            ", resumeKey='" + getResumeKey() + "'" +
            ", resumeScore='" + getResumeScore() + "'" +
            ", status='" + getStatus() + "'" +
            ", createTime='" + getCreateTime() + "'" +
            ", updateTime='" + getUpdateTime() + "'" +
            "}";
    }
}
