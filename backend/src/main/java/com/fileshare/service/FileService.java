package com.fileshare.service;

import com.fileshare.dto.FileDTO;
import com.fileshare.model.FileEntity;
import com.fileshare.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FileService {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl;

    @Autowired
    private FileRepository fileRepository;

    public FileDTO uploadFile(MultipartFile file, String uploadedBy) throws IOException {
        // Create upload directory if not exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique stored file name
        String originalFileName = file.getOriginalFilename();
        String extension = "";
        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        String storedFileName = UUID.randomUUID().toString() + extension;
        String shareCode = UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        // Save file to disk
        Path filePath = uploadPath.resolve(storedFileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Save metadata to DB
        FileEntity entity = new FileEntity(
                originalFileName,
                storedFileName,
                file.getContentType(),
                file.getSize(),
                shareCode,
                uploadedBy
        );
        fileRepository.save(entity);

        return toDTO(entity);
    }

    public Resource downloadFile(String shareCode) throws MalformedURLException {
        FileEntity entity = fileRepository.findByShareCode(shareCode)
                .orElseThrow(() -> new RuntimeException("File not found with code: " + shareCode));

        // Increment download count
        entity.setDownloadCount(entity.getDownloadCount() + 1);
        fileRepository.save(entity);

        Path filePath = Paths.get(uploadDir).resolve(entity.getStoredFileName());
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists()) {
            throw new RuntimeException("File not found on server");
        }
        return resource;
    }

    public FileDTO getFileInfo(String shareCode) {
        FileEntity entity = fileRepository.findByShareCode(shareCode)
                .orElseThrow(() -> new RuntimeException("File not found with code: " + shareCode));
        return toDTO(entity);
    }

    public List<FileDTO> getAllFiles() {
        return fileRepository.findAllByOrderByUploadedAtDesc()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<FileDTO> getFilesByUser(String username) {
        return fileRepository.findByUploadedByOrderByUploadedAtDesc(username)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public void deleteFile(Long id) throws IOException {
        FileEntity entity = fileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found with id: " + id));

        // Delete from disk
        Path filePath = Paths.get(uploadDir).resolve(entity.getStoredFileName());
        Files.deleteIfExists(filePath);

        // Delete from DB
        fileRepository.delete(entity);
    }

    private FileDTO toDTO(FileEntity entity) {
        String shareUrl = baseUrl + "/api/files/download/" + entity.getShareCode();
        return new FileDTO(
                entity.getId(),
                entity.getOriginalFileName(),
                entity.getFileType(),
                entity.getFileSize(),
                entity.getShareCode(),
                entity.getUploadedAt(),
                entity.getExpiresAt(),
                entity.getDownloadCount(),
                entity.getUploadedBy(),
                shareUrl
        );
    }

    public String getOriginalFileName(String shareCode) {
        return fileRepository.findByShareCode(shareCode)
                .map(FileEntity::getOriginalFileName)
                .orElseThrow(() -> new RuntimeException("File not found"));
    }

    public String getFileContentType(String shareCode) {
        return fileRepository.findByShareCode(shareCode)
                .map(FileEntity::getFileType)
                .orElseThrow(() -> new RuntimeException("File not found"));
    }
}
