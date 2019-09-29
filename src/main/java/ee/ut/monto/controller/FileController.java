package ee.ut.monto.controller;

import ee.ut.monto.service.FileTransactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity handleFileUpload(@RequestParam("file") MultipartFile multipartFile) {
        switch (multipartFile.getContentType()) {
            case "application/vnd.ms-excel":
                fileTransactions.saveXLSFileTransactions(multipartFile);
        }
        return ResponseEntity.ok().build();
    }
}