package com.ifuture.haipin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ifuture.haipin.domain.ResumeBasic;
import com.ifuture.haipin.repository.ResumeAttachRepository;
import com.ifuture.haipin.repository.ResumeBasicRepository;
import com.ifuture.haipin.repository.ResumeBlockRepository;
import com.ifuture.haipin.repository.ResumeEducationRepository;
import com.ifuture.haipin.repository.ResumeExpectRepository;
import com.ifuture.haipin.repository.ResumeIntroRepository;
import com.ifuture.haipin.repository.ResumeProjectRepository;
import com.ifuture.haipin.repository.ResumeSettingRepository;
import com.ifuture.haipin.repository.ResumeShowcaseRepository;
import com.ifuture.haipin.repository.ResumeSkillRepository;
import com.ifuture.haipin.repository.ResumeWorkRepository;
import com.ifuture.haipin.security.SecurityUtils;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by wuyongchong on 2017/8/2.
 */
@RestController
@RequestMapping("/api")
public class ResumeResource {

    private final Logger log = LoggerFactory.getLogger(ResumeResource.class);

    @Autowired
    private ResumeSettingRepository resumeSettingRepository;
    @Autowired
    private ResumeAttachRepository resumeAttachRepository;

    private final ResumeBasicRepository resumeBasicRepository;
    private final ResumeIntroRepository resumeIntroRepository;
    private final ResumeWorkRepository resumeWorkRepository;
    private final ResumeEducationRepository resumeEducationRepository;
    private final ResumeProjectRepository resumeProjectRepository;
    private final ResumeShowcaseRepository resumeShowcaseRepository;
    private final ResumeExpectRepository resumeExpectRepository;
    private final ResumeSkillRepository resumeSkillRepository;
    private final ResumeBlockRepository resumeBlockRepository;

    public ResumeResource(ResumeBasicRepository resumeBasicRepository,
        ResumeIntroRepository resumeIntroRepository, ResumeWorkRepository resumeWorkRepository,
        ResumeEducationRepository resumeEducationRepository,
        ResumeProjectRepository resumeProjectRepository,
        ResumeShowcaseRepository resumeShowcaseRepository,
        ResumeExpectRepository resumeExpectRepository,
        ResumeSkillRepository resumeSkillRepository, ResumeBlockRepository resumeBlockRepository) {

        this.resumeBasicRepository = resumeBasicRepository;
        this.resumeIntroRepository = resumeIntroRepository;
        this.resumeWorkRepository = resumeWorkRepository;
        this.resumeEducationRepository = resumeEducationRepository;
        this.resumeProjectRepository = resumeProjectRepository;
        this.resumeShowcaseRepository = resumeShowcaseRepository;
        this.resumeExpectRepository = resumeExpectRepository;
        this.resumeSkillRepository = resumeSkillRepository;
        this.resumeBlockRepository = resumeBlockRepository;
    }

    @GetMapping("/resume/hasone")
    @Timed
    public ResponseEntity<ResumeBasic> getResuemBasicByUser() {

        final Long userId = SecurityUtils.getCurrentUserId();

        Optional<ResumeBasic> resumeBasicOptional = resumeBasicRepository.findTopByUserId(userId);

        return resumeBasicOptional.map(resumeBasic -> {
            return ResponseEntity.ok().body(resumeBasic);
        }).orElse(null);
    }
    @GetMapping("/resume/my")
    @Timed
    public Map<String, Object> getMyResumeInfo() {
        log.debug("REST request to get my all resume info");

        Map<String, Object> map = new HashMap<String, Object>();

        final Long userId = SecurityUtils.getCurrentUserId();

        /*简历设置*/
        map.put("resumeSetting", resumeSettingRepository.findTopByUserId(userId));
        /*附件简历*/
        map.put("resumeAttach", resumeAttachRepository.findTopByUserId(userId));

        Optional<ResumeBasic> resumeBasicOptional = resumeBasicRepository.findTopByUserId(userId);

        return resumeBasicOptional.map(resumeBasic -> {
            /*基本信息*/
            map.put("resumeBasic", resumeBasic);

            Long resumeId = resumeBasic.getId();

            /*自我描述*/
            map.put("resumeIntro", resumeIntroRepository.findTopByResumeId(resumeId));
            /*工作经历*/
            map.put("resumeWorks", resumeWorkRepository.findByResumeId(resumeId));
            /*教育经历*/
            map.put("resumeEducations", resumeEducationRepository.findByResumeId(resumeId));
            /*项目经验*/
            map.put("resumeProjects", resumeProjectRepository.findByResumeId(resumeId));
            /*产品展示*/
            map.put("resumeShowcases", resumeShowcaseRepository.findByResumeId(resumeId));
            /*期望工作*/
            map.put("resumeExpects", resumeExpectRepository.findByResumeId(resumeId));
            /*技能评价*/
            map.put("resumeSkills", resumeSkillRepository.findByResumeId(resumeId));
            /*自定义板块*/
            map.put("resumeBlocks", resumeBlockRepository.findByResumeId(resumeId));

            return map;

        }).orElseGet(() -> {

            return map;

        });
    }

}
