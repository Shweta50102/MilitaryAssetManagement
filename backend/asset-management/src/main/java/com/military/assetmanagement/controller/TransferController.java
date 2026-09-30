package com.military.assetmanagement.controller;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.military.assetmanagement.entity.Equipment;
import com.military.assetmanagement.entity.Transfer;
import com.military.assetmanagement.repository.EquipmentRepository;
import com.military.assetmanagement.repository.TransferRepository;
import com.military.assetmanagement.entity.AuditLog;
import com.military.assetmanagement.repository.AuditLogRepository;

@RestController
@RequestMapping("/api/transfers")
public class TransferController {

    private final TransferRepository transferRepository;
    private final EquipmentRepository equipmentRepository;
    private final AuditLogRepository auditLogRepository;

    public TransferController(TransferRepository transferRepository,
                          EquipmentRepository equipmentRepository,
                          AuditLogRepository auditLogRepository) {
        this.transferRepository = transferRepository;
        this.equipmentRepository = equipmentRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @GetMapping
    public List<Transfer> getAllTransfers() {
        return transferRepository.findAll();
    }

    @PostMapping
    public Transfer addTransfer(@RequestBody Transfer transfer) {

        Equipment sourceEquipment = equipmentRepository
                .findById(transfer.getEquipmentId())
                .orElseThrow();

        if (!sourceEquipment.getBaseId().equals(transfer.getFromBaseId())) {
            throw new RuntimeException(
                    "Equipment does not belong to selected source base");
        }

        if (transfer.getQuantity() <= 0) {
            throw new RuntimeException("Transfer quantity must be greater than 0");
        }

        if (transfer.getFromBaseId().equals(transfer.getToBaseId())) {
            throw new RuntimeException(
                "Source and destination bases must be different");
        }

        if (sourceEquipment.getQuantity() < transfer.getQuantity()) {
            throw new RuntimeException("Not enough equipment available");
        }

        sourceEquipment.setQuantity(
                sourceEquipment.getQuantity() - transfer.getQuantity()
        );

        equipmentRepository.save(sourceEquipment);

        Equipment destinationEquipment = equipmentRepository.findAll()
                .stream()
                .filter(equipment ->
                        equipment.getBaseId().equals(transfer.getToBaseId()))
                .filter(equipment ->
                        equipment.getCode().equals(sourceEquipment.getCode()))
                .findFirst()
                .orElse(null);

        if (destinationEquipment == null) {

            destinationEquipment = new Equipment();

            destinationEquipment.setName(sourceEquipment.getName());
            destinationEquipment.setType(sourceEquipment.getType());
            destinationEquipment.setCode(sourceEquipment.getCode());
            destinationEquipment.setQuantity(transfer.getQuantity());
            destinationEquipment.setOpeningBalance(0);
            destinationEquipment.setBaseId(transfer.getToBaseId());

        } else {

            destinationEquipment.setQuantity(
                    destinationEquipment.getQuantity()
                            + transfer.getQuantity()
            );
        }

        equipmentRepository.save(destinationEquipment);

        AuditLog auditLog = new AuditLog();
        auditLog.setAction("TRANSFER");
        auditLog.setDetails(
            "Transferred " + transfer.getQuantity()
            + " units of equipment ID " + transfer.getEquipmentId()
            + " from base ID " + transfer.getFromBaseId()
            + " to base ID " + transfer.getToBaseId()
        );
        auditLog.setTimestamp(java.time.LocalDateTime.now().toString());

        auditLogRepository.save(auditLog);

        return transferRepository.save(transfer);
    }
}