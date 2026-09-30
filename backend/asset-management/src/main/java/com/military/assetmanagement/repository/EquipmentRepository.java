package com.military.assetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.military.assetmanagement.entity.Equipment;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

}
