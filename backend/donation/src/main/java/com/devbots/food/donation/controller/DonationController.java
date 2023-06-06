package com.devbots.food.donation.controller;

import com.devbots.food.donation.dto.DonationDto;
import com.devbots.food.donation.exception.PermissionDeniedException;
import com.devbots.food.donation.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/donation")
@CrossOrigin(origins = "http://localhost:4200")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @Autowired
    private RestTemplate restTemplate;

    public static final String authorizeURL = "http://localhost:8080/auth/verify-permissions";

    /*----USER APIs----*/
    @PostMapping("/new-request")
    public ResponseEntity<DonationDto> newDonationRequest(@RequestBody DonationDto donationDto, @RequestHeader Map<String, String> headers) {
        try {
            headers.put("authRole","ROLE_USER");
            HttpEntity<Map<String,String>> request = new HttpEntity<>(headers);
            callApi(authorizeURL,request, HttpMethod.POST);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        donationDto.setTimestamp(LocalDateTime.now());
        DonationDto newDonationRequest = donationService.newDonationRequest(donationDto);

        String eventUrl = "http://localhost:8080/event/admin/dispatch/newDonationRequest";
        HttpEntity<DonationDto> request = new HttpEntity<>(newDonationRequest);
        callApi(eventUrl,request, HttpMethod.POST);

        return new ResponseEntity<>(newDonationRequest, HttpStatus.CREATED);
    }

    @GetMapping("{userId}/get/{status}/requests")
    public ResponseEntity<List<DonationDto>> getPerUserDonationRequests(@PathVariable String userId, @PathVariable String status, @RequestHeader Map<String, String> headers) {
        try {
            headers.put("authRole","ROLE_USER");
            HttpEntity<Map<String,String>> request = new HttpEntity<>(headers);
            callApi(authorizeURL,request, HttpMethod.POST);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        List<DonationDto> listDonationRequests = donationService.getPerUserDonationRequests(userId, status);
        return new ResponseEntity<>(listDonationRequests, HttpStatus.OK);
    }

    /*----ADMIN APIs----*/
    @PutMapping("/accept-request/{donationId}")
    public ResponseEntity<DonationDto> acceptDonationRequest(@PathVariable String donationId, @RequestHeader Map<String, String> headers) {
        try {
            headers.put("authRole","ROLE_ADMIN");
            HttpEntity<Map<String,String>> request = new HttpEntity<>(headers);
            callApi(authorizeURL,request, HttpMethod.POST);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        DonationDto updatedDonationRequest = donationService.acceptDonationRequest(donationId);

        String eventUrl = "http://localhost:8080/event/volunteer/dispatch";
        HttpEntity<DonationDto> request = new HttpEntity<>(updatedDonationRequest);
        callApi(eventUrl,request, HttpMethod.POST);

        List<DonationDto> listDonationRequests = donationService.getDonationRequests("pending");
        eventUrl = "http://localhost:8080/event/admin/dispatch/requestUpdate";
        HttpEntity<Integer> req = new HttpEntity<>(listDonationRequests.size());
        callApi(eventUrl,req, HttpMethod.POST);

        eventUrl = "http://localhost:8080/event/user/"+updatedDonationRequest.getUserId()+"/dispatch/requestUpdate";
        request = new HttpEntity<>(updatedDonationRequest);
        callApi(eventUrl,request, HttpMethod.POST);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/reject-request/{donationId}")
    public ResponseEntity<DonationDto> rejectDonationRequest(@PathVariable String donationId, @RequestHeader Map<String, String> headers) {
        try {
            headers.put("authRole","ROLE_ADMIN");
            HttpEntity<Map<String,String>> request = new HttpEntity<>(headers);
            callApi(authorizeURL,request, HttpMethod.POST);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        donationService.rejectDonationRequest(donationId);

        List<DonationDto> listDonationRequests = donationService.getDonationRequests("pending");
        String eventUrl = "http://localhost:8080/event/admin/dispatch/requestUpdate";
        HttpEntity<Integer> req = new HttpEntity<>(listDonationRequests.size());
        callApi(eventUrl,req, HttpMethod.POST);

        eventUrl = "http://localhost:8080/event/user/"+headers.get("userid")+"/dispatch/requestUpdate";
        req = new HttpEntity<>(0);
        callApi(eventUrl,req, HttpMethod.POST);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get/{status}/requests")
    public ResponseEntity<List<DonationDto>> getDonationRequests(@PathVariable String status, @RequestHeader Map<String, String> headers) {
        try {
            headers.put("authRole","ROLE_ADMIN");
            HttpEntity<Map<String,String>> request = new HttpEntity<>(headers);
            callApi(authorizeURL,request, HttpMethod.POST);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        List<DonationDto> listDonationRequests = donationService.getDonationRequests(status);
        return new ResponseEntity<>(listDonationRequests, HttpStatus.OK);
    }

    @GetMapping("/get/{donationId}")
    public ResponseEntity<Object> getDonationRequestInfo(@PathVariable String donationId, @RequestHeader Map<String, String> headers) {
        try {
            HttpEntity<Map<String,String>> request = new HttpEntity<>(headers);
            callApi(authorizeURL,request, HttpMethod.POST);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        Map<String, Object> donationReq = donationService.getDonationRequestInfo(donationId);
        return new ResponseEntity<>(donationReq, HttpStatus.OK);
    }

    public void callApi(String url, HttpEntity<?> request, HttpMethod method) {
        ResponseEntity<String> resp = restTemplate.exchange(url, method, request, String.class);
    }

    /*----VOLUNTEER APIs----*/
    @GetMapping("/getall/not-processed/request")
    public ResponseEntity<List<DonationDto>> getAllNotProcessedRequests(@RequestHeader Map<String, String> headers) {
        try {
            headers.put("authRole","ROLE_VOLUNTEER");
            HttpEntity<Map<String,String>> request = new HttpEntity<>(headers);
            callApi(authorizeURL,request, HttpMethod.POST);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        List<DonationDto> listDonationRequests = donationService.getAllNotProcessedRequests();
        return new ResponseEntity<>(listDonationRequests, HttpStatus.OK);
    }

    @GetMapping("/getall/completed/request")
    public ResponseEntity<List<DonationDto>> getAllCompletedRequests(@RequestHeader Map<String, String> headers) {
        try {
            headers.put("authRole","ROLE_VOLUNTEER");
            HttpEntity<Map<String,String>> request = new HttpEntity<>(headers);
            callApi(authorizeURL,request, HttpMethod.POST);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        List<DonationDto> listDonationRequests = donationService.getAllCompletedRequests(headers.get("userid"));
        return new ResponseEntity<>(listDonationRequests, HttpStatus.OK);
    }


    @GetMapping("/getall/pickup/accepted/requests")
    public ResponseEntity<List<DonationDto>> getAllReadyToPickRequests(@RequestHeader Map<String, String> headers) {
        try {
            headers.put("authRole","ROLE_VOLUNTEER");
            HttpEntity<Map<String,String>> request = new HttpEntity<>(headers);
            callApi(authorizeURL,request, HttpMethod.POST);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        List<DonationDto> listDonationRequests = donationService.getAllReadyToPickRequests(headers.get("userid"));
        return new ResponseEntity<>(listDonationRequests, HttpStatus.OK);
    }

    @PutMapping("/accept-pickup/{donationId}/{volunteerId}")
    public ResponseEntity<DonationDto> acceptPickupRequest(@PathVariable String donationId, @PathVariable String volunteerId, @RequestHeader Map<String, String> headers) {
        try {
            headers.put("authRole","ROLE_VOLUNTEER");
            HttpEntity<Map<String,String>> request = new HttpEntity<>(headers);
            callApi(authorizeURL,request, HttpMethod.POST);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        DonationDto donationReq = donationService.acceptPickupRequest(donationId, volunteerId);
        String eventUrl = "http://localhost:8080/event/volunteer/dispatch";
        HttpEntity<DonationDto> request = new HttpEntity<>(donationReq);
        callApi(eventUrl,request, HttpMethod.POST);

        List<DonationDto> listDonationRequests = donationService.getDonationRequests("pending");
        eventUrl = "http://localhost:8080/event/admin/dispatch/requestUpdate";
        HttpEntity<Integer> req = new HttpEntity<>(listDonationRequests.size());
        callApi(eventUrl,req, HttpMethod.POST);

        eventUrl = "http://localhost:8080/event/user/"+donationReq.getUserId()+"/dispatch/requestUpdate";
        request = new HttpEntity<>(donationReq);
        callApi(eventUrl,request, HttpMethod.POST);

        return new ResponseEntity<>(donationReq, HttpStatus.OK);
    }

    @PutMapping("/complete-pickup/{donationId}/{volunteerId}")
    public ResponseEntity<DonationDto> completePickupRequest(@PathVariable String donationId, @PathVariable String volunteerId, @RequestHeader Map<String, String> headers) {
        try {
            headers.put("authRole","ROLE_VOLUNTEER");
            HttpEntity<Map<String,String>> request = new HttpEntity<>(headers);
            callApi(authorizeURL,request, HttpMethod.POST);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        if(!headers.getOrDefault("userid","").equals(volunteerId)) {
            throw new PermissionDeniedException("Permission denied");
        }
        DonationDto donationReq = donationService.completePickupRequest(donationId, volunteerId);

        List<DonationDto> listDonationRequests = donationService.getDonationRequests("pending");
        String eventUrl = "http://localhost:8080/event/admin/dispatch/requestUpdate";
        HttpEntity<Integer> req = new HttpEntity<>(listDonationRequests.size());
        callApi(eventUrl,req, HttpMethod.POST);

        eventUrl = "http://localhost:8080/event/user/"+donationReq.getUserId()+"/dispatch/requestUpdate";
        HttpEntity<DonationDto> request = new HttpEntity<>(donationReq);
        callApi(eventUrl,request, HttpMethod.POST);
        return new ResponseEntity<>(donationReq, HttpStatus.OK);
    }
}
