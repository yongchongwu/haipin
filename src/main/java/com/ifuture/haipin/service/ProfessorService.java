package com.ifuture.haipin.service;

import com.ifuture.haipin.config.ApplicationProperties;
import com.ifuture.haipin.service.dto.BucketDTO;
import com.ifuture.haipin.service.dto.ProfessorDTO;
import com.ifuture.haipin.service.dto.SortDTO;
import io.searchbox.client.JestClient;
import io.searchbox.core.Search;
import io.searchbox.core.SearchResult;
import java.io.IOException;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.Operator;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfessorService {

    private final Logger log = LoggerFactory.getLogger(ProfessorService.class);

    @Autowired
    private ApplicationProperties applicationProperties;

    @Autowired
    private JestClient jestClient;

    public SearchResult getBucketsByParent(BucketDTO bucketDTO) throws IOException {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        if (StringUtils.isNotBlank(bucketDTO.getParent_value())) {

            searchSourceBuilder
                .aggregation(AggregationBuilders
                    .filter(bucketDTO.getBucket_name(),
                        QueryBuilders.termsQuery(bucketDTO.getParent_name() + ".raw",
                            bucketDTO.getParent_value().split(",")))
                    .subAggregation(
                        AggregationBuilders.terms(bucketDTO.getBucket_name() + ".raw")
                            .field(bucketDTO.getBucket_name() + ".raw")
                            .size(Integer.MAX_VALUE)));
        } else {
            searchSourceBuilder
                .aggregation(AggregationBuilders.terms(bucketDTO.getBucket_name())
                    .field(bucketDTO.getBucket_name() + ".raw")
                    .size(Integer.MAX_VALUE));
        }

        Search.Builder searchBuilder = getSearchBuilder(searchSourceBuilder);

        Search search = searchBuilder.build();

        SearchResult result = jestClient.execute(search);

        return result;
    }

    public SearchResult getProfessorsBySearch(ProfessorDTO professorDTO, boolean isEntry)
        throws IOException {

        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        //searchSourceBuilder.query(QueryBuilders.matchAllQuery());

        if (isEntry) {
            setAggregations(searchSourceBuilder, professorDTO);
        } else {
            setQuerys(searchSourceBuilder, professorDTO);
            setPostFilters(searchSourceBuilder, professorDTO);
        }
        setPageAndSort(searchSourceBuilder, professorDTO);

        Search.Builder searchBuilder = getSearchBuilder(searchSourceBuilder);

        Search search = searchBuilder.build();

        SearchResult result = jestClient.execute(search);

        return result;
    }

    public SearchResult getProfessorDetailById(Long id) throws IOException {

        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        searchSourceBuilder.query(QueryBuilders.matchQuery("index", id));

        Search.Builder searchBuilder = getSearchBuilder(searchSourceBuilder);

        Search search = searchBuilder.build();

        SearchResult result = jestClient.execute(search);

        return result;
    }

    public Search.Builder getSearchBuilder(SearchSourceBuilder searchSourceBuilder) {
        Search.Builder searchBuilder = new Search.Builder(searchSourceBuilder.toString());
        searchBuilder.addIndex(applicationProperties.getDefaultElasticsearchIndex());
        return searchBuilder;
    }

    public void setAggregations(SearchSourceBuilder searchSourceBuilder,
        ProfessorDTO professorDTO) {

        //学历
        searchSourceBuilder
            .aggregation(AggregationBuilders.terms("edu_chinese").field("edu_chinese.raw")
                .size(Integer.MAX_VALUE));
        //职称
        searchSourceBuilder
            .aggregation(AggregationBuilders.terms("title_chinese").field("title_chinese.raw")
                .size(Integer.MAX_VALUE));

        //一级学科领域
        searchSourceBuilder
            .aggregation(AggregationBuilders.terms("eol1_chinese").field("eol1_chinese.raw")
                .size(Integer.MAX_VALUE)
                .subAggregation(AggregationBuilders.terms("eol2_chinese").field("eol2_chinese.raw")
                    .size(Integer.MAX_VALUE).subAggregation(
                        AggregationBuilders.terms("eol3_chinese").field("eol3_chinese.raw")
                            .size(Integer.MAX_VALUE))));
        //二级学科领域
        if (StringUtils.isNotBlank(professorDTO.getEol1_chinese())) {
            searchSourceBuilder
                .aggregation(AggregationBuilders
                    .filter("eol2_chinese",
                        QueryBuilders.termQuery("eol1_chinese.raw", professorDTO.getEol1_chinese()))
                    .subAggregation(
                        AggregationBuilders.terms("eol2_chinese.raw").field("eol2_chinese.raw")
                            .size(Integer.MAX_VALUE)));
        } else {
            searchSourceBuilder
                .aggregation(AggregationBuilders.terms("eol2_chinese").field("eol2_chinese.raw")
                    .size(Integer.MAX_VALUE));
        }

        //三级级学科领域

        if (StringUtils.isBlank(professorDTO.getEol1_chinese()) && StringUtils
            .isBlank(professorDTO.getEol2_chinese())) {
            searchSourceBuilder
                .aggregation(AggregationBuilders.terms("eol3_chinese").field("eol3_chinese.raw")
                    .size(Integer.MAX_VALUE));
        } else {
            BoolQueryBuilder eol3Filter = QueryBuilders.boolQuery();
            if (StringUtils.isNotBlank(professorDTO.getEol1_chinese())) {
                eol3Filter.must(
                    QueryBuilders.termQuery("eol1_chinese.raw", professorDTO.getEol1_chinese()));
            }
            if (StringUtils.isNotBlank(professorDTO.getEol2_chinese())) {
                eol3Filter.must(
                    QueryBuilders.termQuery("eol2_chinese.raw", professorDTO.getEol2_chinese()));
            }
            searchSourceBuilder
                .aggregation(AggregationBuilders
                    .filter("eol3_chinese", eol3Filter)
                    .subAggregation(
                        AggregationBuilders.terms("eol3_chinese.raw").field("eol3_chinese.raw")
                            .size(Integer.MAX_VALUE)));
        }

        //国家
        searchSourceBuilder
            .aggregation(AggregationBuilders.terms("country_chinese").field("country_chinese.raw")
                .size(Integer.MAX_VALUE).subAggregation(
                    AggregationBuilders.terms("state_chinese").field("state_chinese.raw")
                        .size(Integer.MAX_VALUE)));

        //地区
        if (StringUtils.isNotBlank(professorDTO.getCountry_chinese())) {
            searchSourceBuilder
                .aggregation(AggregationBuilders
                    .filter("state_chinese",
                        QueryBuilders
                            .termQuery("country_chinese.raw", professorDTO.getCountry_chinese()))
                    .subAggregation(
                        AggregationBuilders.terms("state_chinese.raw").field("state_chinese.raw")
                            .size(Integer.MAX_VALUE)));
        } else {
            searchSourceBuilder
                .aggregation(AggregationBuilders.terms("state_chinese").field("state_chinese.raw")
                    .size(Integer.MAX_VALUE));
        }

    }

    public void setPageAndSort(SearchSourceBuilder searchSourceBuilder,
        ProfessorDTO professorDTO) {
        //设置分页
        Integer size = applicationProperties.getDefaultElasticsearchSize();
        if (null != professorDTO.getSize()) {
            size = professorDTO.getSize();
        }
        Integer from = 0;
        if (null != professorDTO.getPage() && professorDTO.getPage() > 1) {
            from = (professorDTO.getPage() - 1) * size;
        }
        searchSourceBuilder.from(from).size(size);
        //设置排序
        if (null == professorDTO.getSort() || professorDTO.getSort().size() == 0) {
            searchSourceBuilder.sort("index", SortOrder.ASC);
            searchSourceBuilder.sort("_score", SortOrder.DESC);
        } else {
            List<SortDTO> sortList = professorDTO.getSort();
            for (SortDTO sort : sortList) {
                searchSourceBuilder.sort(sort.getSort_name(),
                    "DESC".equalsIgnoreCase(sort.getSort_type()) ? SortOrder.DESC : SortOrder.ASC);
            }
        }
    }

    public void setQuerys(SearchSourceBuilder searchSourceBuilder, ProfessorDTO professorDTO) {
        BoolQueryBuilder boolMustQuery = QueryBuilders.boolQuery();
        //姓名
        if (StringUtils.isNotBlank(professorDTO.getName())) {
            BoolQueryBuilder boolShouldQuery = QueryBuilders.boolQuery();
            boolShouldQuery
                .should(QueryBuilders.simpleQueryStringQuery(professorDTO.getName()).field("name"));
            boolShouldQuery
                .should(QueryBuilders.multiMatchQuery(professorDTO.getName(), "name").type(
                    MultiMatchQueryBuilder.Type.PHRASE_PREFIX));
            boolMustQuery.must(boolShouldQuery);
        }
        //电子邮箱
        if (StringUtils.isNotBlank(professorDTO.getEmail())) {
            boolMustQuery
                .must(QueryBuilders.simpleQueryStringQuery(professorDTO.getEmail()).field("email"));
        }
        //在职大学
        if (StringUtils.isNotBlank(professorDTO.getUniversity_chinese())) {
            BoolQueryBuilder boolShouldQuery = QueryBuilders.boolQuery();
            boolShouldQuery.should(
                QueryBuilders.simpleQueryStringQuery(professorDTO.getUniversity_chinese())
                    .field("university").field("university_chinese"));
            boolShouldQuery.should(QueryBuilders
                .multiMatchQuery(professorDTO.getUniversity_chinese(), "university",
                    "university_chinese").type(
                    MultiMatchQueryBuilder.Type.PHRASE_PREFIX));
            boolMustQuery.must(boolShouldQuery);
        }
        //模糊搜索
        if (StringUtils.isNotBlank(professorDTO.getKeyword())) {
            boolMustQuery.must(QueryBuilders.simpleQueryStringQuery(professorDTO.getKeyword())
                .field("department_chinese^5")
                .field("research^2").field("publication^2").field("experience_linkedin")
                .field("education_linkedin").defaultOperator(Operator.OR));
        }

        searchSourceBuilder.query(boolMustQuery);
    }

    public void setPostFilters(SearchSourceBuilder searchSourceBuilder, ProfessorDTO professorDTO) {

        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();

        //性别
        if (StringUtils.isNotBlank(professorDTO.getGender())) {
            boolQuery
                .must(QueryBuilders.termQuery("gender", professorDTO.getGender()));
        }
        //学历
        if (StringUtils.isNotBlank(professorDTO.getEdu_chinese())) {
            boolQuery
                .must(QueryBuilders
                    .termsQuery("edu_chinese.raw", professorDTO.getEdu_chinese().split(",")));
        }
        //职称
        if (StringUtils.isNotBlank(professorDTO.getTitle_chinese())) {
            boolQuery
                .must(QueryBuilders
                    .termsQuery("title_chinese.raw", professorDTO.getTitle_chinese().split(",")));
        }
        //三级学科领域
        if (StringUtils.isNotBlank(professorDTO.getEol1_chinese())) {
            boolQuery
                .must(QueryBuilders
                    .termsQuery("eol1_chinese.raw", professorDTO.getEol1_chinese().split(",")));
        }
        if (StringUtils.isNotBlank(professorDTO.getEol2_chinese())) {
            boolQuery
                .must(QueryBuilders
                    .termsQuery("eol2_chinese.raw", professorDTO.getEol2_chinese().split(",")));
        }
        if (StringUtils.isNotBlank(professorDTO.getEol3_chinese())) {
            boolQuery
                .must(QueryBuilders
                    .termsQuery("eol3_chinese.raw", professorDTO.getEol3_chinese().split(",")));
        }
        //工作地点
        if (StringUtils.isNotBlank(professorDTO.getCountry_chinese())) {
            boolQuery
                .must(QueryBuilders
                    .termsQuery("country_chinese.raw",
                        professorDTO.getCountry_chinese().split(",")));
        }
        if (StringUtils.isNotBlank(professorDTO.getState_chinese())) {
            boolQuery
                .must(QueryBuilders
                    .termsQuery("state_chinese.raw", professorDTO.getState_chinese().split(",")));
        }
        //大学排名范围
        QueryBuilder universityRankRangeQuery = getCustomRangeQuery("university_rank_max",
            "university_rank_min",
            professorDTO.getUniversity_rank_max(), professorDTO.getUniversity_rank_min());
        if (null != universityRankRangeQuery) {
            boolQuery.must(universityRankRangeQuery);
        }
        //学科排名范围
        QueryBuilder academicRankRangeQuery = getCustomRangeQuery("academic_rank_max",
            "academic_rank_min",
            professorDTO.getAcademic_rank_max(), professorDTO.getAcademic_rank_min());
        if (null != academicRankRangeQuery) {
            boolQuery.must(academicRankRangeQuery);
        }
        //年龄范围
        QueryBuilder ageRangeQuery = getCustomRangeQuery("age_max", "age_min",
            professorDTO.getAge_max(), professorDTO.getAge_min());
        if (null != ageRangeQuery) {
            boolQuery.must(ageRangeQuery);
        }

        //论文分区
        QueryBuilder haveZoneQuery = getHaveZoneQuery(professorDTO);
        if (null != haveZoneQuery) {
            boolQuery.must(haveZoneQuery);
        }

        searchSourceBuilder.postFilter(boolQuery);
    }

    public QueryBuilder getCustomRangeQuery(String max_name, String min_name, Integer max_value,
        Integer min_value) {

        if (null == max_value && null == min_value) {
            return null;
        }
        if (null != max_value && null != min_value) {
            BoolQueryBuilder boolShouldQuery = QueryBuilders.boolQuery();

            BoolQueryBuilder boolMustQuery = QueryBuilders.boolQuery();

            boolMustQuery.must(QueryBuilders.rangeQuery(max_name).gte(max_value));

            boolMustQuery.must(QueryBuilders.rangeQuery(min_name).lte(max_value));

            boolShouldQuery
                .should(QueryBuilders.rangeQuery(max_name).gte(min_value).lte(max_value));
            boolShouldQuery.should(boolMustQuery);

            return boolShouldQuery;
        } else {
            if (null != min_value) {
                return QueryBuilders.rangeQuery(min_name).gte(min_value);
            } else if (null != max_value) {
                return QueryBuilders.rangeQuery(max_name).lte(max_value);
            }
        }
        return null;
    }

    public QueryBuilder getHaveZoneQuery(ProfessorDTO professorDTO) {
        BoolQueryBuilder boolShouldQuery = QueryBuilders.boolQuery();

        if (StringUtils.isNotBlank(professorDTO.getHave_zone_1())) {
            boolShouldQuery
                .should(QueryBuilders.termQuery("have_zone_1", professorDTO.getHave_zone_1()));
        }
        if (StringUtils.isNotBlank(professorDTO.getHave_zone_2())) {
            boolShouldQuery
                .should(QueryBuilders.termQuery("have_zone_2", professorDTO.getHave_zone_2()));
        }
        if (StringUtils.isNotBlank(professorDTO.getHave_zone_3())) {
            boolShouldQuery
                .should(QueryBuilders.termQuery("have_zone_3", professorDTO.getHave_zone_3()));
        }
        if (StringUtils.isNotBlank(professorDTO.getHave_zone_4())) {
            boolShouldQuery
                .should(QueryBuilders.termQuery("have_zone_4", professorDTO.getHave_zone_4()));
        }
        if (StringUtils.isNotBlank(professorDTO.getHave_zone_other())) {
            boolShouldQuery.should(
                QueryBuilders.termQuery("have_zone_other", professorDTO.getHave_zone_other()));
        }
        return boolShouldQuery;
    }

}
