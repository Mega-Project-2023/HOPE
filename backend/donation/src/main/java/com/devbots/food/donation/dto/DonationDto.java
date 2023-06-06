package com.devbots.food.donation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DonationDto {
    private String donationId;
    private String userId;
    private String volunteerId;
    private String address;
    private int noOfPeople;
    private int noOfHoursAfterPreparation;
    private String comment;
    private String status;
    private LocalDateTime timestamp;
}
