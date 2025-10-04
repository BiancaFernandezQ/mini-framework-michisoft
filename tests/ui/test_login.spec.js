import {expect} from "@playwright/test";
import {LoginPage} from "../../pages/login_page.js";
import {test} from "@playwright/test";




test.describe.only("Login Page", () => {
   let loginPage;

   test.beforeEach(async ({ page }) => {
    console.log("Se ejecuta ANTES de cada test");
    loginPage = new LoginPage(page);
    await loginPage.goto();
    
   });

    test.afterEach(async () => {
    console.log("Se ejecuta DESPUÉS de cada test");
    });


  test("Validar que el loguin fue exitoso",async({page})=>{
     await loginPage.login("danielab", "1234"); 
     //Validar que la lista de productos está visible
    await expect(loginPage.products_list).toBeVisible();
     
  });


});