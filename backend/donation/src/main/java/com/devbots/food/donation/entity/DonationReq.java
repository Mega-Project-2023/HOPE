package com.devbots.food.donation.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class DonationReq {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;

    private String donationId;

    @Column(nullable = false)
    private String userId;
    private String volunteerId;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private int noOfPeople;

    @Column(nullable = false)
    private int noOfHoursAfterPreparation;
    private String comment;
    private String status;
    private LocalDateTime timestamp;
}
