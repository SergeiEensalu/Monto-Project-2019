package ee.ut.monto.service;

import ee.ut.monto.model.Category;
import ee.ut.monto.model.Transaction;
import ee.ut.monto.model.User;
import ee.ut.monto.model.Account;
import ee.ut.monto.repository.AccountRepository;
import ee.ut.monto.repository.CategoryRepository;
import ee.ut.monto.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Date;

public class FileTransactions {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private AccountRepository accountRepository;

    public void saveCSVFileBankStatements(String[][] bankStatements, User user) {
        try {
            for (int i = 0; i < bankStatements.length - 1; i++) {
                Date date = new SimpleDateFormat("dd.MM.yyyy").parse(bankStatements[i][0]);
                String categoryName = bankStatements[i][1];
                String description = bankStatements[i][2];
                Double sum = Double.parseDouble(bankStatements[i][3].replace(",", "."));

                if (bankStatements[i][4].equals("Expense"))
                    sum = -sum;

                String accountName = bankStatements[bankStatements.length - 1][0];
                saveBankStatement(date, categoryName, description, sum, user, accountName);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void saveBankStatement(Date date, String categoryName, String description, Double sum, User user, String accountName) {
        Category category = new Category();
        category.setName(categoryName);
        category.setUser(user);

        categoryRepository.save(category);
        Account account = accountRepository.findByName(accountName);

        Transaction transaction = new Transaction();
        transaction.setDate(date.toInstant());
        transaction.setCategory(category);
        transaction.setDescription(description);
        transaction.setSum(sum);
        transaction.setUser(user);
        transaction.setAccount(account);

        transactionRepository.save(transaction);
    }
}