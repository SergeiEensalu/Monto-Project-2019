package ee.ut.monto;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MontoAutomatedTests {
    WebDriver driver = new ChromeDriver();
    WebDriverWait wait = new WebDriverWait(driver, 10);
    String url = "http://localhost:3000/";

    String email = "test@gmail.com";
    String password = "testpassword";

    private void register() {
        driver.navigate().to(url);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//a[text()='Sign Up']"))).click();

        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("email")))).sendKeys(email);
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("password")))).sendKeys(password);
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("repeatedPassword")))).sendKeys(password);

        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Register']")))).click();
    }

    private void login() {
        driver.navigate().to(url);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//a[text()='Log In']"))).click();

        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("email")))).sendKeys(email);
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("password")))).sendKeys(password);

        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Log in']")))).click();
    }

    private void addTransaction(String type, String description, int sum) throws Exception { // transactions should be open
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//button[text()='Add " + type + "']"))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("description")))).sendKeys(description);
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("sum")))).sendKeys(Integer.toString(sum));
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Save']")))).click();

        Thread.sleep(1000); // because of modal animation
    }

    private void editTransaction(String description, int sum) throws Exception {
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("description")))).sendKeys(description);
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("sum")))).sendKeys(Integer.toString(sum));
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Save']")))).click();

        Thread.sleep(1000); // because of modal animation
    }

    private void addCategory(String name) throws Exception {
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Edit']")))).click();
        Thread.sleep(1000); // because of modal animation
        // siin mingi mure ei leia edit nuppu
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Edit']")))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Add category']")))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("Name")))).sendKeys(name);
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Save']")))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Go back']")))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Save']")))).click();
    }

    private void editCategory(String editedName) throws Exception {
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Edit']")))).click();
        Thread.sleep(1000); // because of modal animation
        // siin mingi mure ei leia edit nuppu
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Edit']")))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Edit']")))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("Name")))).clear();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("Name")))).sendKeys(editedName);
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Save']")))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Go back']")))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Save']")))).click();
    }

    private void deleteCategory() {
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Edit']")))).click();
        // siin mingi mure ei leia edit nuppu
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Edit']")))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Delete']")))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Go back']")))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Save']")))).click();

    }

    @Test
    public void uc1_3() throws Exception {
        register();
        login();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//a[text()='Transactions']"))).click();
        addTransaction("expense", "test expense", 20);

        Assert.assertTrue(driver.getPageSource().contains("−20,00"));
        Assert.assertTrue(driver.getPageSource().contains("test expense"));

        wait.until(ExpectedConditions.elementToBeClickable((By.xpath("//button[text()='Delete']")))).click();

        addTransaction("income", "test income", 20);

        Assert.assertTrue(driver.getPageSource().contains("20,00"));
        Assert.assertTrue(driver.getPageSource().contains("test income"));

        wait.until(ExpectedConditions.elementToBeClickable((By.xpath("//button[text()='Delete']")))).click();
    }

    @Test
    public void uc2() {
        Assert.assertFalse(driver.getPageSource().contains("Transactions"));
        register();
        login();
        Assert.assertEquals(driver.getCurrentUrl(), url);
        Assert.assertTrue(driver.getPageSource().contains("Transactions"));
    }

    @Test
    public void uc4_5() {
        Assert.assertFalse(driver.getPageSource().contains("Dashboard"));
        register();
        Assert.assertTrue(driver.getPageSource().contains("Dashboard"));
    }

    @Test
    public void uc4() throws Exception {
        login();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//a[text()='Transactions']"))).click();
        addTransaction("expense", "test expense", 20);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//a[text()='Dashboard']"))).click();
        Assert.assertTrue(driver.getPageSource().contains("Dashboard"));
    }

    @Test
    public void uc6() throws Exception {
        login();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//a[text()='Transactions']"))).click();
        wait.until(ExpectedConditions.elementToBeClickable((By.xpath("//button[text()='Edit']")))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("description")))).clear();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("sum")))).clear();
        editTransaction("Edited transaction", 300);
        Assert.assertTrue(driver.getPageSource().contains("Edited transaction"));
    }

    @Test
    public void uc7() throws Exception {
        login();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//a[text()='Transactions']"))).click();
        addTransaction("expense", "Might delete later", 20);
        wait.until(ExpectedConditions.elementToBeClickable((By.xpath("//button[text()='Delete']")))).click();
        Assert.assertFalse(driver.getPageSource().contains("Might delete later"));
    }

    @Test
    public void uc9() throws Exception {
        login();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//a[text()='Transactions']"))).click();
        wait.until(ExpectedConditions.elementToBeClickable((By.xpath("//button[text()='Edit']")))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("description")))).clear();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("sum")))).clear();
        editTransaction("Edited transaction", 300);
        Assert.assertTrue(driver.getPageSource().contains("Edited transaction"));
    }

    @Test
    public void uc10() throws Exception {
        login();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//a[text()='Transactions']"))).click();
        addTransaction("income", "Might delete later", 20);
        wait.until(ExpectedConditions.elementToBeClickable((By.xpath("//button[text()='Delete']")))).click();
        Assert.assertFalse(driver.getPageSource().contains("Might delete later"));
    }
    // hetkel ei tööta, kuna ei leia Modalist edit nuppu
    @Test
    public void uc11() throws Exception {
        login();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//a[text()='Transactions']"))).click();
        addCategory("Sport");
        editCategory("Sports");
        deleteCategory();
    }
}
