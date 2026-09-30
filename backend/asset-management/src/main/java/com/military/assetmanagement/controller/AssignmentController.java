package com.military.assetmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;

import com.military.assetmanagement.entity.Assignment;
import com.military.assetmanagement.entity.Equipment;
import com.military.assetmanagement.repository.AssignmentRepository;
import com.military.assetmanagement.repository.EquipmentRepository;
import com.military.assetmanagement.entity.AuditLog;
import com.military.assetmanagement.repository.AuditLogRepository;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final AssignmentRepository assignmentRepository;
    private final EquipmentRepository equipmentRepository;
    private final AuditLogRepository auditLogRepository;

    public AssignmentController(AssignmentRepository assignmentRepository,
                            EquipmentRepository equipmentRepository,
                            AuditLogRepository auditLogRepository) {
        this.assignmentRepository = assignmentRepository;
        this.equipmentRepository = equipmentRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    @PostMapping
    @Transactional
    public Assignment addAssignment(@RequestBody Assignment assignment) {

        Equipment equipment = equipmentRepository
                .findById(assignment.getEquipmentId())
                .orElseThrow();

        if (assignment.getQuantity() <= 0) {
            throw new RuntimeException("Assignment quantity must be greater than 0");
        }

        if (!equipment.getBaseId().equals(assignment.getBaseId())) {
            throw new RuntimeException(
                "Equipment does not belong to selected base");
        }

        if (equipment.getQuantity() < assignment.getQuantity()) {
            throw new RuntimeException("Not enough equipment available");
        }

        equipment.setQuantity(
                equipment.getQuantity() - assignment.getQuantity()
        );

        equipmentRepository.save(equipment);

        AuditLog auditLog = new AuditLog();
        auditLog.setAction("ASSIGNMENT");
        auditLog.setDetails(
            "Assigned " + assignment.getQuantity()
            + " units of equipment ID " + assignment.getEquipmentId()
            + " to " + assignment.getPersonnelName()
            + " at base ID " + assignment.getBaseId()
        );
        auditLog.setTimestamp(java.time.LocalDateTime.now().toString());

        auditLogRepository.save(auditLog);

        return assignmentRepository.save(assignment);
    }
}