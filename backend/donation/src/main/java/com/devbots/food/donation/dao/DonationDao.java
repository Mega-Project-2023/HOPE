package com.devbots.food.donation.dao;

import com.devbots.food.donation.entity.DonationReq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DonationDao extends JpaRepository<DonationReq, Integer> {

    @Query("SELECT u FROM DonationReq u WHERE u.donationId LIKE ?1")
    Optional<DonationReq> findByDonationId(String donationId);

    @Query("SELECT u FROM DonationReq u WHERE u.status LIKE ?1 and u.userId LIKE ?2")
    List<DonationReq> findAllDonationRequestByStatusAndUserId(String status, String userId);

    @Query("SELECT u FROM DonationReq u WHERE u.userId LIKE ?1")
    List<DonationReq> findAllDonationRequestByUserId(String userId);

    @Query("SELECT u FROM DonationReq u WHERE u.status LIKE ?1")
    List<DonationReq> findAllDonationRequestByStatus(String status);
}
