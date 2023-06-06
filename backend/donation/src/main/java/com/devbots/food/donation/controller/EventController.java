package com.devbots.food.donation.controller;

import com.devbots.food.donation.dto.DonationDto;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController()
@RequestMapping("/event")
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {
    public List<SseEmitter> adminEmitterList = new CopyOnWriteArrayList<>();
    public List<SseEmitter> volunteerEmitterList = new CopyOnWriteArrayList<>();
    public List<SseEmitter> userEmitterList = new CopyOnWriteArrayList<>();

    @RequestMapping("/admin/subscribe")
    public SseEmitter subscribe() {
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        try {
            sseEmitter.send(SseEmitter.event().name("INIT"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        sseEmitter.onCompletion(()-> adminEmitterList.remove(sseEmitter));
        adminEmitterList.add(sseEmitter);
        return sseEmitter;
    }

    @RequestMapping("/user/{userId}/subscribe")
    public SseEmitter userSubscribe(@PathVariable String userId) {
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        try {
            sseEmitter.send(SseEmitter.event().name(userId + "_INIT"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        sseEmitter.onCompletion(()-> userEmitterList.remove(sseEmitter));
        userEmitterList.add(sseEmitter);
        return sseEmitter;
    }

    @RequestMapping("/volunteer/subscribe")
    public SseEmitter volunteerSubscribe() {
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        try {
            sseEmitter.send(SseEmitter.event().name("INIT"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        sseEmitter.onCompletion(()-> volunteerEmitterList.remove(sseEmitter));
        volunteerEmitterList.add(sseEmitter);
        return sseEmitter;
    }

    @PostMapping("/admin/dispatch/{eventName}")
    public void adminDispatch(@PathVariable String eventName, @RequestBody Object event) {
        for (SseEmitter emitter : adminEmitterList) {
            try {
                emitter.send(SseEmitter.event().name(eventName).data(event));
            } catch (IOException e) {
                adminEmitterList.remove(emitter);
            }
        }
    }

    @PostMapping("/user/{userId}/dispatch/{eventName}")
    public void userDispatch(@PathVariable String userId,@PathVariable String eventName, @RequestBody Object event) {
        for (SseEmitter emitter : userEmitterList) {
            try {
                emitter.send(SseEmitter.event().name(userId+'_'+eventName).data(event));
            } catch (IOException e) {
                userEmitterList.remove(emitter);
            }
        }
    }

    @PostMapping("/volunteer/dispatch")
    public void volunteerDispatch(@RequestBody Map<String, String> event) {
        for (SseEmitter emitter : volunteerEmitterList) {
            try {
                emitter.send(SseEmitter.event().name("requestUpdate").data(event));
            } catch (IOException e) {
                volunteerEmitterList.remove(emitter);
            }
        }
    }
}
