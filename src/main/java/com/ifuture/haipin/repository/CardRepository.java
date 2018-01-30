package com.ifuture.haipin.repository;

import com.ifuture.haipin.domain.Card;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Card entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardRepository extends JpaRepository<Card,Long> {

    Card findOneByUserLogin(String userLogin);
}
