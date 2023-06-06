package com.devbots.food.donation.service;

import com.devbots.food.donation.dto.DonationDto;

import java.util.List;
import java.util.Map;

public interface DonationService {
    DonationDto newDonationRequest(DonationDto donationDto);

    DonationDto acceptDonationRequest(String donationId);

    void rejectDonationRequest(String donationId);

    List<DonationDto> getDonationRequests(String status);

    List<DonationDto> getPerUserDonationRequests(String userId, String status);

    List<DonationDto> getAllNotProcessedRequests();

    DonationDto acceptPickupRequest(String donationId, String volunteerId);

    DonationDto completePickupRequest(String donationId, String volunteerId);

    Map<String, Object> getDonationRequestInfo(String donationId);

    List<DonationDto> getAllReadyToPickRequests(String volunteerId);

    List<DonationDto> getAllCompletedRequests(String userid);
}
