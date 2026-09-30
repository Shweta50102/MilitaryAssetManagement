package com.military.assetmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;

import com.military.assetmanagement.entity.Equipment;
import com.military.assetmanagement.entity.Expenditure;
import com.military.assetmanagement.repository.EquipmentRepository;
import com.military.assetmanagement.repository.ExpenditureRepository;
import com.military.assetmanagement.entity.AuditLog;
import com.military.assetmanagement.repository.AuditLogRepository;

@RestController
@RequestMapping("/api/expenditures")
public class ExpenditureController {

    private final ExpenditureRepository expenditureRepository;
    private final EquipmentRepository equipmentRepository;
    private final AuditLogRepository auditLogRepository;

    public ExpenditureController(ExpenditureRepository expenditureRepository,
                             EquipmentRepository equipmentRepository,
                             AuditLogRepository auditLogRepository) {
        this.expenditureRepository = expenditureRepository;
        this.equipmentRepository = equipmentRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @GetMapping
    public List<Expenditure> getAllExpenditures() {
        return expenditureRepository.findAll();
    }

    @PostMapping
    @Transactional
    public Expenditure addExpenditure(@RequestBody Expenditure expenditure) {

        Equipment equipment = equipmentRepository
                .findById(expenditure.getEquipmentId())
                .orElseThrow();

        if (expenditure.getQuantity() <= 0) {
            throw new RuntimeException("Expenditure quantity must be greater than 0");
        }

        if (!equipment.getBaseId().equals(expenditure.getBaseId())) {
            throw new RuntimeException(
                "Equipment does not belong to selected base");
        }

        if (equipment.getQuantity() < expenditure.getQuantity()) {
            throw new RuntimeException("Not enough equipment available");
        }

        equipment.setQuantity(
                equipment.getQuantity() - expenditure.getQuantity()
        );

        equipmentRepository.save(equipment);

        AuditLog auditLog = new AuditLog();
        auditLog.setAction("EXPENDITURE");
        auditLog.setDetails(
            "Expended " + expenditure.getQuantity()
            + " units of equipment ID " + expenditure.getEquipmentId()
            + " at base ID " + expenditure.getBaseId()
            + " for reason: " + expenditure.getReason()
        );
        auditLog.setTimestamp(java.time.LocalDateTime.now().toString());

        auditLogRepository.save(auditLog);

        return expenditureRepository.save(expenditure);
    }
}