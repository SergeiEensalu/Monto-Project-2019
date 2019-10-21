package ee.ut.monto.controller;

import ee.ut.monto.model.User;
import ee.ut.monto.service.FileTransactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@Controller
@RequestMapping(path = "/fileUploading")
public class FileController {
    @Autowired
    private FileTransactions fileTransactions;

    @Bean
    public FileTransactions fileTransactions() {
        return new FileTransactions();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity handleFileUpload(@RequestParam("file") MultipartFile multipartFile, Authentication authentication) {
        if (multipartFile.getOriginalFilename().endsWith(".xls"))
            fileTransactions.saveXLSFileTransactions(multipartFile, (User) authentication.getPrincipal());
        else {
            fileTransactions.saveCSVFileTransactions(multipartFile, (User) authentication.getPrincipal());
        }
        return ResponseEntity.ok().build();
    }
}