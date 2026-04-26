package com.fileshare.controller;

import com.fileshare.dto.FileDTO;
import com.fileshare.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {

    @Autowired
    private FileService fileService;

    // Upload a file
    @PostMapping("/upload")
    public ResponseEntity<FileDTO> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "uploadedBy", defaultValue = "Anonymous") String uploadedBy) {
        try {
            FileDTO dto = fileService.uploadFile(file, uploadedBy);
            return ResponseEntity.ok(dto);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Download a file by share code
    @GetMapping("/download/{shareCode}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String shareCode) {
        try {
            Resource resource = fileService.downloadFile(shareCode);
            String originalFileName = fileService.getOriginalFileName(shareCode);
            String contentType = fileService.getFileContentType(shareCode);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(
                            contentType != null ? contentType : "application/octet-stream"))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + originalFileName + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Get file info by share code
    @GetMapping("/info/{shareCode}")
    public ResponseEntity<FileDTO> getFileInfo(@PathVariable String shareCode) {
        try {
            FileDTO dto = fileService.getFileInfo(shareCode);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Get all files
    @GetMapping("/all")
    public ResponseEntity<List<FileDTO>> getAllFiles() {
        return ResponseEntity.ok(fileService.getAllFiles());
    }

    // Get files by user
    @GetMapping("/user/{username}")
    public ResponseEntity<List<FileDTO>> getFilesByUser(@PathVariable String username) {
        return ResponseEntity.ok(fileService.getFilesByUser(username));
    }

    // Delete a file
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteFile(@PathVariable Long id) {
        try {
            fileService.deleteFile(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "File deleted successfully");
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Health check
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "File Share API");
        return ResponseEntity.ok(response);
    }
}
