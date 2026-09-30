package com.military.assetmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;

import com.military.assetmanagement.entity.Equipment;
import com.military.assetmanagement.entity.Purchase;
import com.military.assetmanagement.repository.EquipmentRepository;
import com.military.assetmanagement.repository.PurchaseRepository;
import com.military.assetmanagement.entity.AuditLog;
import com.military.assetmanagement.repository.AuditLogRepository;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final PurchaseRepository purchaseRepository;
    private final EquipmentRepository equipmentRepository;
    private final AuditLogRepository auditLogRepository;

    public PurchaseController(PurchaseRepository purchaseRepository,
                               EquipmentRepository equipmentRepository,
                                AuditLogRepository auditLogRepository) {
        this.purchaseRepository = purchaseRepository;
        this.equipmentRepository = equipmentRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @GetMapping
    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }

    @PostMapping
    @Transactional
    public Purchase addPurchase(@RequestBody Purchase purchase) {

        Equipment equipment = equipmentRepository
                .findById(purchase.getEquipmentId())
                .orElseThrow();

        if (purchase.getQuantity() <= 0) {
            throw new RuntimeException("Purchase quantity must be greater than 0");
        }

        if (!equipment.getBaseId().equals(purchase.getBaseId())) {
            throw new RuntimeException(
                    "Equipment does not belong to selected base");
        }

        equipment.setQuantity(
                equipment.getQuantity() + purchase.getQuantity()
        );

        equipmentRepository.save(equipment);

        AuditLog auditLog = new AuditLog();
        auditLog.setAction("PURCHASE");
        auditLog.setDetails(
                "Purchased " + purchase.getQuantity()
                + " units of equipment ID " + purchase.getEquipmentId()
                + " for base ID " + purchase.getBaseId()
        );
        auditLog.setTimestamp(java.time.LocalDateTime.now().toString());

        auditLogRepository.save(auditLog);
        
        return purchaseRepository.save(purchase);
    }
}