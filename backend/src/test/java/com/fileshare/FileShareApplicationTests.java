package com.fileshare;

import com.fileshare.model.FileEntity;
import com.fileshare.repository.FileRepository;
import com.fileshare.service.FileService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class FileShareApplicationTests {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private FileService fileService;

    @Test
    void contextLoads() {
        assertThat(fileRepository).isNotNull();
        assertThat(fileService).isNotNull();
    }

    @Test
    void testSaveAndFindFile() {
        FileEntity entity = new FileEntity(
                "test.txt",
                "stored-test.txt",
                "text/plain",
                1024L,
                "TESTCODE",
                "testuser"
        );
        fileRepository.save(entity);

        var found = fileRepository.findByShareCode("TESTCODE");
        assertThat(found).isPresent();
        assertThat(found.get().getOriginalFileName()).isEqualTo("test.txt");
        assertThat(found.get().getUploadedBy()).isEqualTo("testuser");

        // Clean up
        fileRepository.delete(entity);
    }

    @Test
    void testFindAllFiles() {
        List<FileEntity> files = fileRepository.findAllByOrderByUploadedAtDesc();
        assertThat(files).isNotNull();
    }
}
