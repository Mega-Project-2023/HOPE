package com.devbots.food.donation.mapper;

import com.devbots.food.donation.dto.DonationDto;
import com.devbots.food.donation.entity.DonationReq;

public class DonationMapper {

    public static DonationReq mapToDonationReq(DonationDto donationDto) {
        DonationReq donationReq = new DonationReq();
        donationReq.setDonationId(donationDto.getDonationId());
        donationReq.setUserId(donationDto.getUserId());
        donationReq.setAddress(donationDto.getAddress());
        donationReq.setComment(donationDto.getComment());
        donationReq.setStatus(donationDto.getStatus());
        donationReq.setNoOfPeople(donationDto.getNoOfPeople());
        donationReq.setNoOfHoursAfterPreparation(donationDto.getNoOfHoursAfterPreparation());
        return donationReq;
    }

    public static DonationDto mapToDonationDto(DonationReq donationreq) {
        DonationDto donationDto = new DonationDto();
        donationDto.setDonationId(donationreq.getDonationId());
        donationDto.setUserId(donationreq.getUserId());
        donationDto.setAddress(donationreq.getAddress());
        donationDto.setComment(donationreq.getComment());
        donationDto.setStatus(donationreq.getStatus());
        donationDto.setNoOfPeople(donationreq.getNoOfPeople());
        donationDto.setNoOfHoursAfterPreparation(donationreq.getNoOfHoursAfterPreparation());
        if(donationreq.getVolunteerId() != null) {
            donationDto.setVolunteerId(donationDto.getVolunteerId());
        }
        return donationDto;
    }
}
