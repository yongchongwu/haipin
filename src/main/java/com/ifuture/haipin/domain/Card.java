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
 * 微名片表.
 * @author wuyongchong.
 */
@ApiModel(description = "微名片表. @author wuyongchong.")
@Entity
@Table(name = "haipin_card")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Card implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 姓名
     */
    @NotNull
    @Size(min = 2)
    @ApiModelProperty(value = "姓名", required = true)
    @Column(name = "name", nullable = false)
    private String name;

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
     * 电子邮件
     */
    @NotNull
    @Pattern(regexp = "^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$")
    @ApiModelProperty(value = "电子邮件", required = true)
    @Column(name = "email", nullable = false)
    private String email;

    /**
     * 手机号码
     */
    @NotNull
    @Size(max = 30)
    @ApiModelProperty(value = "手机号码", required = true)
    @Column(name = "phone", length = 30, nullable = false)
    private String phone;

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
     * 所在城市
     */
    @NotNull
    @ApiModelProperty(value = "所在城市", required = true)
    @Column(name = "city", nullable = false)
    private String city;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Card name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHighestDegree() {
        return highestDegree;
    }

    public Card highestDegree(String highestDegree) {
        this.highestDegree = highestDegree;
        return this;
    }

    public void setHighestDegree(String highestDegree) {
        this.highestDegree = highestDegree;
    }

    public String getResearchField() {
        return researchField;
    }

    public Card researchField(String researchField) {
        this.researchField = researchField;
        return this;
    }

    public void setResearchField(String researchField) {
        this.researchField = researchField;
    }

    public String getEmail() {
        return email;
    }

    public Card email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public Card phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getWorkUnit() {
        return workUnit;
    }

    public Card workUnit(String workUnit) {
        this.workUnit = workUnit;
        return this;
    }

    public void setWorkUnit(String workUnit) {
        this.workUnit = workUnit;
    }

    public String getPosition() {
        return position;
    }

    public Card position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getCity() {
        return city;
    }

    public Card city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public User getUser() {
        return user;
    }

    public Card user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Card card = (Card) o;
        if (card.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), card.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Card{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", highestDegree='" + getHighestDegree() + "'" +
            ", researchField='" + getResearchField() + "'" +
            ", email='" + getEmail() + "'" +
            ", phone='" + getPhone() + "'" +
            ", workUnit='" + getWorkUnit() + "'" +
            ", position='" + getPosition() + "'" +
            ", city='" + getCity() + "'" +
            "}";
    }
}
