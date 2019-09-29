package ee.ut.monto.service;

import ee.ut.monto.model.Category;
import ee.ut.monto.model.Expense;
import ee.ut.monto.model.Income;
import ee.ut.monto.repository.CategoryRepository;
import ee.ut.monto.repository.ExpenseRepository;
import ee.ut.monto.repository.IncomeRepository;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.Iterator;
public class FileTransactions {
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private IncomeRepository incomeRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public void saveXLSFileTransactions(MultipartFile multipartFile) {
        try {
            HSSFWorkbook workbook = new HSSFWorkbook(multipartFile.getInputStream());
            HSSFSheet sheet = workbook.getSheetAt(0);
            HSSFRow row;
            HSSFCell cell;

            Date date = null;
            String categoryName = "";
            String description = "";
            Double sum = 0.0;

            Iterator rows = sheet.rowIterator();

            while (rows.hasNext()) {
                row = (HSSFRow) rows.next();
                if (row.getRowNum() == 0 || row.getRowNum() == 1 || row.getRowNum() == 2 || row.getRowNum() == 3
                        || row.getRowNum() == 4) continue;
                Iterator cells = row.cellIterator();

                while (cells.hasNext()) {
                    cell = (HSSFCell) cells.next();
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
                saveTransaction(date, categoryName, description, sum);
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void saveTransaction(Date date, String categoryName, String description, Double sum) {
        Category category = new Category();
        category.setName(categoryName);
        categoryRepository.save(category);
        if (sum < 0) {
            Expense expense = new Expense();
            expense.setExpensedate(date.toInstant());
            expense.setCategory(category);
            expense.setDescription(description);
            expense.setSum(sum);
            expenseRepository.save(expense);
        } else {
            Income income = new Income();
            income.setIncomeDate(date.toInstant());
            income.setCategory(category);
            income.setDescription(description);
            income.setSum(sum);
            incomeRepository.save(income);
        }
    }
}