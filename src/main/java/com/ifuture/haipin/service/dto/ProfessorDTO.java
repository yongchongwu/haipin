package com.ifuture.haipin.service.dto;

import java.io.Serializable;
import java.util.List;

public class ProfessorDTO implements Serializable {
    private String name;
    private String phone;
    private String gender;
    private String email;

    private Integer age_min;
    private Integer age_max;

    private String edu_chinese;
    private String title_chinese;

    private String eol1_chinese;
    private String eol2_chinese;
    private String eol3_chinese;
    private Integer academic_rank_max;
    private Integer academic_rank_min;

    private String country_chinese;
    private String state_chinese;

    private String university_chinese;
    private Integer university_rank_max;
    private Integer university_rank_min;

    private String have_zone_1;
    private String have_zone_2;
    private String have_zone_3;
    private String have_zone_4;
    private String have_zone_other;

    private String keyword;

    private Integer page;
    private Integer size;
    private List<SortDTO> sort;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge_min() {
        return age_min;
    }

    public void setAge_min(Integer age_min) {
        this.age_min = age_min;
    }

    public Integer getAge_max() {
        return age_max;
    }

    public void setAge_max(Integer age_max) {
        this.age_max = age_max;
    }

    public String getEdu_chinese() {
        return edu_chinese;
    }

    public void setEdu_chinese(String edu_chinese) {
        this.edu_chinese = edu_chinese;
    }

    public String getTitle_chinese() {
        return title_chinese;
    }

    public void setTitle_chinese(String title_chinese) {
        this.title_chinese = title_chinese;
    }

    public String getEol1_chinese() {
        return eol1_chinese;
    }

    public void setEol1_chinese(String eol1_chinese) {
        this.eol1_chinese = eol1_chinese;
    }

    public String getEol2_chinese() {
        return eol2_chinese;
    }

    public void setEol2_chinese(String eol2_chinese) {
        this.eol2_chinese = eol2_chinese;
    }

    public String getEol3_chinese() {
        return eol3_chinese;
    }

    public void setEol3_chinese(String eol3_chinese) {
        this.eol3_chinese = eol3_chinese;
    }

    public Integer getAcademic_rank_max() {
        return academic_rank_max;
    }

    public void setAcademic_rank_max(Integer academic_rank_max) {
        this.academic_rank_max = academic_rank_max;
    }

    public Integer getAcademic_rank_min() {
        return academic_rank_min;
    }

    public void setAcademic_rank_min(Integer academic_rank_min) {
        this.academic_rank_min = academic_rank_min;
    }

    public String getCountry_chinese() {
        return country_chinese;
    }

    public void setCountry_chinese(String country_chinese) {
        this.country_chinese = country_chinese;
    }

    public String getState_chinese() {
        return state_chinese;
    }

    public void setState_chinese(String state_chinese) {
        this.state_chinese = state_chinese;
    }

    public String getUniversity_chinese() {
        return university_chinese;
    }

    public void setUniversity_chinese(String university_chinese) {
        this.university_chinese = university_chinese;
    }

    public Integer getUniversity_rank_max() {
        return university_rank_max;
    }

    public void setUniversity_rank_max(Integer university_rank_max) {
        this.university_rank_max = university_rank_max;
    }

    public Integer getUniversity_rank_min() {
        return university_rank_min;
    }

    public void setUniversity_rank_min(Integer university_rank_min) {
        this.university_rank_min = university_rank_min;
    }

    public String getHave_zone_1() {
        return have_zone_1;
    }

    public void setHave_zone_1(String have_zone_1) {
        this.have_zone_1 = have_zone_1;
    }

    public String getHave_zone_2() {
        return have_zone_2;
    }

    public void setHave_zone_2(String have_zone_2) {
        this.have_zone_2 = have_zone_2;
    }

    public String getHave_zone_3() {
        return have_zone_3;
    }

    public void setHave_zone_3(String have_zone_3) {
        this.have_zone_3 = have_zone_3;
    }

    public String getHave_zone_4() {
        return have_zone_4;
    }

    public void setHave_zone_4(String have_zone_4) {
        this.have_zone_4 = have_zone_4;
    }

    public String getHave_zone_other() {
        return have_zone_other;
    }

    public void setHave_zone_other(String have_zone_other) {
        this.have_zone_other = have_zone_other;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public List<SortDTO> getSort() {
        return sort;
    }

    public void setSort(List<SortDTO> sort) {
        this.sort = sort;
    }
}
