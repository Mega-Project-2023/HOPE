package com.devbots.food.donation.service.impl;

import com.devbots.food.donation.dao.DonationDao;
import com.devbots.food.donation.dto.DonationDto;
import com.devbots.food.donation.dto.UserDto;
import com.devbots.food.donation.entity.DonationReq;
import com.devbots.food.donation.exception.InSufficientDataException;
import com.devbots.food.donation.exception.PermissionDeniedException;
import com.devbots.food.donation.exception.UserNotFoundException;
import com.devbots.food.donation.mapper.DonationMapper;
import com.devbots.food.donation.service.AuthService;
import com.devbots.food.donation.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;

@Service
public class DonationServiceImpl implements DonationService {

    @Autowired
    private DonationDao donationDao;

    @Autowired
    private AuthService authService;

    @Override
    public DonationDto newDonationRequest(DonationDto donationDto) {
        try {
            String donationId = UUID.randomUUID().toString();
            donationDto.setDonationId(donationId);
            donationDto.setStatus("PENDING");

            if(donationDto.getAddress().isEmpty() ||
                    donationDto.getUserId().isEmpty() ||
                    donationDto.getNoOfHoursAfterPreparation() == -1 ||
                    donationDto.getNoOfPeople() == -1) {
                throw new InstantiationException("Required parameters are missing");
            }
            DonationReq newDonationReq = DonationMapper.mapToDonationReq(donationDto);
            newDonationReq = donationDao.save(newDonationReq);
            return DonationMapper.mapToDonationDto(newDonationReq);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public DonationDto acceptDonationRequest(String donationId) {
        try {
            if(donationId == null || "".equals(donationId)) {
                throw new InSufficientDataException("Required parameters are missing");
            }

            DonationReq donationReq = donationDao.findByDonationId(donationId).orElseThrow(
                    () -> { throw  new UserNotFoundException("Request not found");}
            );

            donationReq.setStatus("ACCEPTED");
            donationReq = donationDao.save(donationReq);
            return DonationMapper.mapToDonationDto(donationReq);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void rejectDonationRequest(String donationId) {
        try {
            if(donationId == null || "".equals(donationId)) {
                throw new InSufficientDataException("Required parameters are missing");
            }

            DonationReq donationReq = donationDao.findByDonationId(donationId).orElseThrow(
                    () -> { throw  new UserNotFoundException("Request not found");}
            );

            donationReq.setStatus("REJECTED");
            donationDao.save(donationReq);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<DonationDto> getDonationRequests(String status) {
        if(status == null || "".equals(status)) {
            throw new InSufficientDataException("Required parameters are missing");
        }

        List<DonationDto> response = new ArrayList<>();

        List<DonationReq> listDonationRequests = donationDao.findAll();
        for (DonationReq req: listDonationRequests) {
            if("all".equalsIgnoreCase(status) || status.equalsIgnoreCase(req.getStatus())) {
                response.add(DonationMapper.mapToDonationDto(req));
            }
        }

        return response;
    }

    @Override
    public List<DonationDto> getPerUserDonationRequests(String userId, String status) {
        if(status == null || "".equals(status)) {
            throw new InSufficientDataException("Required parameters are missing");
        }

        List<DonationDto> response = new ArrayList<>();

        List<DonationReq> listDonationRequests = new ArrayList<>();

        if("all".equalsIgnoreCase(status)) {
            listDonationRequests = donationDao.findAllDonationRequestByUserId(userId);
        } else {
            listDonationRequests = donationDao.findAllDonationRequestByStatusAndUserId(status, userId);
        }

        for (DonationReq req: listDonationRequests) {
                response.add(DonationMapper.mapToDonationDto(req));
        }

        return response;
    }

    @Override
    public List<DonationDto> getAllNotProcessedRequests() {
        List<DonationDto> response = new ArrayList<>();

        List<DonationReq> listDonationRequests = donationDao.findAllDonationRequestByStatus("ACCEPTED");
        for (DonationReq req: listDonationRequests) {
            if(req.getVolunteerId() == null || "".equals(req.getVolunteerId()))
                response.add(DonationMapper.mapToDonationDto(req));
        }

        return response;
    }

    @Override
    public DonationDto acceptPickupRequest(String donationId, String volunteerId) {
        if(StringUtils.isEmpty(donationId) || StringUtils.isEmpty(volunteerId)) {
            throw new InSufficientDataException("Missing required parameters.");
        }

        DonationReq donationReq = donationDao.findByDonationId(donationId).orElseThrow(()-> {
            throw new UserNotFoundException("Resource not found");
        });

        if(!StringUtils.isEmpty(donationReq.getVolunteerId())) {
            throw new PermissionDeniedException("This pickup is currently processing by another volunteer");
        }

        donationReq.setVolunteerId(volunteerId);
        donationReq.setStatus("PICKUP_SCHEDULED");
        DonationReq donationReq1 = donationDao.save(donationReq);
        return DonationMapper.mapToDonationDto(donationReq1);
    }

    @Override
    public DonationDto completePickupRequest(String donationId, String volunteerId) {
        if(StringUtils.isEmpty(donationId) || StringUtils.isEmpty(volunteerId)) {
            throw new InSufficientDataException("Missing required parameters.");
        }

        DonationReq donationReq = donationDao.findByDonationId(donationId).orElseThrow(()-> {
            throw new UserNotFoundException("Resource not found");
        });

        if(!StringUtils.isEmpty(donationReq.getVolunteerId()) && !volunteerId.equals(donationReq.getVolunteerId())) {
            throw new PermissionDeniedException("This pickup is currently processing by another volunteer");
        }

        donationReq.setStatus("COMPLETED");
        donationReq = donationDao.save(donationReq);
        return DonationMapper.mapToDonationDto(donationReq);
    }

    @Override
    public Map<String, Object> getDonationRequestInfo(String donationId) {
        Map<String, Object> response = new HashMap<>();
        if(StringUtils.isEmpty(donationId)) {
            throw new InSufficientDataException("Missing required parameters.");
        }

        DonationReq donationReq = donationDao.findByDonationId(donationId).orElseThrow(()-> {
            throw new UserNotFoundException("Resource not found");
        });

        if(donationReq.getVolunteerId() != null) {
            try {
                UserDto volunteer = authService.getUserById(donationReq.getVolunteerId());
                response.put("volunteerInfo",volunteer);
            } catch ( Exception e) {
                e.printStackTrace();
            }
        }

        if(donationReq.getUserId() != null) {
            try {
                UserDto user = authService.getUserById(donationReq.getUserId());
                response.put("userInfo",user);
            } catch ( Exception e) {
                e.printStackTrace();
            }
        }

        response.put("requestInfo",donationReq);
        return  response;
    }

    @Override
    public List<DonationDto> getAllReadyToPickRequests(String volunteerId) {
        List<DonationDto> response = new ArrayList<>();

        List<DonationReq> listDonationRequests = donationDao.findAllDonationRequestByStatus("PICKUP_SCHEDULED");
        for (DonationReq req: listDonationRequests) {
            if(req.getVolunteerId() != null && volunteerId.equals(req.getVolunteerId()))
                response.add(DonationMapper.mapToDonationDto(req));
        }

        return response;
    }

    @Override
    public List<DonationDto> getAllCompletedRequests(String volunteerId) {
        List<DonationDto> response = new ArrayList<>();

        List<DonationReq> listDonationRequests = donationDao.findAllDonationRequestByStatus("COMPLETED");
        for (DonationReq req: listDonationRequests) {
            if(req.getVolunteerId() != null && volunteerId.equals(req.getVolunteerId()))
                response.add(DonationMapper.mapToDonationDto(req));
        }

        return response;
    }
}
