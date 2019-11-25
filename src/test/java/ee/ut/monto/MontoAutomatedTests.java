package ee.ut.monto;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.*;
import org.junit.Test;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

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

    private void addTransaction(String type, String description, int sum) throws Exception{ // transactions should be open
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//button[text()='Add "+type+"']"))).click();
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("description")))).sendKeys(description);
        wait.until(ExpectedConditions.presenceOfElementLocated((By.id("sum")))).sendKeys(Integer.toString(sum));
        wait.until(ExpectedConditions.presenceOfElementLocated((By.xpath("//button[text()='Save']")))).click();

        Thread.sleep(1000); // because of modal animation
    }

    @Test
    public void uc1_3() throws Exception{
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
        login();
        Assert.assertEquals(driver.getCurrentUrl(), url);
        Assert.assertTrue(driver.getPageSource().contains("Transactions"));
    }

}
