package com.military.assetmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.military.assetmanagement.entity.Equipment;
import com.military.assetmanagement.repository.EquipmentRepository;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {

    private final EquipmentRepository equipmentRepository;

    public EquipmentController(EquipmentRepository equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    @GetMapping
    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    @PostMapping
    public Equipment addEquipment(@RequestBody Equipment equipment) {
        equipment.setOpeningBalance(equipment.getQuantity());

        return equipmentRepository.save(equipment);
    }

    @PutMapping("/{id}/opening-balance")
    public Equipment updateOpeningBalance(
        @PathVariable Long id,
        @RequestBody int openingBalance) {

        Equipment equipment = equipmentRepository
            .findById(id)
            .orElseThrow();

        equipment.setOpeningBalance(openingBalance);

        return equipmentRepository.save(equipment);
    }

    @DeleteMapping("/{id}")
    public String deleteEquipment(@PathVariable Long id) {
        equipmentRepository.deleteById(id);
        return "Equipment deleted successfully";
    }
}
