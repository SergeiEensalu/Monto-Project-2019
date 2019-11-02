package ee.ut.monto.service;

import ee.ut.monto.model.Category;
import ee.ut.monto.model.Transaction;
import ee.ut.monto.model.User;
import ee.ut.monto.repository.CategoryRepository;
import ee.ut.monto.repository.TransactionRepository;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import javax.print.DocFlavor;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;

public class FileTransactions {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public void saveXLSFileTransactions(MultipartFile multipartFile, User user) {
        try {
            HSSFWorkbook workbook = new HSSFWorkbook(multipartFile.getInputStream());
            HSSFSheet sheet = workbook.getSheetAt(0);
            HSSFRow row;
            HSSFCell cell;

            Date date = null;
            String categoryName = "";
            String description = "";
            double sum = 0.0;
            boolean EOF = false;

            Iterator rows = sheet.rowIterator();

            while (rows.hasNext() && !EOF) {
                row = (HSSFRow) rows.next();
                if (row.getRowNum() == 0 || row.getRowNum() == 1 || row.getRowNum() == 2 || row.getRowNum() == 3
                        || row.getRowNum() == 4) continue;
                Iterator cells = row.cellIterator();

                while (cells.hasNext()) {
                    cell = (HSSFCell) cells.next();
                    if (cell.getCellType() == CellType.STRING) {
                        if (cell.getStringCellValue().contains("closing balance")) {
                            EOF = true;
                            break;
                        }
                    }
                    switch (cell.getColumnIndex()) {
                        case 1:
                            date = cell.getDateCellValue();
                            break;
                        case 2:
                            categoryName = cell.getStringCellValue();
                            break;
                        case 3:
                            description = cell.getStringCellValue();
                            break;
                        case 4:
                            sum = cell.getNumericCellValue();
                            break;
                        default:
                            break;
                    }
                }
                if (!EOF)
                    saveTransaction(date, categoryName, description, sum, user);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void saveCSVFileTransactions(MultipartFile multipartFile, User user) {
        try {
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(multipartFile.getInputStream()));
            bufferedReader.readLine();
            bufferedReader.readLine();

            Date date = null;
            String categoryName = "";
            String description = "";
            double sum = 0.0;

            String row;

            while ((row = bufferedReader.readLine()) != null) {
                String[] data = row.split(";");
                if (!data[3].equals("\"\"") && !data[3].equals("\"\"\"\"")) {
                    date = new SimpleDateFormat("dd/MM/yyyy").parse(data[2].replace("\"", "").replace(".", "/"));
                    categoryName = data[3].replace("\"", "");
                    description = data[4].replace("\"", "");
                    sum = Double.parseDouble(data[5].replace("\"", "").replace(",", "."));
                    if (data[9].equals("\"K\"") || data[9].equals("\"\"K\"\""))
                        sum = -sum;
                    saveTransaction(date, categoryName, description, sum, user);
                }
            }
            bufferedReader.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    private void saveTransaction(Date date, String categoryName, String description, Double sum, User user) {
        Category category = new Category();
        category.setName(categoryName);

        categoryRepository.save(category);

        Transaction transaction = new Transaction();
        transaction.setDate(date.toInstant());
        transaction.setCategory(category);
        transaction.setDescription(description);
        transaction.setSum(sum);
        transaction.setUser(user);

        transactionRepository.save(transaction);
    }
}