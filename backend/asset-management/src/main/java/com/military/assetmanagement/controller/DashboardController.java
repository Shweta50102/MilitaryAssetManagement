package com.military.assetmanagement.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import com.military.assetmanagement.entity.Dashboard;
import com.military.assetmanagement.repository.AssignmentRepository;
import com.military.assetmanagement.repository.ExpenditureRepository;
import com.military.assetmanagement.repository.PurchaseRepository;
import com.military.assetmanagement.repository.TransferRepository;
import com.military.assetmanagement.repository.EquipmentRepository;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final PurchaseRepository purchaseRepository;
    private final TransferRepository transferRepository;
    private final AssignmentRepository assignmentRepository;
    private final ExpenditureRepository expenditureRepository;
    private final EquipmentRepository equipmentRepository;

    public DashboardController(PurchaseRepository purchaseRepository,
                                TransferRepository transferRepository,
                                AssignmentRepository assignmentRepository,
                                ExpenditureRepository expenditureRepository,
                                EquipmentRepository equipmentRepository) {
        this.purchaseRepository = purchaseRepository;
        this.transferRepository = transferRepository;
        this.assignmentRepository = assignmentRepository;
        this.expenditureRepository = expenditureRepository;
        this.equipmentRepository = equipmentRepository;
    }

    @GetMapping
    public Dashboard getDashboard(
        @RequestParam(required = false) Long baseId,
        @RequestParam(required = false) String equipmentType,
        @RequestParam(required = false) String startDate,
        @RequestParam(required = false) String endDate) {

        Dashboard dashboard = new Dashboard();

        int purchases = purchaseRepository.findAll()
                .stream()
                .filter(purchase -> baseId == null ||
                        purchase.getBaseId().equals(baseId))
                .filter(purchase -> equipmentType == null ||
                        equipmentRepository.findById(purchase.getEquipmentId())
                                .map(equipment ->
                                        equipment.getType()
                                                .equalsIgnoreCase(equipmentType))
                                .orElse(false))
                .filter(purchase -> {
                    String date = purchase.getPurchaseDate();

                    if (startDate == null && endDate == null) {
                        return true;
                    }

                    if (date == null) {
                        return false;
                    }

                    return (startDate == null ||
                            date.compareTo(startDate) >= 0)
                            &&
                            (endDate == null ||
                            date.compareTo(endDate) <= 0);
                })
                .mapToInt(purchase -> purchase.getQuantity())
                .sum();

        int transferOut = transferRepository.findAll()
                .stream()
                .filter(transfer -> baseId == null ||
                        transfer.getFromBaseId().equals(baseId))
                .filter(transfer -> equipmentType == null ||
                        equipmentRepository.findById(transfer.getEquipmentId())
                                .map(equipment ->
                                        equipment.getType()
                                                .equalsIgnoreCase(equipmentType))
                                .orElse(false))
                .filter(transfer -> {
                    String date = transfer.getTransferDate();

                    if (startDate == null && endDate == null) {
                        return true;
                    }

                    if (date == null) {
                        return false;
                    }

                    return (startDate == null ||
                            date.compareTo(startDate) >= 0)
                            &&
                            (endDate == null ||
                            date.compareTo(endDate) <= 0);
                })
                .mapToInt(transfer -> transfer.getQuantity())
                .sum();

        int transferIn = transferRepository.findAll()
                .stream()
                .filter(transfer -> baseId == null ||
                        transfer.getToBaseId().equals(baseId))
                .filter(transfer -> equipmentType == null ||
                        equipmentRepository.findById(transfer.getEquipmentId())
                                .map(equipment ->
                                        equipment.getType()
                                                .equalsIgnoreCase(equipmentType))
                                .orElse(false))
                .filter(transfer -> {
                    String date = transfer.getTransferDate();

                    if (startDate == null && endDate == null) {
                        return true;
                    }

                    if (date == null) {
                        return false;
                    }

                    return (startDate == null ||
                            date.compareTo(startDate) >= 0)
                            &&
                            (endDate == null ||
                            date.compareTo(endDate) <= 0);
                })
                .mapToInt(transfer -> transfer.getQuantity())
                .sum();

        int assigned = assignmentRepository.findAll()
                .stream()
                .filter(assignment -> baseId == null ||
                        assignment.getBaseId().equals(baseId))
                .filter(assignment -> equipmentType == null ||
                        equipmentRepository.findById(assignment.getEquipmentId())
                                .map(equipment ->
                                        equipment.getType()
                                                .equalsIgnoreCase(equipmentType))
                                .orElse(false))
                .filter(assignment -> {
                    String date = assignment.getAssignmentDate();

                    if (startDate == null && endDate == null) {
                        return true;
                    }

                    if (date == null) {
                        return false;
                    }

                    return (startDate == null ||
                            date.compareTo(startDate) >= 0)
                            &&
                            (endDate == null ||
                            date.compareTo(endDate) <= 0);
                })
                .mapToInt(assignment -> assignment.getQuantity())
                .sum();

        int expended = expenditureRepository.findAll()
                .stream()
                .filter(expenditure -> baseId == null ||
                        expenditure.getBaseId().equals(baseId))
                .filter(expenditure -> equipmentType == null ||
                        equipmentRepository.findById(expenditure.getEquipmentId())
                                .map(equipment ->
                                        equipment.getType()
                                                .equalsIgnoreCase(equipmentType))
                                .orElse(false))
                .filter(expenditure -> {
                    String date = expenditure.getExpenditureDate();

                    if (startDate == null && endDate == null) {
                        return true;
                    }

                    if (date == null) {
                        return false;
                    }

                    return (startDate == null ||
                            date.compareTo(startDate) >= 0)
                            &&
                            (endDate == null ||
                            date.compareTo(endDate) <= 0);
                })
                .mapToInt(expenditure -> expenditure.getQuantity())
                .sum();

        int netMovement = purchases + transferIn - transferOut;

        dashboard.setPurchases(purchases);
        dashboard.setTransferOut(transferOut);
        dashboard.setTransferIn(transferIn);
        dashboard.setAssigned(assigned);
        dashboard.setExpended(expended);
        dashboard.setNetMovement(netMovement);

        int closingBalance = equipmentRepository.findAll()
                .stream()
                .filter(equipment -> baseId == null ||
                        equipment.getBaseId().equals(baseId))
                .filter(equipment -> equipmentType == null ||
                        equipment.getType().equalsIgnoreCase(equipmentType))
                .mapToInt(equipment -> equipment.getQuantity())
                .sum();

        int openingBalance = equipmentRepository.findAll()
                .stream()
                .filter(equipment -> baseId == null ||
                        equipment.getBaseId().equals(baseId))
                .filter(equipment -> equipmentType == null ||
                        equipment.getType().equalsIgnoreCase(equipmentType))
                .mapToInt(equipment -> equipment.getOpeningBalance())
                .sum();

        dashboard.setOpeningBalance(openingBalance);
        dashboard.setClosingBalance(closingBalance);

        return dashboard;
    }
}