package com.military.assetmanagement.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.military.assetmanagement.entity.Base;
import com.military.assetmanagement.repository.BaseRepository;

import java.util.List;

@RestController
@RequestMapping("/api/bases")
public class BaseController {

    private final BaseRepository baseRepository;

    public BaseController(BaseRepository baseRepository) {
        this.baseRepository = baseRepository;
    }

    @GetMapping
    public List<Base> getAllBases() {
        return baseRepository.findAll();
    }

    @PostMapping
    public Base addBase(@RequestBody Base base) {
        return baseRepository.save(base);
    }

    @DeleteMapping("/{id}")
    public String deleteBase(@PathVariable Long id) {
        baseRepository.deleteById(id);
        return "Base deleted successfully";
    }
}
