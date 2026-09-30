package com.military.assetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.military.assetmanagement.entity.Transfer;

public interface TransferRepository extends JpaRepository<Transfer, Long> {

}
