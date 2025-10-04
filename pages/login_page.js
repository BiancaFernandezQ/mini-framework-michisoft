export class LoginPage{
    constructor(page){
       this.page = page;
       this.username_input = page.locator("#loginusername");
       this.password_input = page.locator("#loginpassword");
       this.loginIn_button = page.locator(".btn.btn-primary");
       this.close_button = page.locator("btn.btn-secondary");
       this.list_products = page.locator("#tbodyid");
    }
    

    async goto(){
        await this.page.goto("https://www.saucedemo.com/");
    }

    async login(username, password){
        await this.username_input.fill(username);
        await this.password_input.fill(password);
        await this.loginIn_button.click();
    }

    async close(){
        await this.close_button.click();
    }


}