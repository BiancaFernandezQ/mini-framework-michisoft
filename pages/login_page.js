export class LoginPage{
    constructor(page){
       this.page = page;
       this.username_input = page.locator("#loginusername");
       this.password_input = page.locator("#loginpassword");
       //<a class="nav-link" href="#" id="login2" data-toggle="modal" data-target="#logInModal" style="display: block;">Log in</a>
       this.inicio = page.locator("#login2");
       //<button type="button" onclick="logIn()" class="btn btn-primary">Log in</button>
       this.loginIn_button = page.locator("button:has-text('Log in')");
       this.close_button = page.locator("btn.btn-secondary");
       this.list_products = page.locator("#tbodyid");
    }
    

    async goto(){
        await this.page.goto("https://www.demoblaze.com/index.html");
    }

    async login(username, password){
        await this.inicio.click();
        await this.username_input.fill(username);
        await this.password_input.fill(password);
        await this.loginIn_button.click();
    }

    async close(){
        await this.close_button.click();
    }

}